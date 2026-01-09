import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PointsGateway } from './points.gateway';

/* =======================
   DTOs / Types
======================= */

export interface CompleteModuleInput {
  userId: string;
  moduleName: string;
  pointsToAward: number;
}

export interface TransactionResult {
  success: boolean;
  message: string;
  user: User | null;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  totalXp: number;
  rank: number;
}

export interface WeeklyXp {
  day: string;
  xp: number;
}

/* =======================
   Service
======================= */

@Injectable()
export class PointsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pointsGateway: PointsGateway,
  ) {}

  /* =======================
     Complete Module
  ======================= */
  async completeModule(
    input: CompleteModuleInput,
  ): Promise<TransactionResult> {
    const { userId, moduleName, pointsToAward } = input;

    const result = await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient): Promise<TransactionResult> => {
        const existingCompletion = await tx.completedModule.findUnique({
          where: {
            userId_moduleName: {
              userId,
              moduleName,
            },
          },
        });

        if (existingCompletion) {
          return {
            success: false,
            message: 'Module already completed',
            user: null,
          };
        }

        const updatedUser = await tx.user.update({
          where: { id: userId },
          data: {
            points: { increment: pointsToAward },
            totalXp: { increment: pointsToAward },
          },
        });

        await tx.completedModule.create({
          data: {
            userId,
            moduleName,
            pointsEarned: pointsToAward,
          },
        });

        await tx.pointsHistory.create({
          data: {
            userId,
            points: pointsToAward,
            reason: 'module_complete',
            moduleName,
          },
        });

        return {
          success: true,
          message: `Module completed! You earned ${pointsToAward} points.`,
          user: updatedUser,
        };
      },
    );

    if (result.success) {
      void this.pointsGateway.emitPointsUpdate(userId);
    }

    return result;
  }

  /* =======================
     Get User Points
  ======================= */
  async getUserPoints(
    userId: string,
  ): Promise<{
    points: number;
    totalXp: number;
    name: string;
    completedModules: {
      moduleName: string;
      pointsEarned: number;
      completedAt: Date;
    }[];
  } | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        points: true,
        totalXp: true,
        name: true,
        completedModules: {
          select: {
            moduleName: true,
            pointsEarned: true,
            completedAt: true,
          },
        },
      },
    });
  }

  /* =======================
     Points History
  ======================= */
  async getPointsHistory(
    userId: string,
    limit = 10,
  ): Promise<
    {
      points: number;
      reason: string;
      moduleName: string | null;
      createdAt: Date;
    }[]
  > {
    return this.prisma.pointsHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        points: true,
        reason: true,
        moduleName: true,
        createdAt: true,
      },
    });
  }

  /* =======================
     Completed Modules
  ======================= */
  async getCompletedModules(
    userId: string,
  ): Promise<
    {
      moduleName: string;
      pointsEarned: number;
      completedAt: Date;
    }[]
  > {
    return this.prisma.completedModule.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      select: {
        moduleName: true,
        pointsEarned: true,
        completedAt: true,
      },
    });
  }

  /* =======================
     Quiz Points
  ======================= */
  async addPointsForQuiz(
    userId: string,
    quizName: string,
    points: number,
  ): Promise<User> {
    const updatedUser = await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient): Promise<User> => {
        const user = await tx.user.update({
          where: { id: userId },
          data: {
            points: { increment: points },
            totalXp: { increment: points },
          },
        });

        await tx.pointsHistory.create({
          data: {
            userId,
            points,
            reason: 'quiz_pass',
            moduleName: quizName,
          },
        });

        return user;
      },
    );

    void this.pointsGateway.emitPointsUpdate(userId);
    return updatedUser;
  }

  /* =======================
     Weekly XP (NEW)
  ======================= */
  async getWeeklyXp(userId: string): Promise<WeeklyXp[]> {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 6);

    const history = await this.prisma.pointsHistory.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        points: true,
        createdAt: true,
      },
    });

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const xpMap: Record<string, number> = {};

    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      xpMap[days[d.getDay()]] = 0;
    }

    for (const entry of history) {
      const day = days[new Date(entry.createdAt).getDay()];
      xpMap[day] += entry.points;
    }

    return Object.entries(xpMap).map(([day, xp]) => ({
      day,
      xp,
    }));
  }

  /* =======================
     Leaderboard
  ======================= */
  async leaderboard(limit = 100): Promise<LeaderboardUser[]> {
    const leaders = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        points: true,
        totalXp: true,
      },
      orderBy: { points: 'desc' },
      take: limit,
    });

    return leaders.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
  }
}

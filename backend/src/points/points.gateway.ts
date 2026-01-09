/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/* =======================
   Types
======================= */

export interface CompletedModuleInfo {
  moduleName: string;
  pointsEarned: number;
  completedAt: Date;
}

export interface PointsUpdateData {
  userId: string;
  points: number;
  totalXp: number;
  name: string;
  completedModules: CompletedModuleInfo[];
  timestamp: string;
}

interface PointsUpdateSubscriber {
  userId: string;
  callback: (data: PointsUpdateData) => void;
}

/* =======================
   Gateway
======================= */

@Injectable()
export class PointsGateway implements OnModuleInit {
  private readonly subscribers = new Map<string, PointsUpdateSubscriber[]>();

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit(): void {
    // Gateway initialized
  }

  /* =======================
     Subscribe
  ======================= */
  subscribeToPointsUpdates(
    userId: string,
    callback: (data: PointsUpdateData) => void,
  ): () => void {
    const existing = this.subscribers.get(userId) ?? [];

    const subscriber: PointsUpdateSubscriber = {
      userId,
      callback,
    };

    this.subscribers.set(userId, [...existing, subscriber]);

    // Unsubscribe handler
    return (): void => {
      const subs = this.subscribers.get(userId);
      if (!subs) return;

      this.subscribers.set(
        userId,
        subs.filter((s) => s !== subscriber),
      );
    };
  }

  /* =======================
     Emit Update
  ======================= */
  async emitPointsUpdate(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
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

    if (!user) return;

    const data: PointsUpdateData = {
      userId,
      points: user.points,
      totalXp: user.totalXp,
      name: user.name,
      completedModules: user.completedModules,
      timestamp: new Date().toISOString(),
    };

    const subscribers = this.subscribers.get(userId) ?? [];
    subscribers.forEach((sub) => sub.callback(data));
  }

  /* =======================
     Subscriber Count
  ======================= */
  getSubscriberCount(userId?: string): number {
    if (userId) {
      return this.subscribers.get(userId)?.length ?? 0;
    }

    let total = 0;
    this.subscribers.forEach((subs) => {
      total += subs.length;
    });

    return total;
  }
}

import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PointsService } from './points.service';

/* =======================
   Types
======================= */

interface JwtUser {
  id: string;
  email?: string;
}

interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

interface CompleteModuleDto {
  moduleName: string;
  pointsToAward: number;
}

interface CompleteQuizDto {
  quizName: string;
  points: number;
}

/* =======================
   Controller
======================= */

@Controller('points')
@UseGuards(JwtAuthGuard)
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  /* =======================
     Complete Module
  ======================= */
  @Post('complete-module')
  async completeModule(
    @Req() req: AuthenticatedRequest,
    @Body() body: CompleteModuleDto,
  ): Promise<{
    success: boolean;
    message: string;
    user: unknown;
  }> {
    return this.pointsService.completeModule({
      userId: req.user.id,
      moduleName: body.moduleName,
      pointsToAward: body.pointsToAward,
    });
  }

  /* =======================
     Get User Points
  ======================= */
  @Get('user-points')
  async getUserPoints(@Req() req: AuthenticatedRequest): Promise<{
    points: number;
    totalXp: number;
    name: string;
    completedModules: {
      moduleName: string;
      pointsEarned: number;
      completedAt: Date;
    }[];
  } | null> {
    return this.pointsService.getUserPoints(req.user.id);
  }

  /* =======================
     Points History
  ======================= */
  @Get('history')
  async getPointsHistory(
    @Req() req: AuthenticatedRequest,
    @Query('limit') limit = '10',
  ): Promise<
    {
      points: number;
      reason: string;
      moduleName: string | null;
      createdAt: Date;
    }[]
  > {
    return this.pointsService.getPointsHistory(req.user.id, Number(limit));
  }

  /* =======================
     Completed Modules
  ======================= */
  @Get('completed-modules')
  async getCompletedModules(@Req() req: AuthenticatedRequest): Promise<
    {
      moduleName: string;
      pointsEarned: number;
      completedAt: Date;
    }[]
  > {
    return this.pointsService.getCompletedModules(req.user.id);
  }

  /* =======================
     Quiz Completion
  ======================= */
  @Post('quiz-complete')
  async completeQuiz(
    @Req() req: AuthenticatedRequest,
    @Body() body: CompleteQuizDto,
  ): Promise<{
    success: boolean;
    message: string;
    user: unknown;
  }> {
    const user = await this.pointsService.addPointsForQuiz(
      req.user.id,
      body.quizName,
      body.points,
    );

    return {
      success: true,
      message: `Quiz completed! You earned ${body.points} points.`,
      user,
    };
  }

  /* =======================
     Weekly XP
  ======================= */
  @Get('weekly-xp')
  async getWeeklyXp(
    @Req() req: AuthenticatedRequest,
  ): Promise<{ day: string; xp: number }[]> {
    return this.pointsService.getWeeklyXp(req.user.id);
  }

  /* =======================
     Leaderboard
  ======================= */
  @Get('leaderboard')
  async getLeaderboard(@Query('limit') limit = '100'): Promise<
    {
      id: string;
      name: string;
      points: number;
      totalXp: number;
      rank: number;
    }[]
  > {
    return this.pointsService.leaderboard(Number(limit));
  }
}

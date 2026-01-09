import { Test, TestingModule } from '@nestjs/testing';
import { PointsService } from './points.service';
import { PointsGateway } from './points.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

describe('PointsService', () => {
  let service: PointsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PointsService,
        {
          provide: PointsGateway,
          useValue: {
            emitPointsUpdate: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
            },
            completedModule: {
              findUnique: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
            },
            pointsHistory: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PointsService>(PointsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /* =======================
     Complete Module
  ======================= */
  describe('completeModule', () => {
    it('should award points for module completion', async () => {
      const mockUser: User = {
        id: 'user1',
        name: 'Aditya',
        points: 100,
        totalXp: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      (prisma.$transaction as jest.Mock).mockImplementation(
        async (cb: (tx: Prisma.TransactionClient) => Promise<unknown>) =>
          cb({
            user: {
              update: jest.fn().mockResolvedValue({
                ...mockUser,
                points: 150,
                totalXp: 150,
              }),
            },
            completedModule: {
              findUnique: jest.fn().mockResolvedValue(null),
              create: jest.fn(),
            },
            pointsHistory: {
              create: jest.fn(),
            },
          } as unknown as Prisma.TransactionClient),
      );

      const result = await service.completeModule({
        userId: 'user1',
        moduleName: '8051-intro',
        pointsToAward: 50,
      });

      expect(result.success).toBe(true);
      expect(result.user?.points).toBe(150);
    });

    it('should prevent duplicate module completion', async () => {
      (prisma.$transaction as jest.Mock).mockImplementation(
        async (cb: (tx: Prisma.TransactionClient) => Promise<unknown>) =>
          cb({
            completedModule: {
              findUnique: jest.fn().mockResolvedValue({
                userId: 'user1',
                moduleName: '8051-intro',
              }),
            },
          } as unknown as Prisma.TransactionClient),
      );

      const result = await service.completeModule({
        userId: 'user1',
        moduleName: '8051-intro',
        pointsToAward: 50,
      });

      expect(result.success).toBe(false);
    });
  });

  /* =======================
     Get User Points
  ======================= */
  describe('getUserPoints', () => {
    it('should return user points and completed modules', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
        points: 200,
        totalXp: 200,
        name: 'Aditya',
        completedModules: [],
      } as unknown as User);

      const result = await service.getUserPoints('user1');

      expect(result?.points).toBe(200);
      expect(result?.totalXp).toBe(200);
    });
  });

  /* =======================
     Leaderboard
  ======================= */
  describe('leaderboard', () => {
    it('should return ranked leaderboard', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([
        {
          id: 'u1',
          name: 'A',
          points: 300,
          totalXp: 300,
        },
        {
          id: 'u2',
          name: 'B',
          points: 200,
          totalXp: 200,
        },
      ] as User[]);

      const leaderboard = await service.leaderboard(2);

      expect(leaderboard[0].rank).toBe(1);
      expect(leaderboard[1].rank).toBe(2);
    });
  });
});

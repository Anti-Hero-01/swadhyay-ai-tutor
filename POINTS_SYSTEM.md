# Points System Implementation Guide

## Overview
A complete real-time points system has been implemented for the Swadhyay AI Tutor platform. Users earn points when completing modules and quizzes, and these updates are reflected in real-time on the dashboard.

## Backend Changes

### 1. Database Schema Updates (Prisma)
Three new models have been added to track points:

- **`User` model**: Added `points` and `totalXp` fields to track user's points balance
- **`CompletedModule` model**: Tracks which modules have been completed by which users with points earned
- **`PointsHistory` model**: Maintains a complete audit trail of all points transactions

### 2. New Backend Services
Created in `backend/src/points/`:

- **`points.service.ts`**: Core service handling:
  - Module completion logic with transaction support
  - Points awarding for quizzes
  - User points queries
  - Leaderboard generation

- **`points.gateway.ts`**: Real-time update system using:
  - Subscription pattern for real-time updates
  - Event emission when points change
  - Support for polling-based updates

- **`points.controller.ts`**: REST API endpoints:
  - `POST /points/complete-module` - Award points for module completion
  - `GET /points/user-points` - Get user's current points
  - `GET /points/history` - Get points history
  - `GET /points/completed-modules` - List completed modules
  - `POST /points/quiz-complete` - Award points for quiz
  - `GET /points/leaderboard` - Get top learners

- **`points.module.ts`**: NestJS module configuration

## Frontend Changes

### 1. New Custom Hook: `usePoints.ts`
Located in `src/hooks/`, provides:

```typescript
// Hook for user points
const { points, loading, error, completeModule } = useUserPoints();

// Hook for leaderboard
const { leaderboard, loading } = useLeaderboard();
```

Features:
- Automatic polling every 2 seconds for real-time updates
- Immediate local state updates on module completion
- Error handling and loading states
- Functions to complete modules and fetch data

### 2. Updated Dashboard
Enhanced `src/pages/Dashboard.tsx` with:
- Real-time points display
- Welcome section showing current points
- Leaderboard showing top 5 learners
- Dynamic stats calculated from actual user data
- Loading states for better UX

## How to Set Up

### Step 1: Run Database Migration
```bash
cd backend
npx prisma migrate dev --name add_points_system
```

This will:
- Create the three new tables: `completed_module`, `points_history`
- Add new columns to the `user` table: `points`, `totalXp`, `updatedAt`

### Step 2: Start the Backend
```bash
cd backend
npm run start:dev
```

The Points module will be automatically initialized with the app.

### Step 3: Start the Frontend
```bash
npm run dev
```

## API Usage Examples

### Complete a Module
```bash
curl -X POST http://localhost:3000/points/complete-module \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "moduleName": "LED Basics",
    "pointsToAward": 100
  }'
```

Response:
```json
{
  "success": true,
  "message": "Module completed! You earned 100 points.",
  "user": {
    "id": "user-id",
    "points": 150,
    "totalXp": 150,
    ...
  }
}
```

### Get User Points
```bash
curl -X GET http://localhost:3000/points/user-points \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Leaderboard
```bash
curl -X GET http://localhost:3000/points/leaderboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Real-Time Updates

The system uses polling-based real-time updates:
- Dashboard polls for user points every 2 seconds
- Leaderboard polls every 5 seconds
- Can be easily upgraded to WebSocket if needed

## Features

✅ **Points Tracking**: Award points for module completion and quizzes
✅ **Real-Time Updates**: Dashboard updates live as points are earned
✅ **Audit Trail**: Complete history of all points transactions
✅ **Leaderboard**: Real-time ranking of top learners
✅ **Transaction Safety**: Database transactions ensure consistency
✅ **Duplicate Prevention**: Users can't earn points for the same module twice
✅ **Flexible Points System**: Easy to configure points per activity

## Future Enhancements

1. **WebSocket Integration**: Replace polling with real-time WebSocket updates for better performance
2. **Achievements & Badges**: Add badge system for milestone achievements
3. **Weekly Streaks**: Track and display learning streaks
4. **Daily Challenges**: Bonus points for daily challenges
5. **Points Decay**: Optional: reduce points if inactive for long periods
6. **Referral Bonuses**: Award points for referring friends

## Testing

To test the points system:

1. Create a user account
2. Call the complete-module endpoint to simulate module completion
3. Check the Dashboard - points should update in real-time
4. Complete multiple modules to see leaderboard updates

## Troubleshooting

**Issue**: Points not updating on dashboard
- Check that backend is running and accessible
- Verify JWT token is valid
- Check browser console for API errors

**Issue**: Migration fails
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Run `npx prisma migrate resolve` to resolve conflicts

**Issue**: "Module already completed" error
- This is expected - users can only complete a module once per account

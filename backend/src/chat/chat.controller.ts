import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  @Post()
  async chat(@Body() body: { message: string; context?: any }) {
    const { message, context } = body;

    // Simple response based on message
    let response = 'I\'m here to help with your learning journey!';

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('progress')) {
      response = 'You can check your progress in the Dashboard. Keep learning!';
    } else if (lowerMessage.includes('module')) {
      response = 'Modules contain videos, articles, simulations, and quizzes. Complete them to unlock more!';
    } else if (lowerMessage.includes('quiz')) {
      response = 'Quizzes test your knowledge. You get 3 attempts, with decreasing XP for retries.';
    }

    // In future, integrate with AI service here

    return { response };
  }
}
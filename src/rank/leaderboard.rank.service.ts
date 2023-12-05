// Import necessary modules and constants
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

// Decorator to mark the class as a provider
@Injectable()
export class LeaderboardService {
  // Inject the User model into the service
  constructor(private prisma: PrismaService) {}

  // Method to get the leaderboard
  async getLeaderboard(limit?: number): Promise<any> {
    // Validate the limits to prevent memory leaks
    if (limit && (typeof limit !== 'number' || limit <= 0)) {
      throw new BadRequestException('Invalid limit');
    }

    // Find users, sort them by level and XP in descending order, limit the results if a limit is provided, and execute the query
    const users = await this.prisma.users.findMany({
      orderBy: [
        { level: 'desc' },
        { xp: 'desc' }
      ],
      take: limit
    })
    

    // Reduce the users array to an object with the rank as the key and the user as the value
    return users.reduce((leaderboard, user, index) => ({
      ...leaderboard, 
      [(index + 1)]: {
        userId: user.userId,
        level: user.level,
        xp: user.xp.toString()
      }
    }), {});
  }
}
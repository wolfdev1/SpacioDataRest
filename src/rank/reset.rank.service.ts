// Import necessary modules and constants
import { Injectable, BadRequestException, Logger, NotFoundException, HttpStatus } from '@nestjs/common';
import { messages } from '../consts/api.messages';
import { PrismaService } from '../prisma.service';

// Decorator to mark the class as a provider
@Injectable()
export class ResetService {
  // Inject the User model into the service
  constructor(private prisma: PrismaService) {}

  // Logger instance for logging
  private readonly logger = new Logger("Rank");

  // Method to reset XP for a user
  async resetXp(userId: string): Promise<any> {
    // Validate the userId to prevent memory leaks
    if (!userId || typeof userId !== 'string') {
      throw new BadRequestException(messages.rank.badRequest3);
    }

    // Find the user with the provided userId
    const user = await this.prisma.users.findFirst({ 
      where: { userId: userId }
     });

    // If user not found, throw NotFoundException
    if (!user) {
      throw new NotFoundException(messages.rank.notFound);
    }

    // Reset the user's XP and level in the database
    await this.prisma.users.update({
      where: { id: user.id },
      data: {
        xp: BigInt(0),
        level: 0
      }
    })
    .then(() => {
      // Log the reset
      this.logger.log(`User ${userId} XP reseted.`);
    });

    // Return a message indicating the XP has been reset
    return {
      message: `User ${userId} XP reseted.`,
      status: HttpStatus.OK
    };
  }
}
// Import necessary modules and classes
import { Module, Logger } from '@nestjs/common';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { LeaderboardService } from './leaderboard.rank.service';
import { ResetService } from './reset.rank.service';
import { SetService } from './set.rank.service';
import { PrismaService } from '../prisma.service';

// Use the @Module decorator to define the module
@Module({
    imports: [],
    // Define the controllers that should be instantiated for this module
    controllers: [RankController],
    // Define the providers that should be instantiated for this module
    providers: [
        RankService,
        LeaderboardService,
        ResetService,
        SetService,
        Logger,
        PrismaService
    ],
})

// Export the module class
export class RankModule {}
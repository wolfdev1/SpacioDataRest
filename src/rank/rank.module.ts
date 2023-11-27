// Import necessary modules and classes
import { Module, Logger } from '@nestjs/common';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { CredentialsSchema } from '../schemas/credentials.schema';
import { LeaderboardService } from './leaderboard.rank.service';
import { ResetService } from './reset.rank.service';
import { SetService } from './set.rank.service';

// Use the @Module decorator to define the module
@Module({
    // Import MongooseModule for database interaction and define schemas
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Credentials', schema: CredentialsSchema }])
    ],
    // Define the controllers that should be instantiated for this module
    controllers: [RankController],
    // Define the providers that should be instantiated for this module
    providers: [
        RankService,
        LeaderboardService,
        ResetService,
        SetService,
        Logger
    ],
})

// Export the module class
export class RankModule {}
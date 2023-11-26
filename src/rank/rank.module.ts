import { Module, Logger } from '@nestjs/common';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { CredentialsSchema } from 'src/schemas/credentials.schema';
import { LeaderboardService } from './leaderboard.rank.service';
import { ResetService } from './reset.rank.service';
import { SetService } from './set.rank.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Credentials', schema: CredentialsSchema }])
    ],
    controllers: [RankController],
    providers: [
        RankService,
        LeaderboardService,
        ResetService,
        SetService,
        Logger
    ],
})

export class RankModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { WarnSchema } from 'src/schemas/warn.schema';
import { Model } from 'mongoose';
import { WarningsService } from './warnings/warnings.mod.service';
import { WarningsController } from './warnings/warnings.mod.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Warn', schema: WarnSchema }])
    ],
    controllers: [
        WarningsController
    ],
    providers: [
        WarningsService
    ],
})
export class ModModule {}

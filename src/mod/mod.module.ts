import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { WarnSchema } from '../schemas/warn.schema';
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

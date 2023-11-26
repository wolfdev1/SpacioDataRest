// Import necessary modules and classes
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { WarnSchema } from '../schemas/warn.schema';
import { WarningsService } from './warnings/warnings.mod.service';
import { WarningsController } from './warnings/warnings.mod.controller';

// Use the @Module decorator to define the module
@Module({
  // Import the MongooseModule and define the User and Warn models with their respective schemas
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Warn', schema: WarnSchema }])
  ],
  // Define the controllers that belong to this module
  controllers: [
    WarningsController
  ],
  // Define the providers that belong to this module
  providers: [
    WarningsService
  ],
})
// Export the ModModule class
export class ModModule {}
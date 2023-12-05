// Import necessary modules and classes
import { Module } from '@nestjs/common';
import { WarningsService } from './warnings/warnings.mod.service';
import { WarningsController } from './warnings/warnings.mod.controller';
import { PrismaService } from '../prisma.service';

// Use the @Module decorator to define the module
@Module({
  imports: [],
  // Define the controllers that belong to this module
  controllers: [
    WarningsController
  ],
  // Define the providers that belong to this module
  providers: [
    WarningsService,
    PrismaService
  ],
})
// Export the ModModule class
export class ModModule {}
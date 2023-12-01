// Import necessary modules and classes
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';


// Use the @Module decorator to define the module
@Module({
  imports: [],
  // Define the controllers that belong to this module
  controllers: [ UserController],
  // Define the providers that belong to this module
  providers: [
    PrismaService,
  ],
})
// Export the UserModule class
export class UserModule  {}
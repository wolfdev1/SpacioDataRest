import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { messages } from '../../consts/api.messages';
import { PrismaService } from '../../prisma.service';
import { users, warns } from '@prisma/client';

@Injectable()
export class WarningsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(WarningsService.name);

  async getUserWarnings(user?: users): Promise<{ [key: number]: warns }> {

    if (!user) {
      throw new NotFoundException(messages.warnings.notFound);
    }
    const warns = await this.prisma.warns.findMany({
      where: {
        userId: user.userId
      }
    });
    if (warns.length === 0) {
      throw new NotFoundException(messages.warnings.noWarns);
    }
    
    return warns.reduce((list, warn, index) => ({ ...list, [(index + 1)]: warn }), {});
  }

  async deleteWarn(warn?: warns): Promise<any> {

    if (!warn) {
      throw new NotFoundException(messages.warnings.notFound2);
    }
    await this.prisma.warns.deleteMany({
      where: {
        warnId: warn.warnId
      }
    })
    .then(() => this.logger.log(`Warn ${warn.warnId} deleted from user ${warn.userId}.`));

    return {
        message: `Warn ${warn.warnId} deleted from user ${warn.userId}.`,
        status: HttpStatus.OK
    };
  }

  async getUserById(id: string): Promise<users> {
    return this.prisma.users.findFirst({
      where: { userId: id }
    })
  }

  async getWarnById(id: string): Promise<warns> {
    return this.prisma.warns.findFirst({
      where: { warnId: id }
    });
  }
}

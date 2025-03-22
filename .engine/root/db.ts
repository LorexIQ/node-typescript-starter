import useLogger from '@composables/useLogger';
import { PrismaClient } from '@prisma/client';

export default class DBConstructor {
  private logger = useLogger('DB');
  private prisma = new PrismaClient();

  user = this.prisma.user;
  inviteCode = this.prisma.inviteCode;
  banByCode = this.prisma.banByCode;

  public async connect() {
    try {
      await this.prisma.$connect();
      this.logger.info('Успешно подключено');
    } catch (error) {
      this.logger.error('Ошибка подключения', error);
    }
  }

  public async disconnect() {
    await this.prisma.$disconnect();
  }

  public async getPrisma() {
    return this.prisma;
  }
}

import useDB from '@composables/useDB';
import { container } from 'tsyringe';
import type { GrammyUser, PrismaUser } from '@/types';
import type { Languages, Prisma } from '@prisma/client';
import { ReqError } from '@/helpers/ReqError';

class UsersService {
  private db = useDB();

  async middleware(tgUser: GrammyUser, inviteCode?: string): Promise<PrismaUser> {
    if (tgUser.is_bot) throw new ReqError('Неизвесный клиент');

    const userRecord = await this.db.user.findUnique({
      where: { id: tgUser.id }
    });

    const userData: Prisma.UserUncheckedCreateInput = {
      id: tgUser.id,
      isBot: tgUser.is_bot,
      firstName: tgUser.first_name,
      lastName: tgUser.last_name,
      username: tgUser.username,
      languageCode: tgUser.language_code as Languages,
      isPremium: tgUser.is_premium ?? false,
      role: 'user'
    };


    if (!userRecord) {
      if (!inviteCode) throw new ReqError('Регистрация без пригласительного кода невозможна');

      const inviteCodeRecord = await this.db.inviteCode.findUnique({
        where: { code: inviteCode }
      });

      if (!inviteCodeRecord) throw new ReqError('Неверный код приглашения');

      await Promise.all([
        this.db.inviteCode.deleteMany({ where: { id: inviteCodeRecord.id } }),
        this.db.banByCode.deleteMany({ where: { tgId: tgUser.id } })
      ]);

      if (inviteCodeRecord.ownerId) {
        await this.db.user.update({
          where: { id: inviteCodeRecord.ownerId },
          data: { countInvites: { increment: 1 } }
        });
      }
    }

    return this.db.user.upsert({
      where: { id: tgUser.id },
      create: userData,
      update: userData
    });
  }
}

export function useUsersService() {
  const value = container.resolve(UsersService);
  if (value) return value;

  const service = new UsersService();
  container.register(UsersService, { useValue: service });
  return service;
}

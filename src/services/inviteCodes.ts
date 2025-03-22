import { ReqError } from '@/helpers/ReqError';
import useDB from '@composables/useDB';
import { container } from 'tsyringe';

class InviteCodesService {
  private db = useDB();
  private triesToBan = 5;

  async findByCode(code: string) {
    return this.db.inviteCode.findUnique({
      where: { code }
    });
  }

  async validateCode(tgId: number, code: string): Promise<boolean> {
    if (!/^\d+$/.test(code)) {
      const banRecord = await this.db.banByCode.upsert({
        where: { tgId },
        create: { tgId, triesInvalid: 1 },
        update: { triesInvalid: { increment: 1 } }
      });

      if (banRecord.triesInvalid >= 20) {
        await this.db.banByCode.update({
          where: { tgId },
          data: { triesInvalid: 0 }
        });

        throw new ReqError('Ты ебанууутый? А ни чо тот факт что нужно вводить число?');
      }

      return false;
    }

    if (!await this.findByCode(code)) {
      const banRecord = await this.db.banByCode.upsert({
        where: { tgId },
        create: { tgId, triesCode: 1 },
        update: { triesCode: { increment: 1 } }
      });

      if (banRecord.triesCode >= this.triesToBan) {
        throw new ReqError('Слишком много попыток, аккант был заблокирован! Обратитесь в поддержку @LorexIQ');
      }

      return false;
    }

    return true;
  }

  async checkBan(tgId: number) {
    const banRecord = await this.db.banByCode.findUnique({
      where: { tgId }
    });

    if (banRecord) {
      this.db.banByCode.update({
        where: { tgId },
        data: { triesInvalid: 0 }
      });
    }

    return banRecord && banRecord.triesCode >= this.triesToBan;
  }

  async create(code: string, ownerId: number) {
    return this.db.inviteCode.create({
      data: { code, ownerId }
    });
  }
}

export function useInviteCodesService() {
  const value = container.resolve(InviteCodesService);
  if (value) return value;

  const service = new InviteCodesService();
  container.register(InviteCodesService, { useValue: service });
  return service;
}

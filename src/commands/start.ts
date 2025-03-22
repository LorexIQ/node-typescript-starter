import { errorHandler, ReqError } from '@/helpers';
import { middlewareAuthBypass } from '@/middlewares';
import { useInviteCodesService } from '@/services';
import { authRegistration, startView } from '@/shared/authView';
import useBot from '@composables/useBot';

export function commandStart() {
  const bot = useBot();
  const inviteCodesService = useInviteCodesService();

  bot.command('start', middlewareAuthBypass, async (ctx) => {
    await errorHandler(async () => {
      if (!ctx.from) throw new ReqError('Неизвесный клиент');

      if (ctx.user) {
        await startView(ctx);
      } else {
        let code = ctx.match;

        if (code) {
          await authRegistration(ctx, code);
        } else {
          if (await inviteCodesService.checkBan(ctx.from.id)) throw new ReqError('Ваш аккант был заблокирован! Обратитесь в поддержку @LorexIQ');
          await ctx.conversation.enter('registration');
          return;
        }
      }
    }, ctx);
  });
}

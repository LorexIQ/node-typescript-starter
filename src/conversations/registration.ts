import { errorHandler } from "@/helpers";
import { useInviteCodesService } from "@/services";
import { authRegistration } from "@/shared/authView";
import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";

export async function convRegistration(conversation: Conversation, ctx: Context) {
  const inviteCodesService = useInviteCodesService();

  let code: string;
  let isCodeValid = false;

  await ctx.reply('Введите код приглашения');

  await errorHandler(async () => {
    do {
      const confirmation = await conversation.waitFor('message:text');
      code = confirmation.message.text;

      if (await conversation.external(() => !/^\d+$/.test(code))) {
        await ctx.reply('Пожалуйста, введите только число');
      } else {
        const codeValid = await conversation.external(() => inviteCodesService.validateCode(ctx.from!.id, code));

        if (!codeValid) {
          await ctx.reply('Неверный код приглашения');
        } else {
          isCodeValid = true;
          await authRegistration(ctx, code);
        }
      }
    } while (!isCodeValid);
  }, ctx);
}
import { ReqError } from "@/helpers";
import { useUsersService } from "@/services";
import { Context } from "grammy";

export async function authRegistration(ctx: Context, inviteCode?: string) {
  if (!ctx.from) throw new ReqError('Неизвесный клиент');

  const usersService = useUsersService();
  await usersService.middleware(ctx.from, inviteCode);
  await ctx.reply('Вы успешно зарегистрировались!');
  await startView(ctx);
}

export async function startView(ctx: Context) {
  await ctx.reply(`ТУТ БУДЕТ МЕНЮ`);
}
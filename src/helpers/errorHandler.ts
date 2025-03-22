import useLogger from "@composables/useLogger";
import { ReqError } from "./ReqError";
import { Context } from "grammy";

export async function errorHandler(func: () => Promise<any>, ctx: Context) {
  const logger = useLogger();

  try {
    await func();
  } catch (e: any) {
    if (e instanceof ReqError) {
      await ctx.reply(e.message);
    } else {
      logger.error(e);
      await ctx.reply('Произошла ошибка, попробуйте позже');
    }
  }
}
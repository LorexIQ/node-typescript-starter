import { errorHandler } from "@/helpers";
import { useUsersService } from "@/services";
import { ContextConstructor } from "@root/context";
import { NextFunction } from "grammy";

export async function middlewareAuth(ctx: ContextConstructor, next: NextFunction) {
  const usersService = useUsersService();

  if (!ctx.from || ctx.from?.is_bot) return;

  try {
    ctx.user = await usersService.middleware(ctx.from!);
    await next();
  } catch { }
}

export async function middlewareAuthBypass(ctx: ContextConstructor, next: NextFunction) {
  const usersService = useUsersService();

  if (!ctx.from || ctx.from?.is_bot) return;

  try {
    ctx.user = await usersService.middleware(ctx.from!);
  } catch { }

  await next();
}

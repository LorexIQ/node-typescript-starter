import type { ConversationFlavor } from '@grammyjs/conversations';
import type { Context } from 'grammy';
import type { PrismaUser } from '@/types';

export type ContextConstructor = ConversationFlavor<Context & {
  user?: PrismaUser;
}>;

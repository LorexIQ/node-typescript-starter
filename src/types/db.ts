import type { User as UserG } from '@grammyjs/types/manage';
import type { User as UserP } from '@prisma/client';

export type GrammyUser = UserG;

export type PrismaUser = UserP;

import 'reflect-metadata';
import 'module-alias/register';
import 'dotenv/config';

import { container } from 'tsyringe';
import { LoggerConstructor } from '@root/logger';
import BotConstructor from '@root/bot';
import DBConstructor from '@root/db';
import { main } from '@/main';

export async function engine() {
  const logger = new LoggerConstructor('App', 'all');
  const db = new DBConstructor();
  const bot = new BotConstructor();

  container.register(LoggerConstructor, { useValue: logger });
  container.register(DBConstructor, { useValue: db });
  container.register(BotConstructor, { useValue: bot });

  await db.connect();
  await main();
  bot.run();
}

engine();

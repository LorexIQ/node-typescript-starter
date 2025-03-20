import 'reflect-metadata';
import 'module-alias/register';
import 'dotenv/config';

import { container } from 'tsyringe';
import { LoggerConstructor } from '@root/logger';
import { main } from '@/main';

export async function engine() {
  const logger = new LoggerConstructor('App', 'all');

  container.register(LoggerConstructor, { useValue: logger });

  main();
}

engine();

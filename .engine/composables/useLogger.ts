import { container } from 'tsyringe';
import { LoggerConstructor } from '@root/logger';
import env from '@/constants/env';

export default function (category?: string) {
  if (category) return new LoggerConstructor(category, env.logLevel);
  else return container.resolve(LoggerConstructor);
}

import { container } from 'tsyringe';
import { LoggerConstructor } from '@root/logger';

export default function (category?: string, level?: string) {
  if (category) return new LoggerConstructor(category, level);
  else return container.resolve(LoggerConstructor);
}

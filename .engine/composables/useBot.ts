import { container } from 'tsyringe';
import BotConstructor from '@root/bot';

export default function () {
  return container.resolve(BotConstructor);
}

import { Bot } from 'grammy';
import type { ContextConstructor } from './context';
import env from '../../src/constants/env';
import useLogger from '@composables/useLogger';
import { conversations } from '@grammyjs/conversations';

export default class BotConstructor<C extends ContextConstructor = ContextConstructor> extends Bot<C> {
  private logger = useLogger('Bot');

  constructor() {
    super(env.botToken);
    this.use(conversations());

    this._systemHandlers();
  }

  private _systemHandlers() {
    this.catch(error => this.logger.error(error));
  }

  run() {
    super.start({
      onStart: () => {
        this.logger.info('Успешно запущен');
      }
    });
  }
}

import useBot from '@composables/useBot';
import useLogger from '@composables/useLogger';
import { createConversation } from '@grammyjs/conversations';
import { convRegistration } from './registration';

export function loadConversations() {
  const bot = useBot();
  const logger = useLogger();

  bot.use(createConversation(convRegistration, 'registration'));

  logger.info('Конверсации загружены');
}

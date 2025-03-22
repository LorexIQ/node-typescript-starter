import useLogger from '@composables/useLogger';
import { commandStart } from './start';

export function loadCommands() {
  const logger = useLogger();

  commandStart();

  logger.info('Команды загружены');
}

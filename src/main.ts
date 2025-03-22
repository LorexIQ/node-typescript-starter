import { loadCommands } from './commands';
import { loadConversations } from './conversations';

export function main() {
  loadConversations();
  loadCommands();
}

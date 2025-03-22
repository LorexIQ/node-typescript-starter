import { container } from 'tsyringe';
import DBConstructor from '@root/db';

export default function () {
  return container.resolve(DBConstructor);
}

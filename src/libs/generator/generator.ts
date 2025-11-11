import { v4 as uuidv4 } from 'uuid';
export class Generator {
  static generateId(): string {
    return uuidv4();
  }
}

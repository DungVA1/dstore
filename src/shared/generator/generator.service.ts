import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GeneratorService {
  generateId(): string {
    return uuidv4();
  }

  generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }
}

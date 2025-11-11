import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GeneratorService {
  generateId(): string {
    return uuidv4();
  }

  generateOTP(): string {
    const token = authenticator.generate(process.env.JWT_SECRET as string);

    return token;
  }
}

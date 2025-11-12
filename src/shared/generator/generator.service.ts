import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GeneratorService {
  constructor(private readonly configService: ConfigService) {}
  generateId(): string {
    return uuidv4();
  }

  generateOTP(): string {
    const token = authenticator.generate(
      this.configService.get('secret.otp') as string,
    );

    return token;
  }
}

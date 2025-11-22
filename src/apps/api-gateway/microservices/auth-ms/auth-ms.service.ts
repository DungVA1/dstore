import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthMSService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  login(body) {
    return this.authClient.send('auth.login', body);
  }

  refreshToken(body) {
    return this.authClient.send('auth.refreshToken', body);
  }
}

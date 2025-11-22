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

  register(body) {
    return this.authClient.send('auth.register', body);
  }

  resendOtp(body) {
    return this.authClient.send('auth.resendOtp', body);
  }

  verifyOtp(body) {
    return this.authClient.send('auth.verifyOtp', body);
  }

  refreshToken(body) {
    return this.authClient.send('auth.refreshToken', body);
  }

  logout(body) {
    return this.authClient.send('auth.logout', body);
  }
}

import { LoginDTO } from '@common/dto/auth/login.dto';
import { RefreshTokenDTO } from '@common/dto/auth/refresh-token.dto';
import { RegisterDTO } from '@common/dto/auth/register.dto';
import { ResendOtpDTO } from '@common/dto/auth/resend-otp.dto';
import { VerifyTokenDTO } from '@common/dto/auth/verify-otp.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoggerService } from '@shared/logger/logger.service';

@Injectable()
export class AuthMSService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    private readonly loggerService: LoggerService,
  ) {}

  async onModuleInit() {
    this.loggerService.log('Subcribing reply topic ....');
    // subcribe reply topics (auth.login.reply, auth.register.reply ...)
    this.authClient.subscribeToResponseOf('auth.login');
    this.authClient.subscribeToResponseOf('auth.register');
    this.authClient.subscribeToResponseOf('auth.resendOtp');
    this.authClient.subscribeToResponseOf('auth.verifyOtp');
    this.authClient.subscribeToResponseOf('auth.refreshToken');
    this.authClient.subscribeToResponseOf('auth.logout');
    await this.authClient.connect();
    this.loggerService.log('Subcribed reply topic ....');
  }

  login(body: LoginDTO) {
    return this.authClient.send('auth.login', body);
  }

  register(body: RegisterDTO) {
    return this.authClient.send('auth.register', body);
  }

  resendOtp(body: ResendOtpDTO) {
    return this.authClient.send('auth.resendOtp', body);
  }

  verifyOtp(body: VerifyTokenDTO) {
    return this.authClient.send('auth.verifyOtp', body);
  }

  refreshToken(body: RefreshTokenDTO) {
    return this.authClient.send('auth.refreshToken', body);
  }

  logout(body: { accountId: string }) {
    return this.authClient.send('auth.logout', body);
  }
}

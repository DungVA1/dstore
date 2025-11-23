import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserMSService {
  authClient: any;
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // subcribe reply topics (user.getAll.reply, ...)
    this.userClient.subscribeToResponseOf('user.getAll');
    await this.userClient.connect();
  }

  getUsers(query) {
    return this.userClient.send('user.getAll', query);
  }
}

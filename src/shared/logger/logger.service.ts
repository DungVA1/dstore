import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  context: string = 'DStore-Application';

  setContext(context: string): void {
    this.context = context;
  }

  log(message: unknown): void {
    super.log(message);
  }
}

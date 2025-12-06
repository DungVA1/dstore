import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  context: string = 'DStore-Application';

  constructor(context: string) {
    super();
    this.context = context;
  }

  setContext(context?: string): void {
    this.context = context ?? this.context;
  }

  log(message: unknown): void {
    super.log(message);
  }
}

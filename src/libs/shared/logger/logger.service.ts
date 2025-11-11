import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  log(message: unknown, context?: unknown): void {
    // do customization for log here
    super.log(message, context);
  }
}

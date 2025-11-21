import { ApplicationError } from '@common/based.error';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception && typeof exception === 'object' && 'ok' in exception) {
      const statusCode = (exception as { ok: boolean; code: number }).code;
      return response.status(statusCode).json(exception);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseBody = exception.getResponse();
      return response.status(status).json({
        ok: false,
        code: status,
        error: responseBody,
      });
    }

    if (exception instanceof ApplicationError) {
      return response.status(exception.httpStatus).json({
        ok: false,
        code: exception.httpStatus,
        error: {
          code: exception.code,
          message: exception.message,
        },
      });
    }

    const logger = new Logger();
    logger.error(exception);

    response.status(500).json({
      ok: false,
      code: 500,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
      },
    });
  }
}

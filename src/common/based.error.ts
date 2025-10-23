import { INTERNAL_ERROR_SERVER } from '@apps/user-service/common/user.error-code';
import { HttpStatus } from '@nestjs/common';

export type Result<T, E extends Error = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const ok = <T>(v: T): Result<T, never> => ({ ok: true, value: v });
export const err = <E extends Error>(e: E): Result<never, E> => ({
  ok: false,
  error: e,
});

export class DomainError extends Error {
  constructor(
    public readonly code: string = INTERNAL_ERROR_SERVER,
    message: string = 'Internal Server Error',
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
  }
}

export class ApplicationError extends Error {
  constructor(
    public readonly code: string = INTERNAL_ERROR_SERVER,
    public message: string = 'Internal Server Error',
    public httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
  }
}

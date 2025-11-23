import { ApplicationError } from '@common/based.error';
import { HttpStatus } from '@nestjs/common';

class GatewayError extends ApplicationError {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class UnauthenicationError extends GatewayError {
  httpStatus: HttpStatus = HttpStatus.UNAUTHORIZED;
  constructor() {
    super('UNAUTHENTICATION', 'token is valid or expired');
  }
}

export class TooManyRequestError extends GatewayError {
  httpStatus: HttpStatus = HttpStatus.TOO_MANY_REQUESTS;
  constructor() {
    super('TOO_MANY_REQUESTS', 'Too many requests');
  }
}

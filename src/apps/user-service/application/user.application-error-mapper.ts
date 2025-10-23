import { DomainError } from '@common/based.error';
import { HttpException, HttpStatus } from '@nestjs/common';

import { INVALID_EMAIL } from '../common/user.error';

export default function mapDomainErrorToHttpException(
  e: DomainError,
): HttpException {
  let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  switch (e.code) {
    case INVALID_EMAIL:
      httpStatus = HttpStatus.BAD_REQUEST;
      break;
  }

  return new HttpException(e.code, httpStatus);
}

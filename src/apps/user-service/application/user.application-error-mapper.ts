import { DomainError } from '@common/based.error';
import { HttpException, HttpStatus } from '@nestjs/common';

import { INVALID_EMAIL } from '../common/user.error-code';

/**
 * Function to map from domain error to http exception based on error code
 * @param e error passed from domain
 * @returns a http exception to response for client
 */
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

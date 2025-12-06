import { HttpStatus } from '@nestjs/common';

export class SuccessResponse<T extends object> {
  protected readonly ok: boolean = true;
  protected readonly httpStatus: number = HttpStatus.OK;
  constructor(protected readonly data?: T) {}
}

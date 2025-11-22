import { HttpStatus } from '@nestjs/common';

export class SuccessResponse {
  protected readonly ok: boolean = true;
  protected readonly httpStatus: number = HttpStatus.OK;
  constructor(protected readonly data?: any) {}
}

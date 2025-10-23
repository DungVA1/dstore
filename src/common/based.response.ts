export class SuccessResponse {
  private readonly ok: boolean = true;
  private readonly code: number = 200;
  constructor(private readonly data?: any) {}
}

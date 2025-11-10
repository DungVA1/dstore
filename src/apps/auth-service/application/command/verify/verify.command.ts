export class VerifyCodeCommand {
  constructor(
    public readonly email: string,
    public readonly verifyCode: number,
  ) {}
}

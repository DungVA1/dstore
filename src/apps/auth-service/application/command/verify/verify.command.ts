export class VerifyTokenCommand {
  constructor(
    public readonly email: string,
    public readonly token: string,
  ) {}
}

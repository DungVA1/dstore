export class LogoutCommand {
  constructor(
    public readonly accountId: string,
    public readonly tokenId: string,
  ) {}
}

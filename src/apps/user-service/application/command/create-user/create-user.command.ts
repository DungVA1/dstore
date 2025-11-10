export class CreateUserCommand {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly email: string,
    public readonly name: string,
    public readonly phone: string,
  ) {}
}

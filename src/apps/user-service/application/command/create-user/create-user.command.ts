export class CreateUserCommand {
  constructor(
    public readonly id: string,
    public readonly identityId: string,
    public readonly email: string,
    public readonly name: string,
    public readonly phone: string,
  ) {}
}

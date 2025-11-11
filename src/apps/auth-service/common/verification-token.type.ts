export class VerificationToken {
  constructor(
    public readonly id: string,
    public readonly token: string,
    public readonly expiredAt: Date,
    public attempts: number,
    public readonly createdAt: Date,
    public usedAt?: Date,
    public readonly accountId?: string,
  ) {}
}

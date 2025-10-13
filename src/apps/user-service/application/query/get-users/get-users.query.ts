export class GetUsersQuery {
  constructor(
    public readonly limit: number = 10,
    public readonly page: number = 1,
    public readonly sort: string = 'id_asc',
  ) {}
}

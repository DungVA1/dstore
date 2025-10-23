import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

enum UserSort {
  email_asc = 'email_asc',
  email_desc = 'email_desc',
  created_at_asc = 'created_at_asc',
  created_at_desc = 'created_at_desc',
}

export class GetListUserQueryDTO {
  @IsOptional()
  @Min(1)
  @IsInt()
  limit: number = 10; // default 10 items for each page if not sent

  @IsOptional()
  @Min(1)
  @IsInt()
  page: number = 1;

  @IsOptional()
  @IsEnum(UserSort)
  sort: UserSort = UserSort.created_at_desc;

  @IsOptional()
  @IsString()
  search: string;
}

enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  UNSPECIFIED = 'unspecified',
}

export class CreateUserDTO {
  identityId: string;
  name: string;
  email: string;
  bod: Date;
  phone: string;
  address: string;
  gender: UserGender;
}

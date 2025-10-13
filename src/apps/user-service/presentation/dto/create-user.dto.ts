enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  UNSPECIFIED = 'unspecified',
}

export class CreateUserDTO {
  name: string;
  email: string;
  password: string;
  bod: Date;
  phone: string;
  address: string;
  gender: UserGender;
}

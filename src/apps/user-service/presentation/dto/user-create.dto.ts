enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  UNSPECIFIED = 'unspecified',
}

export class UserCreateDTO {
  name: string;
  email: string;
  password: string;
  bod: Date;
  phone: string;
  address: string;
  gender: UserGender;
}

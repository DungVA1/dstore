import { OmitType } from '@nestjs/mapped-types';

import { LoginDTO } from './login.dto';

export class RegisterDTO extends OmitType(LoginDTO, ['remember']) {}

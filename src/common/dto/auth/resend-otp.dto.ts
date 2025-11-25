import { PickType } from '@nestjs/mapped-types';

import { LoginDTO } from './login.dto';

export class ResendOtpDTO extends PickType(LoginDTO, ['email']) {}

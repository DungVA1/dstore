import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RefreshTokenCommand } from './refresh-token.command';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor() {}
  execute(command: RefreshTokenCommand): Promise<any> {
  }
}

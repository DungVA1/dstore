import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GeneratorService } from './generator.service';

@Module({
  imports: [ConfigModule],
  providers: [GeneratorService],
  exports: [GeneratorService],
})
export class GeneratorModule {}

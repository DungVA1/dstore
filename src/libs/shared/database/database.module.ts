import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from './database.datasource';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return dataSourceOptions;
      },
    }),
  ],
})
export class DatabaseModule {}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: '123456',
  database: 'practice1',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};

import { DataSourceOptions } from 'typeorm';
import { envVar } from './env/default';

const isProduction = envVar.env === 'production' || envVar.env === 'staging';

const { db } = envVar;
export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: db.host || 'localhost',
  port: parseInt(db.port, 10) || 5432,
  username: db.username || 'postgres',
  password: db.password || '',
  database: db.database || '',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: !isProduction,
  ...(isProduction
    ? {
        ssl: true,
      }
    : {}),
};

export default databaseConfig;

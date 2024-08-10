import databaseConfig from './ormconfig';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource(databaseConfig);

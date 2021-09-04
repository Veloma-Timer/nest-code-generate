import { readdirSync } from "fs";
import { join } from 'path';
import { DatabaseConfig, EnvDatabaseConfig, YMLDatabaseConfig } from '../types/types';

// 寻找node_modules所在的路径
export const findNodeModules = () => {
  let currentPath = __dirname;
  let dir = readdirSync(currentPath);
  while (!dir.includes('node_modules')) {
    currentPath = join(currentPath, '..');
    dir = readdirSync(currentPath);
  }
  return { dir, path: currentPath };
}

// 转换一下选项参数
export const transformOptions = (options: Partial<DatabaseConfig & EnvDatabaseConfig & YMLDatabaseConfig>): DatabaseConfig => {
  return {
    host: options.host || options.DB_HOST! || options.Host!,
    port: options.port || options.DB_PORT || options.Port!,
    user: options.user || options.DB_USERNAME || options.User!,
    password: options.password || options.DB_PASSWORD || options.Password!,
    database: options.database || options.DB_DATABASE || options.Database!,
  }
}
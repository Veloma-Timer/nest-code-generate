"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.readDatabaseConfig = void 0;
var ali_rds_async_1 = require("ali-rds-async");
var database_1 = require("../utils/database");
var path_1 = require("path");
var fs_1 = require("fs");
var dotenv = require("dotenv");
var YAML = require("yaml");
var env = process.env.NODE_ENV || 'development';
// 读取数据库配置文件
var readDatabaseConfig = function () {
    // 找到node_modules所在的路径
    var _a = (0, database_1.findNodeModules)(), dir = _a.dir, path = _a.path;
    var config;
    if (dir.includes('ormconfig.json')) {
        try {
            var strConfig = (0, fs_1.readFileSync)((0, path_1.resolve)(path, 'ormconfig.json'), 'utf-8');
            var jsonConfig = JSON.parse(strConfig);
            config = (0, database_1.transformOptions)(jsonConfig);
        }
        catch (error) {
            throw error;
        }
    }
    else if (dir.includes('ormconfig.yml')) {
        try {
            var file = (0, fs_1.readFileSync)((0, path_1.resolve)(path, 'ormconfig.yml'), 'utf8');
            var ymlConfig = YAML.parse(file).database;
            config = (0, database_1.transformOptions)(ymlConfig);
        }
        catch (error) {
            throw error;
        }
    }
    else if (dir.includes(".env." + env)) {
        try {
            var envConfig = dotenv.config({ path: ".env." + env }).parsed;
            config = (0, database_1.transformOptions)(envConfig);
        }
        catch (error) {
            throw error;
        }
    }
    else {
        throw new ReferenceError('The database configuration file was not found: .env.* | ormconfig.json | ormconfig.yml ');
    }
    return config;
};
exports.readDatabaseConfig = readDatabaseConfig;
var config = (0, exports.readDatabaseConfig)();
// 创建连接
exports.db = new ali_rds_async_1.default(config);

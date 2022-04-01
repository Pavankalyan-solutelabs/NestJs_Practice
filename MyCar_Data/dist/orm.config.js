"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    type: 'postgres',
    username: 'postgres',
    password: 'pg@solutelabs',
    port: 5432,
    host: '127.0.0.1',
    database: 'Nest_Practice',
    synchronize: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
};
//# sourceMappingURL=orm.config.js.map
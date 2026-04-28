"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const collection_entity_1 = require("./database/entities/collection.entity");
const collection_endpoint_entity_1 = require("./database/entities/collection-endpoint.entity");
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, '../.env') });
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'api_resp_differ',
    entities: [collection_entity_1.Collection, collection_endpoint_entity_1.CollectionEndpoint],
    migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map
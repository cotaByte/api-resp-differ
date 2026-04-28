"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const fs_1 = require("fs");
const path_1 = require("path");
async function generate() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(), {
        logger: false,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('api-resp-differ API')
        .setDescription('API for api-resp-differ')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const outputPath = (0, path_1.resolve)(process.cwd(), 'openapi.json');
    (0, fs_1.writeFileSync)(outputPath, JSON.stringify(document, null, 2), 'utf8');
    console.log(`OpenAPI spec written to ${outputPath}`);
    await app.close();
}
generate();
//# sourceMappingURL=generate-openapi.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionEndpoint = void 0;
const typeorm_1 = require("typeorm");
const collection_entity_1 = require("./collection.entity");
let CollectionEndpoint = class CollectionEndpoint {
    id;
    collectionId;
    collection;
    position;
    method;
    urlTemplate;
    headers;
    bodyTemplate;
    timeoutMs;
    retryCount;
    retryDelayMs;
    enabled;
    createdAt;
    updatedAt;
};
exports.CollectionEndpoint = CollectionEndpoint;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], CollectionEndpoint.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'collection_id', type: 'bigint' }),
    __metadata("design:type", String)
], CollectionEndpoint.prototype, "collectionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => collection_entity_1.Collection, (collection) => collection.endpoints, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'collection_id' }),
    __metadata("design:type", collection_entity_1.Collection)
], CollectionEndpoint.prototype, "collection", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], CollectionEndpoint.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], CollectionEndpoint.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url_template', type: 'text' }),
    __metadata("design:type", String)
], CollectionEndpoint.prototype, "urlTemplate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], CollectionEndpoint.prototype, "headers", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'body_template', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], CollectionEndpoint.prototype, "bodyTemplate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'timeout_ms', type: 'integer', nullable: true }),
    __metadata("design:type", Object)
], CollectionEndpoint.prototype, "timeoutMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'retry_count', type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], CollectionEndpoint.prototype, "retryCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'retry_delay_ms', type: 'integer', nullable: true }),
    __metadata("design:type", Object)
], CollectionEndpoint.prototype, "retryDelayMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], CollectionEndpoint.prototype, "enabled", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CollectionEndpoint.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CollectionEndpoint.prototype, "updatedAt", void 0);
exports.CollectionEndpoint = CollectionEndpoint = __decorate([
    (0, typeorm_1.Entity)('collection_endpoints'),
    (0, typeorm_1.Unique)(['collectionId', 'position'])
], CollectionEndpoint);
//# sourceMappingURL=collection-endpoint.entity.js.map
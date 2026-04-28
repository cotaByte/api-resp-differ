import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1777409069969 implements MigrationInterface {
    name = 'InitialSchema1777409069969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "collection_endpoints" ("id" BIGSERIAL NOT NULL, "collection_id" bigint NOT NULL, "position" integer NOT NULL, "method" character varying(10) NOT NULL, "url_template" text NOT NULL, "headers" jsonb NOT NULL DEFAULT '{}', "body_template" jsonb, "timeout_ms" integer, "retry_count" integer NOT NULL DEFAULT '0', "retry_delay_ms" integer, "enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_7170f72acb31e2e5499dbcb6a8a" UNIQUE ("collection_id", "position"), CONSTRAINT "PK_7d3bbc09555970b18ebb6a71f72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collections" ("id" BIGSERIAL NOT NULL, "name" text NOT NULL, "description" text, "created_by" bigint, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "collection_endpoints" ADD CONSTRAINT "FK_9a0d75167925c9084fc84187332" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_endpoints" DROP CONSTRAINT "FK_9a0d75167925c9084fc84187332"`);
        await queryRunner.query(`DROP TABLE "collections"`);
        await queryRunner.query(`DROP TABLE "collection_endpoints"`);
    }

}

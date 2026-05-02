import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTargets1746144000000 implements MigrationInterface {
  name = 'AddTargets1746144000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "targets" ("id" BIGSERIAL NOT NULL, "url" text NOT NULL, "color" text, "tag" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_targets" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "targets"`);
  }
}

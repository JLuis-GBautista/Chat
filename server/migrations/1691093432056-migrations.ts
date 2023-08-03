import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691093432056 implements MigrationInterface {
    name = 'Migrations1691093432056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mensajes" ADD "extra" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mensajes" DROP COLUMN "extra"`);
    }

}

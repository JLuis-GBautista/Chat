import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691016853439 implements MigrationInterface {
    name = 'Migrations1691016853439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" ADD "extra" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "extra"`);
    }

}

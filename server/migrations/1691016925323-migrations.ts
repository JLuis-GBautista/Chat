import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691016925323 implements MigrationInterface {
    name = 'Migrations1691016925323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" ADD "extra2" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "extra2"`);
    }

}

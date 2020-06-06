import {MigrationInterface, QueryRunner} from "typeorm";

export class TestTo1591419106258 implements MigrationInterface {
    name = 'TestTo1591419106258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `article` ADD `test` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `article` DROP COLUMN `test`");
    }

}

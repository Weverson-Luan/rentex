import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserDeletUsername1648956119023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropColumn("users", "username")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.addColumn("users", 
        new TableColumn({
            name: 'username',
            type: 'varchar'
        }))
    }

}

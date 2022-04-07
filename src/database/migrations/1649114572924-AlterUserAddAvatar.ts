import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class AlterUserAddAvatar1649114572924 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.addColumn("users", new TableColumn({
            name: 'avatar',
            type:  'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropColumn('users', "avatar")
    }

}

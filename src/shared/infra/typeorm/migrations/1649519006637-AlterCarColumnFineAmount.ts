import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class AlterCarColumnFineAmount1649519006637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //removendo o campo 
        await queryRunner.dropColumn("cars", "fine_amout");

        //adicionando o campo
        await queryRunner.addColumn("cars", new TableColumn({
            name: "fine_amount",
            type: "numeric",
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          //removendo o campo 
          await queryRunner.addColumn("cars", new TableColumn({
            name: "fine_amount",
            type: "numeric",
        }));

        //quando der um migrations:revert desfazer nossa alteração
        await queryRunner.dropColumn("cars", "fine_amount")
    }

}

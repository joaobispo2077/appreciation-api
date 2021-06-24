import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1624546000374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'compliments',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'user_sender' ,
                    type: 'uuid',
                },
                {
                    name: 'user_receiver' ,
                    type: 'uuid',
                },
                {
                    name: 'tag_id' ,
                    type: 'uuid',
                },
                {
                    name: 'message' ,
                    type: 'varchar',
                },
                {
                    name: 'created_at' ,
                    type: 'timestamp',
                    default: "now()"
                },
            ],
            foreignKeys: [
                {
                    name: 'FKUserSenderCompliments',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_sender'],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"

                },
                {
                    name: 'FKUserReceiverCompliments',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_receiver'],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"

                },
                {
                    name: 'FKTag',
                    referencedTableName: 'tags',
                    referencedColumnNames: ['tag_id'],
                    columnNames: ['id'],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"

                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('compliments');
    }

}

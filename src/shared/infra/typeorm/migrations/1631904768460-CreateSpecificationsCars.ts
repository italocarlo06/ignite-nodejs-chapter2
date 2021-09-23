import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpecificationsCars1631904768460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "specifications_cars",
            columns: [
                {
                    name: "car_id",
                    type: "uuid"
                },
                {
                    name: "specification_id",
                    type: "uuid"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default:"now()"
                }
            ],
            foreignKeys:[
                {
                    name: "FK_SpecificationsCarsCars",
                    referencedTableName: "cars",
                    referencedColumnNames: ["id"],
                    columnNames: ["car_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                } ,
                {
                    name: "FK_SpecificationsCarsSpecification",
                    referencedTableName: "specifications",
                    referencedColumnNames: ["id"],
                    columnNames: ["specification_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                } 
             ]   
            
        })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("specifications_cars");
    }

}

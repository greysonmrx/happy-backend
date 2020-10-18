import { MigrationInterface, QueryRunner, Table } from "typeorm";

class createTokens1603040623276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(new Table({
      name: 'tokens',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'token',
          type: 'uuid',
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'user_id',
          type: 'integer'
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
      ],
      foreignKeys: [
        {
          name: 'TokenUser',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}

export default createTokens1603040623276;

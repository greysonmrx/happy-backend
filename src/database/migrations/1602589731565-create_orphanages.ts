import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class createOrphanages1602589731565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
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
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'latitude',
          type: 'varchar'
        },
        {
          name: 'longitude',
          type: 'varchar'
        },
        {
          name: 'whatsapp',
          type: 'varchar',
        },
        {
          name: 'about',
          type: 'text'
        },
        {
          name: 'pending',
          type: 'boolean',
          default: true
        },
        {
          name: 'instructions',
          type: 'text'
        },
        {
          name: 'opening_hours',
          type: 'varchar',
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }
}

export default createOrphanages1602589731565;

import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';

class adminUser1603031826696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        email: 'admin@happy.com.br',
        password: await hash('123456', 8),
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from('users')
      .where('email = admin@happy.com.br')
      .execute();
  }
}

export default adminUser1603031826696;

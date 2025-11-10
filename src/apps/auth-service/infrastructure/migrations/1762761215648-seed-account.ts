import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAccount1762761215648 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      INSERT INTO account (id, email, password, status, role)
      VALUES (
        'a8eb19b3-d405-47ed-ad79-1abe44690292',
        'admin@dstore.com',
        '$2a$12$VAp54jDxs80eZRosxFuYruMvzFR7uhGoSZ/VXGDzCoEdK3faWo9cC',
        'ACTIVE',
        'ADMIN'
      );
    `);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(
      `DELETE FROM account WHERE id = 'a8eb19b3-d405-47ed-ad79-1abe44690292'`,
    );
  }
}

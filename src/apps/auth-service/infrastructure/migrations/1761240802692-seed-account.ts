import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAccount1761240802692 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      INSERT INTO account (id, email, password, status, role)
      VALUES (
        '05601310008710784481',
        'dungva1505@gmail.com',
        '$2a$12$VAp54jDxs80eZRosxFuYruMvzFR7uhGoSZ/VXGDzCoEdK3faWo9cC',
        'ACTIVE',
        'ADMIN'
      );
    `);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(`DELETE FROM account WHERE id = '05601310008710784481'`);
  }
}

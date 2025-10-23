import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1761240802691 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      INSERT INTO users (id, name, email, password, phone, status, type)
      VALUES (
        '48fa6f43-e550-4228-a0c3-00dc8602552b',
        'System Admin',
        'dungva1505@gmail.com',
        '$2a$12$VAp54jDxs80eZRosxFuYruMvzFR7uhGoSZ/VXGDzCoEdK3faWo9cC',
        '+84 0972 726 021',
        'ACTIVE',
        'ADMIN'
      );
    `);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(`DELETE FROM users WHERE id = '05601310008710784481'`);
  }
}

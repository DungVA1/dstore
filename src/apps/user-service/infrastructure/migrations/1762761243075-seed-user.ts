import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1762761243075 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      INSERT INTO user (id, account_id, name, email, phone, status, type)
      VALUES (
        '48fa6f43-e550-4228-a0c3-00dc8602552b',
        'a8eb19b3-d405-47ed-ad79-1abe44690292',
        'System Admin',
        'admin@dstore.com',
        '+84 0972 726 021',
        'ACTIVE',
        'ADMIN'
      );
    `);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(
      `DELETE FROM user WHERE id = '48fa6f43-e550-4228-a0c3-00dc8602552b'`,
    );
  }
}

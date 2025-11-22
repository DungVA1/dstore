import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitRefreshTokenSchema1763793663128 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expired_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE IF EXISTS refresh_tokens;`);
  }
}

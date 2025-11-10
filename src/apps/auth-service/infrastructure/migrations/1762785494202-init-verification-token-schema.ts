import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitVerificationTokenSchema1762785494202
  implements MigrationInterface
{
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE IF NOT EXISTS verification_tokens (
        id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expired_at TIMESTAMPTZ NOT NULL,
        attempts INT NOT NULL,
        used_at TIMESTAMPTZ NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE IF EXISTS verification_tokens;`);
  }
}

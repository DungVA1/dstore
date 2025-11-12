import * as bcrypt from 'bcrypt';

export class Encrypt {
  static async hashString(plainText: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = bcrypt.hash(plainText, salt);

    return hashPassword;
  }

  static compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}

export interface SecurityService {
  hash: (plaintext: string) => Promise<string>;
  compare: (plainText: string, hash: string) => Promise<boolean>;
}

export class SecurityServiceImplementation implements SecurityService {
  private saltRounds = 10;

  constructor(private bcrypt: any) {}

  hash(plaintext: string): Promise<string> {
    return this.bcrypt.hash(plaintext, this.saltRounds);
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return this.bcrypt.compare(plainText, hash);
  }
}

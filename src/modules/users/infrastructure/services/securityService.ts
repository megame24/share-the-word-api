// inject it here also for testability!!!!!
interface Bcrypt {
  hash: (plainText: string, saltRounds: number) => Promise<string>;
  compare: (plainText: string, hash: string) => Promise<boolean>;
}

export interface SecurityService {
  hash: (plaintext: string) => Promise<string>;
  compare: (plainText: string, hash: string) => Promise<boolean>;
}

export class SecurityServiceImplementation implements SecurityService {
  private saltRounds = 10;

  constructor(private bcrypt: Bcrypt) {}

  hash(plaintext: string): Promise<string> {
    return this.bcrypt.hash(plaintext, this.saltRounds);
    // return hash;
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return this.bcrypt.compare(plainText, hash);
    // return isEqual;
  }
}

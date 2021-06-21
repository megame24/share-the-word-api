type UUIDv4 = () => string;

export interface UUIDService {
  generate: () => string;
}

export class UUIDServiceImplementation implements UUIDService {
  constructor(private uuidv4: UUIDv4) {}

  generate(): string {
    return this.uuidv4();
  }
}

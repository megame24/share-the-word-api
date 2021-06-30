export interface UUIDService {
  generate: () => string;
}

export class UUIDServiceImplementation implements UUIDService {
  constructor(private uuidv4: any) {}

  generate(): string {
    return this.uuidv4();
  }
}

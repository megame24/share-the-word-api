class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export interface ErrorService {
  throwError: (message: string, status: number) => CustomError;
}

export class ErrorServiceImplementation implements ErrorService {
  throwError(message: string, status = 500): CustomError {
    const err = new CustomError(message, status);
    throw err;
  }

  // put error middleware here.
}

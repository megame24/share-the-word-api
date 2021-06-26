class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export interface ErrorService {
  badRequestError: (message: string) => CustomError;
  unauthorizedError: (message: string) => CustomError;
  forbiddenError: (message: string) => CustomError;
  internalServerError: (message: string) => CustomError;
}

export class ErrorServiceImplementation implements ErrorService {
  badRequestError(message: string): CustomError {
    return new CustomError(message, 400);
  }

  unauthorizedError(message: string): CustomError {
    return new CustomError(message, 401);
  }

  forbiddenError(message: string): CustomError {
    return new CustomError(message, 403);
  }

  internalServerError(message: string): CustomError {
    return new CustomError(message, 500);
  }

  // put error middleware here.
}

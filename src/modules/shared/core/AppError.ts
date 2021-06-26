export default class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static badRequestError(message: string): AppError {
    return new AppError(message, 400);
  }

  static unauthorizedError(message: string): AppError {
    return new AppError(message, 401);
  }

  static forbiddenError(message: string): AppError {
    return new AppError(message, 403);
  }

  static internalServerError(message: string): AppError {
    return new AppError(message, 500);
  }
}

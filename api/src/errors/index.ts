export class ApiError extends Error {
  statusCode: number;
  msg: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.msg = message;
  }
}

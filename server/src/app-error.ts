export default class AppError extends Error {
  errMessage: string;
  errCode: number;

  constructor(errMessage: string, errCode: number) {
    super();
    this.errMessage = errMessage;
    this.errCode = errCode;
  }
}

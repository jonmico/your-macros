import { NextFunction, Request, Response } from 'express';

export async function createLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('hey i need to code the log model first.');
}

import { Response } from 'express';

type StatusErrorCodes = 500 | 400;

export const responseError = (
  res: Response,
  message: string,
  status: StatusErrorCodes = 500,
) => {
  return res.status(status).json({ error: { message } });
};

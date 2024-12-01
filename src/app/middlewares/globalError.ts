/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const globalError = (
  error: any,
  req: Request,
  res: Response, 
  next: NextFunction,
) => {  
  res.status(500).json({
    success: false,
    message: 'Internal server error some thing wrong',
    error: error instanceof Error ? error.message : 'Unknown error',
  });
};

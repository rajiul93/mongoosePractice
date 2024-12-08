/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../error/handleZodError';
import handleValidationError from '../error/validationError';
import { TErrorSources } from '../interface/errorInterface';

// eslint-disable-next-line no-unused-vars
export const globalError: ErrorRequestHandler = (error, req, res, nex) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  let errorSource: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error,
    stack: config.Node_env === 'development' ? error?.stack : null,
  });
};

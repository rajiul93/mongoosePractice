import { ZodError, ZodIssue } from 'zod';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/errorInterface';

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: ' Zod Validation error',
    errorSources,
  };
};

export default handleZodError;

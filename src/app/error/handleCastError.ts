import mongoose from 'mongoose';
import {
    TErrorSources,
    TGenericErrorResponse,
} from '../interface/errorInterface';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode,
    message: ' CastError invalid ID',
    errorSources,
  };
};

export default handleCastError;

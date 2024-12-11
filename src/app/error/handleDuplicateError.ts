import {
    TErrorSources,
    TGenericErrorResponse,
} from '../interface/errorInterface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: 'aa',
      message: extractedMessage,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: ` ${extractedMessage} department already belong in collection`,
    errorSources,
  };
};

export default handleDuplicateError;

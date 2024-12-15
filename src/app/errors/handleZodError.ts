import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interfaces/error';

const handleZodError = (err: ZodError) => {
  const statusCode = 400;

  const errorSource: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handleZodError;

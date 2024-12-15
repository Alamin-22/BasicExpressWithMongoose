import mongoose, { CastError } from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';


const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSource: TErrorSources = Object?.values(err?.errors)?.map(
    (val: mongoose.Error.ValidatorError | CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handleValidationError;

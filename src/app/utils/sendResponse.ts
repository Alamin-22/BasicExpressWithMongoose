import { Response } from 'express';

// generic types
interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: { page: number; limit: number; total: number; totalPage: number };
  data: T;
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;

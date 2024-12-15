export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export interface TGenericErrorResponse {
  statusCode: number;
  message: string;
  errorSource: TErrorSources;
}

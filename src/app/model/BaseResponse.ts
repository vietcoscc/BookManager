export class BaseResponse<T> {
  status: string = '';
  message: string = '';
  body?: T;
}

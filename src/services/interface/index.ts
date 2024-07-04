export interface Result {
  msg: string;
  code: string;
}

export interface ResultData<T = any> extends Result {
  data: T;
}

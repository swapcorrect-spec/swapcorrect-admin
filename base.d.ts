type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};
  
  type BaseApiPayloadDto<T> = Prettify<{
    payload: T;
  }>;
  
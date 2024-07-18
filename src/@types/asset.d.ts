// 全局变量声明
declare const nav: any;
declare const aaa: any;
declare const precall: any;
declare const process: {
  env: {
    NODE_ENV: string;
    MY_ENV_NUMBER: number;
    MY_ENV_STRING: string;
    MY_ENV_FUNC: (...ares: any[]) => string;
  };
};

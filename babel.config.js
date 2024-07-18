module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: "3",
      },
    ],
  ],
  plugins: [
    [
      "./plugin/env-plugin",
      {
        ...process.env,
        MY_ENV_NUMBER: 1234,
        MY_ENV_STRING: "string",
        MY_ENV_FUNC: (value) => {
          return "MY_ENV_FUNC" + value;
        },
      },
    ],
    [
      "./plugin/inject-plugin",
      {
        nav: `import { nav } from '@/common';`,
      },
    ],
  ],
};

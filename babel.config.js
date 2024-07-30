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
      "babel-plugin-precall",
      {
        value: 'precall'
      }
    ],
    [
      "babel-plugin-env-val",
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
      "babel-plugin-auto-inject",
      {
        nav: `import { nav } from '@/common';`,
      },
    ],
  ],
};

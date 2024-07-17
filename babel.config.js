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
      "./plugin/inject-plugin",
      {
        nav: `import { nav } from '@/common';`,
      },
    ],
  ],
};

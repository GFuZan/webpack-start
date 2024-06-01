import "./index.scss";

[1, 2, 3].map((n) => n + 1);

[1, 2, 3].includes(2);


Promise.resolve().finally(() => {
  console.log([].flatMap((v) => v?.a));
});

// (async () => {
//   await Promise.resolve(1)
//   await Promise.resolve(2)
// })()

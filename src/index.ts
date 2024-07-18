aaa.nav.getData();

console.log(nav.getData());

process.env.NODE_ENV.toString() === "development" && console.log("NODE_ENV");

process.env.MY_ENV_NUMBER === 1 && console.log("MY_ENV_NUMBER");
process.env.MY_ENV_STRING === "development" && console.log("MY_ENV_STRING");
process.env.MY_ENV_FUNC(111) === "development" && console.log("MY_ENV_FUNC");
console.log(process.env.MY_ENV_NUMBER);
console.log(process.env.MY_ENV_STRING);
console.log(process.env.MY_ENV_FUNC(111));

console.log(
  precall(`
    const fs = require('fs');
    module.exports=fs.readFileSync('./src/test.txt', 'utf8');
  `)
);

console.log(
  precall(`
    module.exports=process.env.MY_ENV_FUNC(222);
  `)
);

console.log(
  precall(`
    module.exports=()=> 1
`)
);

console.log(
  precall(`
    module.exports=()=> 1
  `)()
);
console.log(precall(123));
console.log(precall());

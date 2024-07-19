// @ts-ignore
// 自动注入插件(inject-plugin)测试
console.log(nav.getData());

// 环境变量插件(env-plugin)测试
process.env.NODE_ENV.toString() === "development" && console.log("NODE_ENV");
process.env.MY_ENV_NUMBER === 1 && console.log("MY_ENV_NUMBER");
process.env.MY_ENV_STRING === "development" && console.log("MY_ENV_STRING");
process.env.MY_ENV_FUNC(111) === "development" && console.log("MY_ENV_FUNC");
console.log(process.env.MY_ENV_NUMBER);
console.log(process.env.MY_ENV_STRING);
console.log(process.env.MY_ENV_FUNC(111));

// @ts-ignore
// 预调用插件(pre-call-plugin)测试
const { aaa } = require(precall('module.exports="@/common"'));
console.log(aaa.nav.getData());
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

aaa.nav.getData();

console.log(nav.getData());


process.env.NODE_ENV.toString() === "development" && console.log("NODE_ENV");

process.env.MY_ENV_NUMBER === 1 && console.log("MY_ENV_NUMBER");
process.env.MY_ENV_STRING === "development" && console.log("MY_ENV_STRING");
process.env.MY_ENV_FUNC(111) === "development" && console.log("MY_ENV_FUNC");

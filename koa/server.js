const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const fs = require("fs"); // 读取文件用
const path = require('path');

const app = new Koa();
const router = new Router();

console.log("koa init");

// 提供一个/getJson接口
router.get("/getResult", async ctx => {
    // 后端允许cors跨域请求
    await cors();
    // 返回给前端的数据
    ctx.body = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./result.json")));
    console.log("request", ctx);
});

// 将koa和两个中间件连起来
app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(3000);

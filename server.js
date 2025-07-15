const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// 将 'docs' 文件夹设置为静态资源目录
app.use(express.static(path.join(__dirname, "docs")));

app.listen(port, () => {
  console.log(`服务器正在 http://localhost:${port} 上运行`);
});

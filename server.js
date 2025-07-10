const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 将 'public' 文件夹设置为静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 一个简单的根路由，可以指向一个欢迎页面
app.get('/', (req, res) => {
  // 假设你在 public 文件夹里有一个 index.html
  res.sendFile(path.join(__dirname, 'public/index.html')); 
});

app.listen(port, () => {
  console.log(`服务器正在 http://localhost:${port} 上运行`);
});
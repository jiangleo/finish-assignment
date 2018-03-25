# finish-assignment

我写了一个 nodejs 的查询脚本，可以查询已交作业的同学有哪些。(现在只能在本地运行)


```
$ git clone https://github.com/jiangleo/finish-assignment.git
$ cd finish-assignment
$ npm install
$ node index.js
```


查询规则：

1.  必须提交 pull request 到 Team-X 上。
const url = `https://github.com/Guigulive/Team-${abc}/pulls${q}`;

2.  必须以学号开头，学号和姓名等信息中间需要添加 _ 或 - 或 空格
const msgReg = /(\d+)[\-\_\s]/;

3.  必须要有 “四” 这个关键字。
const keywords = /四/;

正确示例： 19_蒋宏伟_第四课作业

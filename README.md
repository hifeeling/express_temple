# express模板开发说明_v1


### 目录
	| --- server.js （应用启动文件）
	| --- app （后台运行文件）
		| --- models
		| --- views
		| --- controllers
	| --- public （静态资源文件）
		| --- html
		| --- css
		| --- img
		| --- js
		| --- 其他的静态资源文件夹
	| --- config
		| --- express.js （express配置文件）
	| --- package.json （依赖包的配置文件）

### 相关术语解释

#### Node.js
基于chrome的v8引擎打造的脚本运行平台，整合进了一些服务端的模块（比如http,morgan,cookie-parse等），从而形成一个完整的网络应用程序，用户可以在这个平台使用JS完成服务端的开发工作

#### Express
Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。
Express 不对 Node.js 已有的特性进行二次抽象，我们只是在它之上扩展了 Web 应用所需的基本功能。


#### Http请求原理

每一个http请求客户端都会与服务器经历三次握手

- 客户端发送一个标识码（A）给服务器
- 服务器接收标识码并向客户端发送自己生成的标识码（A+B）
- 客户端接收并确定自己标识码是否是自己发出去的，并把刚刚接收到的另外一个标识码返还给服务器（B）



经历了以上步骤，客户端和服务器就可以建立传输的连接，node.js会监听每一次请求，通过后台配置来做出相应的反馈
	
	var http = require("http");  // 加载一个http请求模块
	http.createServer(function (req, res){ // 创建一个http服务，req封装了请求头，res封装了响应内容
		//  这是一个请求的分发中心，根据路由/参数来做相应的处理
	}).listen(port, url); // 监听服务的端口和域名
	


#### 路由注意事项
- 路由会先优化经过静态资源目录

		app.use(express.static(path.join(__dirname, '../public')));   // 静态资源目录设置方法
		app.use(express.static(path.join(__dirname, '../files')));  // 也可以把多个目录设置为静态资源目录，如果访问地址重名，后定义的路径会生效



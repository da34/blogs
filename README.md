<p align="center"><a href="https://blog.lsyboy.cn" target="_blank"><img width="200"src="https://resource.lsyboy.cn/blog/static/img/logo.cd9bb43.png"></a></p>

<div align="center">
  <strong>
    📝 基于 Vue、Nuxt、Nest.js 开发的前后端分离的个人博客系统
  </strong>
</div>

<br>

<div align="center">
  <a href="https://github.com/da34/blogs">
    <img src="https://img.shields.io/github/license/nicejade/markdown-online-editor.svg" alt="LICENSE">
  </a>
  <a href="https://v3.cn.vuejs.org/">
    <img src="https://img.shields.io/badge/vue-3.2.x-brightgreen.svg" alt="玉捷 Code - 个人博客系统">
  </a>
  <a href="https://nestjs.com//">
    <img src="https://img.shields.io/badge/nuxt-2.15.8-brightgreen.svg" alt="玉捷 Code - 个人博客系统">
  </a>
  <a href="https://nestjs.com/">
    <img src="https://img.shields.io/badge/nest-8.0-brightgreen.svg" alt="玉捷 Code - 个人博客系统">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/tailwindcss-3.0.9-brightgreen.svg" alt="玉捷 Code - 个人博客系统">
  </a>
  <a href="https://pinia.vuejs.org/">
    <img src="https://img.shields.io/badge/pinia-2.0-yellow.svg" alt="玉捷 Code - 个人博客系统">
  </a>
</div>

### 项目地址

前台地址: [https://blog.lsyboy.cn](https://blog.lsyboy.cn)  
后台地址: [https://admin.lsyboy.cn](https://admin.lsyboy.cn)（需注册）<br>
Github: [https://github.com/da34/blogs.git](https://github.com/da34/blogs.git)



### 介绍

以前也搭建过自己的博客，利用`typecho`、`wordpress`等等，后面觉得自己就是学前端的，就为了巩固自己的技术，以及让自己了解前后端，以及上线的整个过程，就利用课余时间断断续续开发了这个博客。


**☀️技术栈：**

前端（博客页面+后台管理）：

- `Nuxt.js`（博客页面）
- 状态集中管理工具`Pinia`（后台管理）
- 前端路由`Vue-Router`
- 原子CSS`tailwindcss`
- 组件库`Naive`
- [一言](https://hitokoto.cn/)提供首页的诗句
- `markdown`格式渲染工具`@kangc/v-md-editor`
- 其他第三方包

后端：


后端使用`Nest.js`作为框架，包括但不限于：


- 用户管理：登录、注册
- 评论回复的邮箱提醒API，使用`nodemailer`编写
- 评论审核，使用[华为云](https://www.huaweicloud.com/product/textmoderation.html)的`内容审核-文本`（月调用量 < 1000，免费！！😀）
- 数据库：使用`Mysql`存储博客的数据

其他：

- 已配置SSL证书，开启`HTTPS`访问
- 对象存储使用七牛云OSS


### 项目截图

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b9e1400628948558c180dac79d34c89~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d24ddff6d094b58b95c46f901a4d5fb~tplv-k3u1fbpfcp-watermark.image?)

### 目前功能

#### 前台
- [x] 文章
- [x] 作品
- [x] 建站日志
- [x] 评论/回复
- [x] 文章目录
- [x] 搜索功能
- [x] 自定义页面
- [x] 响应式布局

#### 后台

- [x] 登录
- [x] 文章管理
- [x] 评论管理
- [x] 标签管理
- [x] 友链管理
- [x] 分类管理
- [x] 作品管理
- [x] 建站日志管理
- [x] 页面管理
- [x] 邮件管理

### 运行


**注意事项**


- 后端的`prod.env.example`和`dev.env.example`这两个配置文件，去掉后面的`.example`
然后再把里面的配置补全
- 前台如果打包的静态资源不上传cdn，需要把`nuxt.config.js`里的`publicPath`删除
- 前台上传到七牛云cdn就需要配置，把`upload.example.js`配置写上，然后把`.example`删除，
    然后执行`npm run upload`




### 最后
由于水平有限，会在自己技术不断进步下，继续将此博客继续完善。欢迎大家多多提建议

您的`start` ⭐是我坚持的动力，感谢大家的支持，欢迎提交`pr`共同改进项目。



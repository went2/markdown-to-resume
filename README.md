# Markdown-to-Resume

[m2r](m2r.netlify.app)，一个简易的简历页生成器。

## 使用应用

1. 导入 markdown 格式的简历文件；
2. 在线编辑简历内容并实时预览效果；
3. 导出编辑后的 pdf 及 md 文件

## 在本地运行应用

1. 将本项目克隆到本地，进入项目根目录，安装依赖 `npm install`
2. 运行项目：`npm start`
3. 本地打包：`npm run build`

## 开发记要

在准备简历的这段时间，发现写一份简历包含两件事情：1. 写简历内容；2. 将内容排版成简历的格式。写内容的时候应该尽量减少对格式的思考，而写完一份内容后，可以自由套用不同的样式。对我而言，这种需求的解决方式是，用 markdown 写简历源文件、导入简历应用、预览效果，最后导出 pdf 文件。用了几个在线制作简历的应用程序，感觉自己也可以写一写，于是：
  - 第一天，明确需求（导入本地 md 文件，可编辑，可查看导出效果，可导出 md 和 pdf 文件）；寻找解决思路：
    1. 如何在线编辑文件：读取导入文件，将内容填入 `<textarea>` 应该就能编辑
    2. 如何预览效果？即如何将字符串的 md 内容转成 html 并插入到页面？markdown 字符串转 html 字符串涉及到两种语言格式的转换，一般的做法是，1）解析 markdown，将之转为 AST（抽象语法树）；2）编译 AST，生成 html 字串，这一整套的事情都能交给 `unified` 及其插件完成
    3. 生成的 html 字符串如何显示到网页？可以用 `iframe`，`iframe` 创造了一个独立浏览器环境，将 html 字串交给它即可，如 `<iframe srcdoc="htmlStr">`
    4. 如何实现编辑器中内容改变，iframe 中的页面也跟着改变？使用响应式框架 + 状态管理。
    5. 第一天按照上面的思路用 React & Redux 搭了一个编辑器的雏形，左右两栏，左边编辑 md，右边显示 html。

![first-day-work](https://user-images.githubusercontent.com/20923112/222759116-b3f1bc9c-7535-40c4-b042-f9ceef74e852.gif)
  
  - 第二天：用 `CodeMirror` 代替左侧编辑区域，用 `react-remark` 生成的 React 组件替换右边的 iframe，以解决 iframe 整体刷新造成的闪屏问题
  - 第三天：增加了左右分栏，探索导出 pdf 的方案（window.print，jsPdf.html，canvas2Html + jsPdf.addImage）
  - 第四天：优化导出 pdf 的分页问题。用 canvas2Html + jsPdf.addImage 的方式导出 pdf 会面临三个坑：1）导出的图片模糊；2）提升图片的清晰度后，文件大小明显上升；3）文件分页后，有的内容会被截断；分页这个坑，目前采用遍历节点树，在跨页的子节点上方插入空白节点，将之挤到下一页的方式暂时解决。
    
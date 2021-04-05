

## 开发（基于[vue-element-admin](https://panjiachen.github.io/vue-element-admin)实现，其他细节可去[文档](https://panjiachen.github.io/vue-element-admin-site/zh/)查看）

```bash
# 克隆项目
git clone https://github.com/ShaoNingYa/PaperReaderElementAdmin.git
# 进入项目目录
cd PaperReaderElementAdmin
# 安装依赖(速度慢，可以常识下面的方法)
npm install
# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
# 启动服务（用于开发）
npm run dev
# 编译生成（用于部署）
npm run build:prod
```

浏览器访问 http://localhost:9527  [在线 Demo](http://1.15.130.237/)

# TODO功能：
- 增加在线word、ppt、excel预览功能 https://github.com/kekingcn/kkFileView
```html
<iframe 
    v-else
    :src="'https://view.officeapps.live.com/op/view.aspx?src='+file" 
    width='100%' 
    height='100%' 
    frameborder='1'>
</iframe>
```
- 增加按钮粒子效果 https://gitee.com/pxp/vue-particle-effect?_from=gitee_search
- 增加聊天室功能 https://gitee.com/june000/lemon-im?_from=gitee_search
# 问题

- 部署时，需要更改的地方：

  - .env.production 和 .env.development

  - 还要把mock相关的东西都删掉（不然会报`Unexpected token u in JSON at position 0`错误，由mock所引起）

    - main.js 第32-35行

      ```
      if (process.env.NODE_ENV === 'production') {
          const { mockXHR } = require('../mock')
          mockXHR()
      }
      ```

    - vue.config.js 第39行 `before: require('./mock/mock-server.js')`

    
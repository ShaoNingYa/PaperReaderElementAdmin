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
        
        
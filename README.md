# Vue

### 下载Nvm安装Node.js
> https://github.com/coreybutler/nvm-windows/releases

- 查看安装版本,是否成功
```npm
nvm -v
```

- 修改nvm安装目录中的setting.txt,添加taobao镜像地址
> node_mirror: https://npm.taobao.org/mirrors/node/ 
> npm_mirror: https://npm.taobao.org/mirrors/npm/


- 查看网上可用版本
```npm
nvm list available
```

- 选择对应版本,安装
```npm
nvm install 10.15.3
nvm install 12.16.0
```

- 查看本地安装的版本
```npm
nvm list
```

- 使用/切换本地版本
```npm
nvm use 10.15.3
```

- 查看node/npm版本
```npm
node -v
npm -v
```

- 卸载node
```npm
nvm uninstall 10.15.3
```


- 安装npm镜像管理nrm
```npm
npm install -g nrm
```

- 查看可用镜像(*星号代表当前使用)
```npm
> nrm ls
```

- 切换镜像
```npm
> nrm use cnpm
```

- 测试镜像延迟
```npm
> nrm test npm
```





### Node安装Vue-Cli
> https://cli.vuejs.org/zh/

- 全局安装cli
```npm
npm install -g @vue/cli
```

- 查看vue版本
```vue
vue --version
```

- init脚手架
```vue
vue create vue-demo
```





### Node构建Vue项目
- setup
```
npm install
```

- 启动(热部署)
```
npm run serve
```

- 启动正式构建
```
npm run build
```

- lints
```
npm run lint
```





### 安装其他依赖
- element-ui库
```npm
npm install element-ui

```
main.js中import:

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

---
- axios网路请求工具
```npm
npm install axios

```
api.js中import:

import Axios from "axios"

---
- vuex缓存
```npm
npm install vuex
```
store.js中import:

import Vuex from 'vuex'

---
- font-awesome图标库
```npm
npm install font-awesome
```
main.js中import:

import 'font-awesome/css/font-awesome.min.css'





### Reference

- [Vue](https://cli.vuejs.org/)
# Vue

### 下载Nvm安装Node.js
> https://github.com/coreybutler/nvm-windows/releases

- 查看安装版本,是否成功
> nvm -v

- 修改nvm安装目录中的setting.txt,添加taobao镜像地址
> node_mirror: https://npm.taobao.org/mirrors/node/ 
> npm_mirror: https://npm.taobao.org/mirrors/npm/

- 查看网上可用版本
> nvm list available

- 选择对应版本,安装
> nvm install 10.15.3
> nvm install 12.16.0

- 查看本地安装的版本
> nvm list

- 使用/切换本地版本
> nvm use 10.15.3

- 查看node/npm版本
> node -v
> npm -v

- 卸载node
> nvm uninstall 10.15.3

- 安装npm镜像管理nrm
> npm install -g nrm

- 查看可用镜像(*星号代表当前使用)
> nrm ls

- 切换镜像
> nrm use cnpm

- 测试镜像延迟
> nrm test npm


### Node安装Vue-cli
> https://cli.vuejs.org/zh/

- 全局安装cli
> npm install -g @vue/cli

- 查看vue版本
> vue --version

- init脚手架
> vue create vue-demo
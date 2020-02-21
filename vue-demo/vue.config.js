let proxyObj = {};
// 使用node代理自动转发请求到后端,屏蔽跨域问题(项目部署可以使用nginx代理转发解决)
proxyObj['/'] = {
    ws: false,
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}

module.exports = {
    // 默认是8080,配置代理转发到后端8081端口,使请求处于同一个域
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    },
    // idea调试配置,浏览器安装jetBrain插件,同时config配置JavaScript Debugger,即可断点调试
    configureWebpack: {
        devtool: 'source-map'
    }
}


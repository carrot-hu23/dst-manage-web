const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line func-names
module.exports = function (app) {

    app.use(createProxyMiddleware('/api', {
        target: "http://1.12.223.51:8084/",
        changeOrigin: true,
    }))

}
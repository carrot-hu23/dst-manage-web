const { createProxyMiddleware } = require('http-proxy-middleware');

const ipUrl = process.env.REACT_APP_API_URL

// eslint-disable-next-line func-names
module.exports = function (app) {

    app.use(createProxyMiddleware('/api', {
        target: ipUrl,
        changeOrigin: true,
    }))
    app.use(createProxyMiddleware('/steam', {
        target: ipUrl,
        changeOrigin: true,
    }))
    app.use(createProxyMiddleware('/hello', {
        target: ipUrl,
        changeOrigin: true,
    }))

}
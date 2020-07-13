const {resolve} = require("path");
module.exports = {
    publicPath: "/",
    assetsDir: "static",
    lintOnSave: false,
    chainWebpack: config => {
        config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10240 }))

        config.resolve.alias
        .set("@", resolve("src"))
        .set("@assets", resolve("src/assets"))
        .set("@components", resolve("src/components"))
        .set("@public", resolve("public"));
    }
}
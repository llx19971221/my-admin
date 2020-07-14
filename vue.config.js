const {resolve} = require("path");
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
module.exports = {
    publicPath: "/",
    assetsDir: "static",
    lintOnSave: false,
    configureWebpack: (config) => {
        config.plugins = [...config.plugins,
            new ThemeColorReplacer({
            matchColors: [
                ...forElementUI.getElementUISeries("#409EFF"),
            ],
            fileName: 'css/theme-colors-[contenthash:8].css', //optional. output css file name, suport [contenthash] and [hash].
            // resolveCss(resultCss) { // optional. Resolve result css code as you wish.
            //     return resultCss.replace(/#ccc/g, '#eee')
            // },
            
            // externalCssFiles: ['./node_modules/element-ui/lib/theme-chalk/index.css'], // optional, String or string array. Set external css files (such as cdn css) to extract colors.
            changeSelector: forElementUI.changeSelector, // optional, Funciton. Changing css selectors, in order to raise css priority, to resolve lazy-loading problems.
            //     return util.changeEach(selector, '.el-button--default')
            // },
            // injectCss: false, // optional. Inject css text into js file, no need to download `theme-colors-xxx.css` any more.
            isJsUgly: process.env.NODE_ENV !== 'development',
        })
        ]
    },

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

        config.plugins.delete("prefetch")
        // ({
        //     fileName: 'css/theme-colors-[contenthash:8].css', //optional. output css file name, suport [contenthash] and [hash].
        //     // resolveCss(resultCss) { // optional. Resolve result css code as you wish.
        //     //     return resultCss.replace(/#ccc/g, '#eee')
        //     // },
            
        //     // externalCssFiles: ['./node_modules/element-ui/lib/theme-chalk/index.css'], // optional, String or string array. Set external css files (such as cdn css) to extract colors.
        //     changeSelector: forElementUI.changeSelector, // optional, Funciton. Changing css selectors, in order to raise css priority, to resolve lazy-loading problems.
        //     //     return util.changeEach(selector, '.el-button--default')
        //     // },
        //     // injectCss: false, // optional. Inject css text into js file, no need to download `theme-colors-xxx.css` any more.
        //     isJsUgly: process.env.NODE_ENV !== 'development',
        // })
    }
}
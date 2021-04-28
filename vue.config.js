//const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
module.exports = {
    /* 路由的公共前缀，默认为'/',也可以根据需要配置路由前缀，例如'/client/' */
    publicPath: '/',
    /* build构建时，在根目录下的输出目录名称 */
    outputDir: 'dist',
    /* build构建时，静态资源的输出目录（相对于outputDir配置的目录，即在outputDir目录下） */
    assetsDir: 'assets',
    /* 指定生成的 index.html 的输出路径 (相对于 outputDir) */
    indexPath: 'index.html',
    /* 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存,true开启，false关闭
    *  `${dir}/[name]${options.filenameHashing ? '.[hash:8]' : ''}.[ext]`
    * */
    filenameHashing: false,
    /*  一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
    或一个指定其 entry 的字符串。一般不需要配置，vue-cli4已经默认配置好entry:'main.js' */
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            fliename: 'index.html'
        }
    },
    /* 其值为： boolean | 'warning' | 'default' | 'error'；
    *boolean | 'warning' 将 lint 错误输出为编译警告，不会导致编译失败
    *'default' | 'error' 将 lint 错误输出为编译警告，导致编译失败
    * */
    lintOnSave: 'default',
    /* 默认为false,设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右 */
    runtimeCompiler: false,
    /* 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来 */
    transpileDependencies: [],
    /* 资源地图，默认为true,方便在调试时，快速定位编译前的代码,设置为 false 以加速生产环境构建 */
    productionSourceMap: false,
    /* 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响 */
    /* crossorigin:undefined, */
    /* 默认为false,在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
     需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
     另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次 */
    integrity: false,
    css: {
        /* 默认值：生产环境下是 true，开发环境下是 false 。
        * 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
        *提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。
        * 所以不需要配置这个属性
        * */
        /* extract: true */
        /* 默认为false, 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能 */
        sourceMap: false,
        // 这里的选项会传递给css-loader
        loaderOptions: {
            css: {}
            // 这里的选项会传递给postcss-loader
            /* postcss: {}, */
            // 给 less-loader 传递 Less.js 相关选项
            /* less: {
              globalVars: {
                primary: '#fff'
              }
            } */
        }
    },
    /* 默认值为require('os').cpus().length > 1， 是否为 Babel 或 TypeScript 使用 thread-loader。
    该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。默认配置已经是优化后的配置，所以这里一般不需要配置 */
    /* parallel: true, */
    /* PWA（Progressive Web Apps）虽然是网页应用，但是可以带来媲美原生的用户体验，其中包含离线可用，后台推送等功能 */
    pwa: {},
    /* 其值可以是对象，也可以是函数 */
    configureWebpack: {},
    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack:
        config => {
            // @ 默认指向 src 目录，这里要改成 examples
            // 另外也可以新增一个 ~ 指向 packages
            config.resolve.alias
                .set('@', path.resolve('examples'))
                .set('~', path.resolve('packages'))

            // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
            config.module
                .rule('js')
                .include.add(/packages/).end()
                .include.add(/examples/).end()
                .use('babel')
                .loader('babel-loader')
                .tap(options => {
                    // 修改它的选项...
                    return options
                })
        },

    devServer:
    {
        /* 让浏览器 overlay 同时显示警告和错误 */
        overlay: {
            warnings: true,
            errors: true
        },
        /* 开发时，构建完成后，首页是否在浏览器中打开 */
        open: true,
        host: '0.0.0.0',
        port: 8090,
        hotOnly: true
    }
}

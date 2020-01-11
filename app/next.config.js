const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

//console.log('current environment:', process.env.CURRENT_ENV)
//console.log('app:', process.env.npm_package_version)

module.exports = /*withBundleAnalyzer(*/withCSS(withImages({
    target: 'serverless',
    cssLoaderOptions: {
        url: false
    },
    webpack: (config, { isServer }) => {

        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }

        return config;
    }
}))

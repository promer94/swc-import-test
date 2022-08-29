const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { ModuleFederationPlugin } = require("webpack").container

const shared = {
  vue: {
    import: "vue/dist/vue.runtime.esm.js",
    singleton: true,
  },
  "vue-demi": {},
  "@vue/composition-api": {
    import: "@vue/composition-api/dist/vue-composition-api.mjs",
    singleton: true,
  },
  "element-ui": {},
  "@formily/core": {},
  "@formily/element": {},
  "@formily/reactive-vue": {},
  "@formily/vue": {},
}

const swcLoader = {
  test: /\.m?js$/,
  exclude: /(node_modules)/,
  use: {
    loader: "swc-loader",
    options: {
      jsc: {
        parser: {
          syntax: "typescript",
          decorators: true,
        },
        transform: {
          legacyDecorator: true,
        },
        loose: true,
        externalHelpers: true,
        experimental: {
          plugins: [
            [
              require.resolve("@swc/plugin-transform-imports"),
              {
                "element-ui": {
                  transform: "element-ui/lib/{{ kebabCase member }}",
                },
                "@formily/element": {
                  transform: "@formily/element/esm/{{ kebabCase member }}",
                },
              },
            ],
          ],
        },
      },
      env: {
        mode: "usage",
        coreJs: "3.25",
        loose: true,
      },
      minify: false,
    },
  },
}

module.exports = (env = {}) => ({
  mode: "development",
  cache: true,
  target: "web",
  devtool: false,
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    publicPath: "/",
  },
  resolve: {
    extensions: [".vue", ".jsx", ".js", ".json", ".mjs"],
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      // vue: "@vue/runtime-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      swcLoader,
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "the-runtime",
      library: { type: "var", name: "o2_mkt" },
      filename: "remoteEntry.js",
      shared,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 5001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
})

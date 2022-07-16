const { defineConfig } = require("@vue/cli-service")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "vue-demi",
        library: { type: "var", name: "a" },
        filename: "remoteEntry.js",
        exposes: {
          HelloWorld: "./src/components/HelloWorld.vue",
        },
        shared: {
          vue: { singleton: true },
          "vue-demi": {
            singleton: true,
          },
          "@vue/composition-api": {
            singleton: true,
          },
        },
      }),
    ],
  },
})

export default {
  base: "/ihabit/",
  publicPath: "/ihabit/",
  sass: {},
  alias: {
    moment: "dayjs"
  },
  disableCSSModules: true,
  chainWebpack(config, { webpack }) {
    // code split @ant-design/icons
    config.module
      .rule("@ant-design/icons")
      .include.add(require.resolve("@ant-design/icons/lib/dist"))
      .end()
      .use("ant-icon")
      .loader("webpack-ant-icon-loader");
  },
  plugins: [
    ["umi-plugin-gh-pages"],
    [
      "umi-plugin-react",
      {
        antd: true
      }
    ]
  ]
};

export default {
  base: '/ihabit/',
  publicPath: '/ihabit/',
  sass: {},
  disableCSSModules: true,
  plugins: [
    ['umi-plugin-gh-pages'],
    ['umi-plugin-react',
      {
        antd: true
      }
    ]
  ],
}

module.exports = {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          950: '#07beff'
          // 950: '#2F89FC'
        }
      }
    }
  },
  plugins: []
}

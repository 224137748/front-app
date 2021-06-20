module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    semi: [0, 'always'],
    quotes: [0],
    // 对象后面尾随都好
    'comma-dangle': [0],
    'no-spaced-func': 0
    // omitLastInOneLineBlock: true
  }
};

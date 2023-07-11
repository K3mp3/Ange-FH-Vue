require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
}

module.exports = {
  'extends': 'eslint-config-airbnb',
  'env': {
    'browser': true
  },
  'rules': {
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { 'aspects': ['invalidHref'] }],
    'comma-dangle': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'arrow-parens': 0,
    'import/extensions': 0,
    'no-unused-vars': 1,
    'no-new': 0
  },
  'plugins': [
    'react', 'import'
  ],
  'globals': {
    'web3': true
  }
};

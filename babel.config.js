module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      plugins: [
        [
          '@babel/plugin-transform-private-methods',
          {
            loose: true,
          },
        ],
      ],
    },
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': '.',
          '@root': './',
          '@src': './src',
          '@components': './src/common/components',
          '@helpers': './src/common/helpers',
          '@styles': './src/styles',
          '@assets': './src/assets',
          '@store': './src/store',
          '@navigation': './src/navigation',
          '@authFlow': './src/flow/authentication',
          '@onboardFlow': './src/flow/onboarded',
        },
      },
    ],
  ],
};

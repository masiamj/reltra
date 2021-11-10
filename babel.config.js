module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets',
            '@components': './components',
            '@hooks': './hooks',
            '@lib': './lib',
            '@navigation': './navigation',
            '@screens': './screens',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          allowList: ['GITHUB_PERSONAL_ACCESS_TOKEN'],
          allowUndefined: false,
          envName: 'development',
          moduleName: '@env',
          path: '.env',
          verbose: true,
        },
      ],
    ],
  }
}

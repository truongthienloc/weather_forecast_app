module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['.'],
                    extensions: ['.js', '.jsx', '.json', '.png', '.jpg'],
                    alias: {
                        '~': './src',
                        '@assets': './assets',
                    },
                },
            ],
            'nativewind/babel',
            [
                'module:react-native-dotenv',
                {
                    envName: 'APP_ENV',
                    moduleName: '@env',
                    path: '.env',
                },
            ],
        ],
    }
}

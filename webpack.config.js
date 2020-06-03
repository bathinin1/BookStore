module.exports = {
    entry: ['./app/main.js'],
    output: {
        filename: 'bundle.js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ]
    },
    devServer: {
        port: 3000,
        inline: true,
        mimeTypes: {
            typeMap: {
                'text/css': ['css'],
            },
            force: true,
        },
        open: true
    }
};
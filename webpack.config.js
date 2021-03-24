const path = require('path');

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

module.exports = {
    entry: './frontend/index.js',  // path to our input file
    output: {
    filename: 'index-bundle.js',  // output bundle file name
    path: path.resolve(__dirname, './static/build'),  // path to our Django static directory
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { 
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        [
                            require.resolve('babel-plugin-named-asset-import'),
                            {
                                loaderMap: {
                                    svg: {
                                        ReactComponent:
                                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                    },
                                },
                            },
                        ]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/,/\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: imageInlineSizeLimit,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ]
    }
};
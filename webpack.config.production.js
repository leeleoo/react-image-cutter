const webpack = require('webpack')

module.exports = {
	entry    : {
		'bundle': './src/react-image-cutter/index.js'
	},
	output   : {
		path         : "dist",
		library      : 'react-image-cutter',
		libraryTarget: 'umd',
		filename     : 'bundle.js'
	},
	externals: [
		{
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react',
			},
		},
		{
			'react-dom': {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom',
			},
		},
	],
	module   : {
		rules: [
			{
				test   : /\.(jsx|js)$/,
				use    : [
					{
						loader: 'babel-loader'
					}
				],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use : [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpg|png)$/,
				use : [
					'url-loader'
				]
			}
		]
	},
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: false,
			}
		}),
	]
};
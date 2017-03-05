var webpack = require('webpack')

module.exports = {
	entry : './src/index.js',
	output: {
		filename: '[name].js',
		path    : '/dist'
	},
	module: {
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
					'sass-loader?sourceMap'
				]
			},
			{
				test: /\.(jpg|png)$/,
				use : [
					'url-loader'
				]
			}
		]
	}
}
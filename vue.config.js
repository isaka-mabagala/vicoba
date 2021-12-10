/* vue.config.js */

module.exports = {
	chainWebpack: (config) => { // change app title
		config
			.plugin('html')
			.tap((args) => {
				args[0].title = 'VICOBA'
				return args
			})
	}
}
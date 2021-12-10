import Vue from 'vue'
import electron from 'electron'

Vue.directive('open-external',  {
	bind(el) {
		
		el.addEventListener('click', (e) => {
			e.preventDefault()
			let link = e.target.getAttribute('href')

			electron.shell.openExternal(link)
		})
	}
});

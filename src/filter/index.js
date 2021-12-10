import Vue from 'vue'
import '../assets/js/date.format.js'

function currency(value, decimals) { // currency format

	var decimal = decimals ? decimals : 0;
	var number = value == null ? 0 : value;
	//var number = value == null ? 0 : value.toFixed(decimal);

	if (decimal > 0) {
		return number.replace(/\d(?=(\d{3})+\.)/g, '$&,');
	}
	return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

Vue.filter('currency', function(value, decimal) {
	var amount = value == null ? 0 : value;
	return currency(amount, decimal);
});

Vue.filter('dateFormat', function(value, format) {
	let date = +value;
	let d = new Date(date);

	return d.format(format);
});

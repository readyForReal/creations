document.addEventListener('DOMContentLoaded', () => {

	'use strict';

	let slider = require('./parts/slider.js'),
		calc = require('./parts/calc.js'),
		modal = require('./parts/modal.js'),
		form = require('./parts/form.js'),
		tabs = require('./parts/tabs.js'),
		timer = require('./parts/timer.js');

	slider();
	calc();
	modal();
	form();
	tabs();
	timer();

})
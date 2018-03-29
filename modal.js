(function(gtris) {
	'use strict';

	if (!gtris) gtris = window.gtris = {};
	if (!gtris.ui) gtris.ui = window.gtris.ui = {};

	var modal = {
		modal_window: 'modal_window',

		open: function(obj) {
			this.modal_window = document.querySelector(obj.target);
			this.modal_window.style.display = 'block';

			var gtModalWrapper = document.createElement("div");
			gtModalWrapper.classList.add('gt-modal-wrap');
			document.body.appendChild(gtModalWrapper);

			gtModalWrapper.appendChild(this.modal_window);
		},
		close: function() {
			this.modal_window.querySelector('[data-modal="hide"]').addEventListener('click', this.closeModal, true);
		},
		closeModal: function(event) {
			closestByClass(event.target, 'gt-modal').remove();
			closestByClass(event.target, 'gt-modal').style.display = 'none';
		}
	};

    gtris.ui.modal = modal;

})(window.gtris);


function $(selector, context) {
	return (context || document).querySelectorAll(selector);
}

function $1(selector, context) {
    return (context || document).querySelector(selector);
}

function closestByClass(el, clazz) {
	while (el.className != clazz) {
		el = el.parentNode;
		if (!el) return null;
	}
	return el;
}
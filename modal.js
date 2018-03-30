(function(gtris) {
	'use strict';

	if (!gtris) gtris = window.gtris = {};
	if (!gtris.ui) gtris.ui = window.gtris.ui = {};

	var modal = {

		ESC_KEY_CLICK: 'esc_key_click',
		CLOSE_BUTTON_CLICK: 'close_button_click',
		clonedModal: 'cloned_modal',

		open: function(obj) {

			let self = this;

			//append gt-modal-wrap
			let modalWrap = document.createElement("div");
			modalWrap.classList.add('gt-modal-wrap');
			document.body.appendChild(modalWrap);

			if(document.querySelector(obj.target)) {
				let modalWindow = document.querySelector(obj.target);
				modalWrap.appendChild(modalWindow);
				modalWindow.style.display = 'block';
				modalWrap.querySelector('[data-modal="hide"]').addEventListener('click', this.handleUpdate, false);

				//modalWrap.querySelector('[data-modal="hide"]').addEventListener('click', this.handleUpdate(modalWrap), true);

				// modalWrap.querySelector('[data-modal="hide"]').addEventListener('click', function() {
				// 	self.handleUpdate(modalWrap, self.CLOSE_BUTTON_CLICK);
				// }, false);
				this.clonedModal = modalWindow.cloneNode(true);
			}else{
				modalWrap.appendChild(this.clonedModal);
				modalWrap.querySelector('.gt-modal').style.display = 'block';
				modalWrap.querySelector('[data-modal="hide"]').addEventListener('click', this.handleUpdate, false);
				// modalWrap.querySelector('[data-modal="hide"]').addEventListener('click', function() {
				// 	self.handleUpdate(modalWrap, self.CLOSE_BUTTON_CLICK);
				// }, false);
			}
		},
		handleUpdate: function(event) {
			let modalWrap = closestByClass(event.target, 'gt-modal-wrap');
			if(Element.prototype.remove) {
				modalWrap.remove();
			}else{
				modalWrap.parentNode.removeChild(modalWrap);
			}
			console.log(1111);
		},
		close: function(event) {
			console.log(event);
			// let modalWrap = closestByClass(event.target, 'gt-modal-wrap');
			// if(Element.prototype.remove) {
			// 	modalWrap.remove();
			// }else{
			// 	modalWrap.parentNode.removeChild(modalWrap);
			// }
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
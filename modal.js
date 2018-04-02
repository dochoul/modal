(function(gtris) {
  'use strict';

  if (!gtris) gtris = window.gtris = {};
  if (!gtris.ui) gtris.ui = window.gtris.ui = {};

  var modal = {

    ESC_KEY_CLICK: 'esc_key_click',
    CLOSE_BUTTON_CLICK: 'close_button_click',
    modalWrap: 'gt-modal-wrap',
    clonedModal: 'cloned_modal',

    open: function(obj) {

      let modalWindow;

      //모달 윈도우를 래핑하는 디비전을 만들고 문서의 가장 하단에 append 한다.
      this.modalWrap = document.createElement("div");
      this.modalWrap.classList.add('gt-modal-wrap');
      document.body.appendChild(this.modalWrap);

      //문서에서 모달 윈도우를 가져온다.
      modalWindow = document.querySelector(obj.target);

      if(modalWindow) {
        this.modalWrap.appendChild(modalWindow);
        modalWindow.style.display = 'block';
        modalWindow.querySelector('[data-modal="hide"]').addEventListener('click', this.close, false);
        this.clonedModal = modalWindow.cloneNode(true);
      }else{
        this.modalWrap.appendChild(this.clonedModal);
        this.clonedModal.style.display = 'block';
        this.clonedModal.querySelector('[data-modal="hide"]').addEventListener('click', this.close, false);
      }
    },
    close: function(event) {
      if(Element.prototype.remove) {
        modal.modalWrap.remove();
      }else{
        modal.modalWrap.parentNode.removeChild(modalWrap);
      }
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
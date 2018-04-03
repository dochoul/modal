(function(gtris) {
  'use strict';

  if (!gtris) gtris = window.gtris = {};
  if (!gtris.ui) gtris.ui = window.gtris.ui = {};

  var modal = {

    clonedModal: 'cloned-modal',

    open: function(obj) {
      //ajax or ajax not, there is no try...
      switch(obj.target.charAt(0)) {
        case '#':
          this.notAjax(obj);
          break;
        case '.':
          console.error('gtris(v1.2.0): Target accept only ID or URL.');
          break;
        default:
          this.ajax(obj);
          break;
      }
    },
    ajax: function(obj) {
      var self = this;

      getAjax(obj.target, function(response) {

        var modalWrap = self.createDiv('gt-modal-wrap');
        var parser = new DOMParser();
        var paeseHTML = parser.parseFromString(response, "text/html");

        document.body.appendChild( modalWrap );
        paeseHTML.querySelector('.gt-modal').style.display = 'block';
        modalWrap.appendChild( paeseHTML.querySelector('.gt-modal') );

        modalWrap.querySelector('[data-modal="hide"]').addEventListener('click', function() {
          self.close(obj);
        });

        //completed event return
        if(obj.completed) return obj.completed();
      });
    },
    notAjax: function(obj) {
      var modalWrap = this.createDiv('gt-modal-wrap');
      var modalWindow = document.querySelector(obj.target);

      //모달 윈도우를 래핑하는 디비전을 문서의 가장 하단에 append 한다.
      document.body.appendChild(modalWrap);

      if(modalWindow) {
        modalWrap.appendChild(modalWindow);
        modalWindow.style.display = 'block';
        modalWindow.querySelector('[data-modal="hide"]').addEventListener('click', this.close, false);
        this.clonedModal = modalWindow.cloneNode(true);
      }else{
        modalWrap.appendChild(this.clonedModal);
        this.clonedModal.querySelector('[data-modal="hide"]').addEventListener('click', this.close, false);
      }
    },
    close: function(obj) {
      var modalWrap = document.querySelector('.gt-modal-wrap');
      document.body.removeChild(modalWrap);
      if(obj.closed) return obj.closed();
    },
    createDiv: function(className) {
      var div = document.createElement('div');
      div.className = className;
      return div;
    }
  };

  gtris.ui.modal = modal;

})(window.gtris);



function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

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
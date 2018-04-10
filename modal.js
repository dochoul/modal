(function(gtris) {
  'use strict';

  if (!gtris) gtris = window.gtris = {};
  if (!gtris.ui) gtris.ui = window.gtris.ui = {};

  var modal = {

    isAjax: false,
    clonedModal: 'cloned-modal',

    open: function(obj) {
      //ajax or ajax not, there is no try...
      switch(obj.target.charAt(0)) {
        case '#':
          this.isAjax = false;
          this.notAjax(obj);
          break;
        case '.':
          this.isAjax = false;
          this.notAjax(obj);
          console.error('gtris(v1.2.0): Target accept only ID or URL.');
          break;
        default:
          this.isAjax = true;
          this.ajax(obj);
          break;
      }
    },
    ajax: function(obj) {
      var self = this;
      getAjax(obj.target, function(response) {
        var parseHTML = new DOMParser().parseFromString(response, 'text/html');
        self.showModal(parseHTML, obj);
      });
    },
    notAjax: function(obj) {
      var modalWindow = document.querySelector(obj.target);
      if(modalWindow) {
        this.clonedModal = modalWindow.cloneNode(true);
        this.showModal(modalWindow, obj);
      }else{
        this.showModal(this.clonedModal, obj);
      }
    },
    showModal: function(modalWindow, obj) {
      var self = this;
      if(this.isAjax) {
        modalWindow = modalWindow.querySelector('.gt-modal');
      }else{
        modalWindow = modalWindow;
      }
      var modalWrap = this.createDiv('gt-modal-wrap');
      document.body.appendChild( modalWrap );
      modalWindow.style.display = 'block';
      modalWrap.appendChild( modalWindow );
      modalWrap.querySelector('[data-modal="hide"]').addEventListener('click', function() {
        self.close(obj);
      });

      //completed event return
      if(obj.completed) return obj.completed();
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



function DOMParser(text) {
  var DOMParser_proto = DOMParser.prototype;
  var real_parseFromString = DOMParser_proto.parseFromString;

  // Firefox/Opera/IE throw errors on unsupported types
  try {
    // WebKit returns null on unsupported types
    if ((new DOMParser).parseFromString("", "text/html")) {
      // text/html parsing is natively supported
      return;
    }
  } catch (ex) {}

  DOMParser_proto.parseFromString = function(markup, type) {
    if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
      var doc = document.implementation.createHTMLDocument("");
            if (markup.toLowerCase().indexOf('<!doctype') > -1) {
              doc.documentElement.innerHTML = markup;
            }
            else {
              doc.body.innerHTML = markup;
            }
      return doc;
    } else {
      return real_parseFromString.apply(this, arguments);
    }
  };
}


function getAjax(url, success) {
  var xhr;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest(); //for modern browsers
  }else{
    xhr = new ActiveXObject("Microsoft.XMLHTTP"); //for old IE browsers
  }
  xhr.open('GET', url);
  xhr.onreadystatechange = function() { //status 200: 성공
    if (xhr.readyState > 3 && xhr.status === 200) success(xhr.responseText); //반환된 텍스트
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
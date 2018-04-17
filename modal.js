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
        self.showModal(obj, parseHTML);
      });
    },
    notAjax: function(obj) {
      var modalWindow = document.querySelector(obj.target);
      if(modalWindow) {
        this.clonedModal = modalWindow.cloneNode(true);
        this.showModal(obj, modalWindow);
      }else{
        this.showModal(obj, this.clonedModal);
      }
    },
    showModal: function(obj, modalWindow) {
      var self = this;
      var _modal;
      var modalWrap;
      if(this.isAjax) {
        _modal = modalWindow.querySelector('.gt-modal');
      }else{
        _modal = modalWindow;
      }
      modalWrap = this.createDiv('gt-modal-wrap');
      document.body.appendChild( modalWrap );
      _modal.style.display = 'block';
      modalWrap.appendChild( _modal );

      // modalWrap.addEventListener('click', function(e) {
      //   console.log(modalWindow.querySelector('[data-modal="hide"]'));
      // });

      modalWrap.querySelector('[data-modal="hide"]').onclick = function(event) {
        self.close(obj);
      };

      //completed event return
      if(obj.completed && this.isAjax) return obj.completed();
    },
    close: function(obj) {
      var modalWrap = document.querySelector('.gt-modal-wrap');
      document.body.removeChild(modalWrap);
      if(obj.closed && this.isAjax) return obj.closed();
    },
    createDiv: function(className) {
      var div = document.createElement('div');
      div.className = className;
      return div;
    }
  };

  gtris.ui.modal = modal;

})(window.gtris);



function addListenerWithArgs(elem, evt, func, vars){
    var f = function(ff, vv){
            return (function (){
                ff(vv);
            });
    }(func, vars);

    elem.addEventListener(evt, f);

    return f;
}


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
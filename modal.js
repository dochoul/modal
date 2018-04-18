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
      //specifies whether all descendants of the node should be cloned, default:false
      if(modalWindow) this.clonedModal = modalWindow.cloneNode(true);
      this.showModal(obj, this.clonedModal);
    },
    showModal: function(obj, modalWindow) {
      var self = this;
      var modal_container = this.createDiv('gt-modal-wrap');
      var modal_window;

      if(this.isAjax) {
        modal_window = modalWindow.querySelector('.gt-modal');
      }else{
        modal_window = modalWindow;
      }

      //모달 컨텐츠 display 속성을 block으로 변경
      modal_window.style.display = 'block';

      //모달 컨테이너와 모달 컨텐츠를 차례로 붙인다.
      document.body.appendChild( modal_container );
      modal_container.appendChild( modal_window );

      modal_window.querySelector('[data-modal="hide"]').addEventListener('click', function(event) {
        self.close(obj);
      });

      document.addEventListener('keyup', function(event) {
        if(event.keyCode === 27) self.close(obj);
      }, {once:true});

      //completed event return
      if(obj.completed) return obj.completed();
    },
    close: function(event, obj) {
      var modalWrap = document.querySelector('.gt-modal-wrap');
      if(modalWrap) {
        document.body.removeChild(modalWrap);
        if(obj && obj.closed) return obj.closed(); //return closed event
      }
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
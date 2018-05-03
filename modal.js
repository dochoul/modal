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
      $.ajax({
        context: this,
        type: 'GET',
        dataType: 'html',
        url: obj.target,
        error : function(xhr, status, error) {
          //console.log(xhr, status, error);
        },
        success: function(response) {
          var html = document.createElement('div');
          html.innerHTML = response;
          this.showModal(obj, html.querySelector('.gt-modal'));
        },
        complete: function() {
        }
      });
    },
    notAjax: function(obj) {
      var modalWindow = document.querySelector(obj.target);
      if(modalWindow) this.clonedModal = modalWindow.cloneNode(true); //닫기 버튼을 클릭하면 모달 윈도우는 DOM에서 삭제된다. 깊은 복사로 모달 윈도우를 클론해두자!!!
      this.showModal(obj, this.clonedModal);
    },
    showModal: function(obj, clonedModal) {
      var modal_container = document.createElement('div');
      modal_container.className = 'gt-modal-wrap';
      var modal_window = clonedModal;
      var close_button = modal_window.querySelector('[data-modal="hide"]');

      //모달 컨텐츠 display 속성을 block으로 변경
      modal_window.style.display = 'block';

      //모달 컨테이너와 모달 컨텐츠를 차례로 붙인다.
      document.body.appendChild( modal_container );
      modal_container.appendChild( modal_window );

      //모달 닫기 버튼 클릭
      close_button.addEventListener('click', function(event) {
        this.close(obj);
      }.bind(this));

      //esckey press close modal
      document.addEventListener('keydown', function(event) {
        if(event.keyCode === 27) this.close(obj);
      }.bind(this));

      //completed event return
      if(obj.completed) return obj.completed();
    },
    close: function(obj) {
      var modalWrap = document.querySelector('.gt-modal-wrap');
      if(modalWrap) {
        document.body.removeChild(modalWrap);
        if(obj && obj.closed) return obj.closed(); //return closed event
      }
    }
  };

  gtris.ui.modal = modal;

})(window.gtris);


// ajax2: function(obj) {
//   var self = this;
//   getAjax(obj.target, function(response) {
//     var parser = new DOMParser()
//     var html = parser.parseFromString(response, 'text/html'); //The DOMParser interface provides the ability to parse XML or HTML source code from a string into a DOM Document.
//     self.showModal(obj, html.querySelector('.gt-modal'));
//   });
// },

// // ajax
// function getAjax(url, success) {
//   var xhr;
//   if(window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest(); //for modern browsers
//   }else{
//     xhr = new ActiveXObject("Microsoft.XMLHTTP"); //for old IE browsers
//   }
//   xhr.open('GET', url);
//   xhr.onreadystatechange = function() { //status 200: 성공
//     if (xhr.readyState > 3 && xhr.status === 200) success(xhr.responseText); //반환된 텍스트
//   };
//   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//   xhr.send();
//   return xhr;
// }

// // for IE9, DOMParser...
// function DOMParser(text) {
//   var DOMParser_proto = DOMParser.prototype;
//   var real_parseFromString = DOMParser_proto.parseFromString;

//   // Firefox/Opera/IE throw errors on unsupported types
//   try {
//     // WebKit returns null on unsupported types
//     if ((new DOMParser).parseFromString("", "text/html")) {
//       // text/html parsing is natively supported
//       return;
//     }
//   } catch (ex) {}

//   DOMParser_proto.parseFromString = function(markup, type) {
//     if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
//       var doc = document.implementation.createHTMLDocument("");
//             if (markup.toLowerCase().indexOf('<!doctype') > -1) {
//               doc.documentElement.innerHTML = markup;
//             }
//             else {
//               doc.body.innerHTML = markup;
//             }
//       return doc;
//     } else {
//       return real_parseFromString.apply(this, arguments);
//     }
//   };
// }
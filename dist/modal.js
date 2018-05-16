"use strict";
// Modal.ts
var Modal = /** @class */ (function () {
    function Modal(obj) {
        this.obj = obj;
    }
    Modal.prototype.open = function () {
        var _this = this;
        var modal_window;
        switch (this.obj.target.charAt(0)) {
            case '#':
                modal_window = document.querySelector(this.obj.target).cloneNode(true);
                this.showModal(modal_window);
                break;
            case '.':
                break;
            default:
                this.getAjax(this.obj.target, function (response) {
                    var div = document.createElement('div');
                    div.innerHTML = response;
                    modal_window = div.querySelector('.gt-modal');
                    _this.showModal(modal_window);
                });
                break;
        }
    };
    Modal.prototype.showModal = function (modal_window) {
        var _this = this;
        var body = document.body;
        var modal_container = document.createElement('div');
        var modal_close;
        //모달 컨테이너 클래스 추가
        modal_container.className = 'gt-modal-wrap';
        //모달 윈도우 display 속성을 block으로 변경
        modal_window.style.display = 'block';
        //모달 컨테이너와 모달 윈도우를 차례로 붙인다.
        body.appendChild(modal_container);
        modal_container.appendChild(modal_window);
        //모달 닫기
        modal_close = modal_window.querySelector('[data-modal="hide"]');
        modal_close.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            _this.close();
        });
        // document.addEventListener('keydown', (event:Event) => {
        //   event.preventDefault();
        //   this.close();
        // }, {once: true});
        var self = this;
        // Create a named function as your event handler
        var myFunction = function (event) {
            if (event.keyCode === 27) {
                self.close();
                removeEventListener("keydown", myFunction);
            }
        };
        addEventListener("keydown", myFunction);
    };
    Modal.prototype.close = function () {
        var modal_wrap = document.querySelector('.gt-modal-wrap');
        if (modal_wrap) {
            document.body.removeChild(modal_wrap);
            if (this.obj.closed)
                return this.obj.closed(); //return closed event
        }
    };
    Modal.prototype.getAjax = function (url, success) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest(); //for modern browsers
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP"); //for old IE browsers
        }
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status === 200)
                success(xhr.responseText); //반환된 텍스트
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    };
    return Modal;
}());

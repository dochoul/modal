"use strict";
// Modal.ts
var Modal = /** @class */ (function () {
    function Modal(obj) {
        this.obj = obj;
    }
    Modal.prototype.open = function () {
        var _this = this;
        var modal_window;
        //ajax or ajax not, there is no try...
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
        modal_close.addEventListener("click", this.close.bind(this), false);
        // modal_close.addEventListener("click", (event:Event) => {
        //   event.preventDefault();
        //   event.stopPropagation();
        //   event.stopImmediatePropagation();
        //   this.close();
        // });
        //Esc 키를 클릭하면 모달을 닫는다.
        var self = this;
        function escKeyDown(event) {
            if (event.keyCode === 27) {
                self.close();
                document.removeEventListener("keydown", escKeyDown);
            }
        }
        document.addEventListener("keydown", escKeyDown);
        // let self = this;
        // document.onkeydown = function(event:KeyboardEvent) {
        //   if(event.keyCode === 27) {
        //     self.close();
        //   }
        // };
        // document.addEventListener("keydown", function(event:KeyboardEvent) {
        //   console.log('esc')
        //   if(event.keyCode === 27) this.close.bind(this);
        // }, {once:true});
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

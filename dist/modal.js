"use strict";
// Modal.ts
var Modal = /** @class */ (function () {
    function Modal(obj) {
        this.obj = obj;
        switch (obj.target.charAt(0)) {
            case '#':
                this.notAjax();
                break;
            case '.':
                this.notAjax();
                break;
            default:
                this.ajax();
                break;
        }
    }
    Modal.prototype.notAjax = function () {
        var modalWindow = document.querySelector(this.obj.target);
        this.showModal(modalWindow.cloneNode(true)); //닫기 버튼을 클릭하면 모달 윈도우는 DOM에서 삭제된다. 깊은 복사로 모달 윈도우를 클론해두자!!!
    };
    Modal.prototype.ajax = function () {
    };
    Modal.prototype.showModal = function (clonedModal) {
        var modal_container = document.createElement('div');
        modal_container.className = 'gt-modal-wrap';
        var modal_window = clonedModal;
        var close_button;
        close_button = modal_window.querySelector('[data-modal="hide"]');
        //모달 컨텐츠 display 속성을 block으로 변경
        modal_window.style.display = 'block';
        //모달 컨테이너와 모달 컨텐츠를 차례로 붙인다.
        document.body.appendChild(modal_container);
        modal_container.appendChild(modal_window);
        close_button.addEventListener('click', this.close);
    };
    Modal.prototype.close = function () {
        var modalWrap = document.querySelector('.gt-modal-wrap');
        if (modalWrap) {
            document.body.removeChild(modalWrap);
            if (this.obj && this.obj.closed)
                return this.obj.closed(); //return closed event
        }
    };
    Modal.prototype.getAjax = function (url, success) {
        // var xhr:XMLHttpRequest;
        // if((<any>window).XMLHttpRequest) {
        //     xhr = new XMLHttpRequest(); //for modern browsers
        // }else{
        //     xhr = new ActiveXObject("Microsoft.XMLHTTP"); //for old IE browsers
        // }
        // xhr.open('GET', url);
        // xhr.onreadystatechange = function() { //status 200: 성공
        //     if (xhr.readyState > 3 && xhr.status === 200) success(xhr.responseText); //반환된 텍스트
        // };
        // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        // xhr.send();
        // return xhr;
    };
    return Modal;
}());

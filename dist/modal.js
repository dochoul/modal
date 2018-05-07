"use strict";
var Modal = /** @class */ (function () {
    function Modal(obj) {
        switch (obj.target.charAt(0)) {
            case '#':
                this.notAjax(obj);
                break;
            case '.':
                this.notAjax(obj);
                break;
            default:
                this.ajax(obj);
                break;
        }
    }
    Modal.prototype.notAjax = function (obj) {
    };
    Modal.prototype.ajax = function (obj) {
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

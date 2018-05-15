// Modal.ts

class Modal {

  private obj:any;
  
  constructor(obj:any) {

    this.obj = obj;

    switch(obj.target.charAt(0)) { //ajax or ajax not, there is no try...
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
  private notAjax() {
    let modalWindow = document.querySelector(this.obj.target);
    //this.showModal(modalWindow.cloneNode(true)); //닫기 버튼을 클릭하면 모달 윈도우는 DOM에서 삭제된다. 깊은 복사로 모달 윈도우를 클론해두자!!!
  }

  private ajax() {

  }

  private showModal(clonedModal:HTMLElement) {
    // var modal_container = document.createElement('div');
    // modal_container.className = 'gt-modal-wrap';
    // var modal_window = clonedModal;
    // var close_button;

    // close_button = modal_window.querySelector('[data-modal="hide"]');

    // //모달 컨텐츠 display 속성을 block으로 변경
    // modal_window.style.display = 'block';

    // //모달 컨테이너와 모달 컨텐츠를 차례로 붙인다.
    // document.body.appendChild( modal_container );
    // modal_container.appendChild( modal_window );

    // close_button.addEventListener('click', this.close); 
  }

  private open() {
    let self:any = this;
    let body:HTMLElement = document.body;
    let modal_clone:HTMLElement = document.querySelector(this.obj.target).cloneNode(true);
    let modal_container:HTMLElement = document.createElement('div');
    let modal_close:HTMLElement = <HTMLElement>modal_clone.querySelector('[data-modal="hide"]');

    //모달 컨테이너 클래스 추가
    modal_container.className = 'gt-modal-wrap';

    //모달 윈도우 display 속성을 block으로 변경
    modal_clone.style.display = 'block';

    //모달 컨테이너와 모달 윈도우를 차례로 붙인다.
    body.appendChild( modal_container );
    modal_container.appendChild( modal_clone );

    modal_close.addEventListener("click", () => {
      this.close();
    });


  }

  private close() {
    var modalWrap = document.querySelector('.gt-modal-wrap');
    if(modalWrap) {
      document.body.removeChild(modalWrap);
      if(this.obj.closed) return this.obj.closed(); //return closed event
    }
  }

  private getAjax(url:string, success:any) {
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
  }
}
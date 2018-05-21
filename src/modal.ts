// Modal.ts

namespace gtris {

  interface IModal {
    
  }

  interface IObjectSchema {
    target: string;
    completed: Function;
    closed: Function;
  }

  export class modal {

    private obj:IObjectSchema; 
    
    constructor(obj:IObjectSchema) {
      this.obj = obj;
    }

    private open() {
      let modal_window:HTMLElement;

      //ajax or ajax not, there is no try...
      switch(this.obj.target.charAt(0)) {
        case '#':
          modal_window = <HTMLElement>document.querySelector(this.obj.target);
          this.show(<HTMLElement>modal_window.cloneNode(true));
          break;
        case '.':
          break;
        default:
          this.getAjax(this.obj.target, (response:string) => {
            let div:HTMLElement = document.createElement('div');
            div.innerHTML = response;
            modal_window = <HTMLElement>div.querySelector('.gt-modal');
            this.show(modal_window);
          });
          break;
      }
    }
  
    private show(modal_window:HTMLElement) {
      let body:HTMLElement = document.body;
      let modal_wrap:HTMLElement = document.createElement('div');
      let modal_close:HTMLElement;
  
      //모달 컨테이너 클래스 추가
      modal_wrap.className = 'gt-modal-wrap';
  
      //모달 윈도우 display 속성을 block으로 변경
      modal_window.style.display = 'block';
  
      //모달 컨테이너와 모달 윈도우를 차례로 붙인다.
      body.appendChild( modal_wrap );
      modal_wrap.appendChild( modal_window );
      
      //모달 닫기
      modal_close = <HTMLElement>modal_window.querySelector('[data-modal="hide"]');
      modal_close.addEventListener("click", this.close.bind(this), false);

      //esckey press close modal
      document.onkeydown = (event:KeyboardEvent) => {
        if(event.keyCode === 27) this.close();
      }

      //return completed event
      if(this.obj.completed) return this.obj.completed();
    }
  
    private close() {
      let modal_wrap:HTMLElement = <HTMLElement>document.querySelector('.gt-modal-wrap');
      if(modal_wrap) {
        document.body.removeChild(modal_wrap);
        if(this.obj.closed) return this.obj.closed(); //return closed event
      }
    }
  
    private getAjax(url:string, success:Function) {
      let xhr:XMLHttpRequest;
      if((<any>window).XMLHttpRequest) {
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
  }
}
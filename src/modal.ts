// Modal.ts

namespace gtris {

  interface IModal {
    
  }

  interface IObjectSchema {
    target: string;
    completed: Function;
    closed: Function;
  }

  export class modal implements IModal {

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
          this.showModal(<HTMLElement>modal_window.cloneNode(true));
          break;
        case '.':
          break;
        default:
          this.getAjax(this.obj.target, (response:string) => {
            let div:HTMLElement = document.createElement('div');
            div.innerHTML = response;
            modal_window = <HTMLElement>div.querySelector('.gt-modal');
            this.showModal(modal_window);
          });
          break;
      }
    }
  
    private showModal(modal_window:HTMLElement) {
      let self = this;
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
      // modal_close.addEventListener("click", (event:Event) => {
      //   event.preventDefault();
      //   event.stopPropagation();
      //   event.stopImmediatePropagation();
      //   this.close();
      // });
  
      
      //Esc 키를 클릭하면 모달을 닫는다.
      // let self = this;
      // function escKeyDown(event:KeyboardEvent) {
      //   if(event.keyCode === 27) {
      //     self.close();
      //     document.removeEventListener("keydown", escKeyDown);
      //   }
      // }
      // document.addEventListener("keydown", escKeyDown);
  
      //esckey press close modal
      document.onkeydown = function(event:KeyboardEvent) {
        if(event.keyCode === 27) self.close();
      }
  
      
  
      /* once:true가 IE에서 안된다
      document.addEventListener('keydown', (event:KeyboardEvent) => {
        if(event.keyCode === 27) this.close();
      }, {once:true});
      */
  
      //this.one(document, 'keydown', this.temp, this);

      if(this.obj.completed) return this.obj.completed(); //return closed event

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
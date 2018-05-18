// Modal.ts

class Modal {

  private obj:any;
  
  constructor(obj:any) {
    this.obj = obj;
  }

  private open() {
    let modal_window:HTMLElement;
    //ajax or ajax not, there is no try...
    switch(this.obj.target.charAt(0)) {
      case '#':
        modal_window = document.querySelector(this.obj.target).cloneNode(true);
        this.showModal(modal_window);
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
    let body:HTMLElement = document.body;
    let modal_container:HTMLElement = document.createElement('div');
    let modal_close:HTMLElement;

    //모달 컨테이너 클래스 추가
    modal_container.className = 'gt-modal-wrap';

    //모달 윈도우 display 속성을 block으로 변경
    modal_window.style.display = 'block';

    //모달 컨테이너와 모달 윈도우를 차례로 붙인다.
    body.appendChild( modal_container );
    modal_container.appendChild( modal_window );
    
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

    /* once:true가 IE에서 안된다
    document.addEventListener('keydown', (event:KeyboardEvent) => {
      if(event.keyCode === 27) this.close();
    }, {once:true});
    */

    this.one(document, 'keydown', this.temp, this);

  }

  private temp() {
    console.log(this.obj);
  }

  private one(element:any,eventType:any,callback:any,self:any) {
    var one=function(event:any) {
        try{
            callback.call(self,event);
        } finally {
            element.removeEventListener(eventType,one);
        }
    }
    element.addEventListener(eventType,one);
}

  private close() {
    console.log(this.obj)
    let modal_wrap:HTMLElement = <HTMLElement>document.querySelector('.gt-modal-wrap');
    if(modal_wrap) {
      document.body.removeChild(modal_wrap);
      if(this.obj.closed) return this.obj.closed(); //return closed event
    }
  }

  private getAjax(url:string, success:Function) {
    var xhr:XMLHttpRequest;
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

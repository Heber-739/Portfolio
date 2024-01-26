"use strict";(self.webpackChunkportafolio=self.webpackChunkportafolio||[]).push([[730],{8730:(Z,s,c)=>{c.r(s),c.d(s,{HangedModule:()=>k});var n=c(2382);let l=(()=>{class t{constructor(o){t.ctx=o}static render(){t.ctx.lineWidth=3,t.ctx.lineCap="round",t.ctx.lineJoin="round",t.ctx.strokeStyle="#000",t.ctx.beginPath(),t.ctx.fillStyle="black",t.ctx.moveTo(30,180),t.ctx.lineTo(60,150),t.ctx.lineTo(90,180),t.ctx.lineTo(30,180),t.ctx.fill()}static getWord(){let o=Math.floor(Math.random()*t.words.length),r=t.words[o].toUpperCase();t.letterSpace(r),t.word=r}static addPalabra(o){t.words.push(o)}static wordRegister(){let o=80;t.ctx.beginPath(),t.ctx.textAlign="left",t.ctx.fillStyle="green",t.ctx.font="16px montserrat",t.ctx.fillText("Aciertos:",5,240),t.hitsLetters.forEach(r=>{t.ctx.fillText(r,o,240),o+=20}),o=80,t.ctx.fillStyle="red",t.ctx.fillText("Errores: ",5,270),t.wrongLetters.forEach(r=>{t.ctx.fillText(r,o,270),o+=20}),t.ctx.closePath()}static letterSpace(o){let r=10,i=40/o.length,p=(280-o.length*i)/o.length;for(let u=0;u<o.length;u++)t.ctx.beginPath(),t.ctx.moveTo(r,380),t.ctx.lineTo(r+p,380),t.ctx.stroke(),t.ctx.closePath(),r+=p+i}static evaluateLetter(o){if(t.end)if(t.ctx.clearRect(0,182,320,100),t.inputLetters.includes(o))t.repeatedLetter();else if(t.inputLetters.push(o),t.word.includes(o)){t.hitsLetters.push(o);let i=10,p=40/t.word.length;t.ctx.textAlign="center";let u=(280-t.word.length*p)/t.word.length;for(var r=0;r<t.word.length;r++)o==t.word[r]&&(t.ctx.beginPath(),t.ctx.fillStyle="black",t.ctx.font=`bold ${6*p}px montserrat`,t.ctx.fillText(o,i+u/2,377),t.ctx.closePath(),t.hits++,t.hits==t.word.length&&t.endGame("gano")),i+=u+p}else t.wrongLetters.push(o),t.drawError();t.wordRegister()}static repeatedLetter(){t.ctx.beginPath(),t.ctx.font="bold 20px montserrat",t.ctx.fillStyle="red",t.ctx.textAlign="left",t.ctx.fillText("La letra ya fue ingresada",15,210),t.ctx.closePath()}static drawError(){switch(t.errors++,t.ctx.beginPath(),t.errors){case 1:t.ctx.moveTo(60,150),t.ctx.lineTo(60,10);break;case 2:t.ctx.moveTo(60,10),t.ctx.lineTo(180,10);break;case 3:t.ctx.moveTo(180,10),t.ctx.lineTo(180,25);break;case 4:t.ctx.moveTo(180,10),t.ctx.arc(180,40,15,300,6.28,!0);break;case 5:t.ctx.moveTo(180,55),t.ctx.lineTo(180,120);break;case 6:t.ctx.moveTo(180,120),t.ctx.lineTo(155,160);break;case 7:t.ctx.moveTo(180,120),t.ctx.lineTo(205,160);break;case 8:t.ctx.moveTo(180,70),t.ctx.lineTo(210,100);break;case 9:t.ctx.moveTo(180,70),t.ctx.lineTo(150,100),t.endGame("perdio")}t.ctx.stroke(),t.ctx.closePath()}static endGame(o){t.ctx.beginPath(),t.ctx.textAlign="center",t.ctx.font="bold 23px montserrat","gano"==o?(t.ctx.fillStyle="green",t.ctx.fillText("Felicidades por Ganar!",150,310)):(t.ctx.fillStyle="red",t.ctx.fillText("Usted Perdi\xf3",160,320),t.ctx.clearRect(0,320,320,400),t.ctx.fillText("La Palabra era:",160,350),t.ctx.font="bold 30px montserrat",t.ctx.fillText(t.word,160,395)),t.ctx.closePath(),t.end=!1}static reset(){t.hits=0,t.errors=0,t.inputLetters=[],t.hitsLetters=[],t.wrongLetters=[],t.word="",t.end=!0}}return t.words=["usted","chico","muchachos","gusto","anoche","quedarse","nervioso","sentado","primo","evidencia","vivero","andando","mentiroso","conciencia","posibilidades","contado","armario","rastro","casco","consecuencias","buscado","torneo"],t.word="",t.hits=0,t.errors=0,t.inputLetters=[],t.hitsLetters=[],t.wrongLetters=[],t.end=!0,t})();var e=c(1223),g=c(4318),f=c(9808),x=c(3827);const m=["canvasRef"];function h(t,d){1&t&&(e.TgZ(0,"small"),e._uU(1," Texto invalido"),e.qZA())}function a(t,d){if(1&t){const o=e.EpF();e.TgZ(0,"form",13)(1,"div",14)(2,"input",15),e.NdJ("focus",function(){return e.CHM(o),e.MAs(4).classList.add("active")}),e.qZA(),e.TgZ(3,"label",16,17),e._uU(6,"Nueva palabra"),e.qZA(),e.YNc(7,h,2,0,"small",18),e.qZA(),e.TgZ(8,"button",10),e.NdJ("click",function(){return e.CHM(o),e.oxw().addWord()}),e._uU(9," AGREGAR "),e.qZA(),e.TgZ(10,"button",11),e.NdJ("click",function(){return e.CHM(o),e.oxw().start()}),e._uU(11,"INICIAR"),e.qZA()()}if(2&t){const o=e.oxw();e.xp6(2),e.Q6J("formControl",o.inputControl),e.xp6(5),e.Q6J("ngIf",o.inputControl.invalid&&o.inputControl.dirty),e.xp6(1),e.Q6J("disabled",o.inputControl.invalid||o.inputControl.pristine)}}const b=function(t){return{display:t}};let T=(()=>{class t{constructor(o){this.popup=o,this.canvasRef={},this.inputControl=new n.NI("",[n.kI.required,n.kI.pattern(/^[a-zA-Z]+$/)]),this.inputTwoControl=new n.NI("",[n.kI.required,n.kI.pattern(/[A-Za-z]/),n.kI.maxLength(1)]),this.visibility=!0}ngAfterViewInit(){null!=this.canvasRef.nativeElement.getContext("2d")&&new l(this.canvasRef.nativeElement.getContext("2d")),l.render()}addWord(){this.popup.showMessage("Palabra agregada"),l.addPalabra(this.inputControl.value)}start(){this.visibility=!1,l.getWord(),this.inputControl.setValue("")}try(){l.evaluateLetter(this.inputTwoControl.value.toUpperCase()),this.inputTwoControl.reset()}reload(){this.canvasRef.nativeElement.clearRect(0,0,320,400),l.render(),this.visibility=!0,this.inputControl.setValue(""),l.reset()}moreInfo(){this.popup.showMessage("Opcionalmente puede agregar una nueva palabra al juego, evite los numeros o caracteres especiales.")}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(g.Z))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-hanged"]],viewQuery:function(o,r){if(1&o&&e.Gf(m,5),2&o){let i;e.iGM(i=e.CRH())&&(r.canvasRef=i.first)}},decls:21,vars:6,consts:[[1,"body"],[1,"title"],[1,"text"],[1,"moreInfo",3,"click"],["class","form",4,"ngIf"],[1,"section2",3,"ngStyle"],["width","300","height","400",1,"hanged"],["canvasRef",""],[1,"box","input_box"],["type","text","placeholder","Letras",1,"input","input_text",3,"formControl"],["type","button",1,"btn",3,"disabled","click"],["type","button",1,"btn",3,"click"],["routerLink","/proyectos",1,"btn","button"],[1,"form"],[1,"input_container"],["id","wordHanged","type","text","placeholder","Escriba una nueva palabra","autocomplete","off",1,"input_text",3,"formControl","focus"],["for","wordHanged",1,"label"],["LabelwordHanged","","LabelName",""],[4,"ngIf"]],template:function(o,r){1&o&&(e.TgZ(0,"main",0)(1,"header")(2,"h2",1),e._uU(3,"Ahorcado"),e.qZA(),e.TgZ(4,"p",2),e._uU(5,"No se admiten n\xfameros ni caracteres especiales"),e.qZA(),e.TgZ(6,"p",3),e.NdJ("click",function(){return r.moreInfo()}),e._uU(7,"i"),e.qZA()(),e.YNc(8,a,12,3,"form",4),e.TgZ(9,"section",5)(10,"div"),e._UZ(11,"canvas",6,7),e.qZA(),e.TgZ(13,"div",8),e._UZ(14,"input",9),e.TgZ(15,"button",10),e.NdJ("click",function(){return r.try()}),e._uU(16," Probar "),e.qZA(),e.TgZ(17,"button",11),e.NdJ("click",function(){return r.reload()}),e._uU(18,"Reset"),e.qZA()()(),e.TgZ(19,"button",12),e._uU(20,"Volver"),e.qZA()()),2&o&&(e.xp6(8),e.Q6J("ngIf",r.visibility),e.xp6(1),e.Q6J("ngStyle",e.VKq(4,b,!1===r.visibility?"flex":"none")),e.xp6(5),e.Q6J("formControl",r.inputTwoControl),e.xp6(1),e.Q6J("disabled",r.inputTwoControl.invalid))},directives:[f.O5,n._Y,n.JL,n.Fj,n.JJ,n.oH,f.PC,x.rH],styles:[".text[_ngcontent-%COMP%]{width:60vw;margin:0 auto 40px}.form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row;justify-content:center;width:clamp(250px,75vw,500px);margin:30px auto 0}.input_container[_ngcontent-%COMP%]{margin-bottom:20px}.input[_ngcontent-%COMP%]{width:100px;text-align:center}.input[_ngcontent-%COMP%]::placeholder{opacity:1}.input_box[_ngcontent-%COMP%]{flex-direction:row;margin:10px auto;width:-moz-fit-content;width:fit-content;padding:10px 20px}.btn[_ngcontent-%COMP%]{padding:10px 15px;margin:5px 10px 0 5px}.button[_ngcontent-%COMP%]{margin-top:30px}.section2[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;margin:20px auto 0;width:98vw}.hanged[_ngcontent-%COMP%]{border:5px solid var(--color5);padding:0;border-radius:20px;background:linear-gradient(-45deg,#dbfaf1,#b1f7e2)}"]}),t})();var w=c(1075);const y=[{path:"",component:T}];let k=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[x.Bz.forChild(y),w.m],x.Bz]}),t})()}}]);
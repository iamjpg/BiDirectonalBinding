(function(){var a;a=function(){function a(a){null==a&&(a={}),this.name=a.name,this.form=a.form,this.dataObj=a.dataObj,this.init()}return a.prototype.init=function(){return void 0===window.WatchJS?(console.warn("WARNING: WatchJS is a requirement for BiDirectionalBinding. Please use the compiled file with WatchJS included or source your own version of WatchJS."),!1):(this.toDom(),this.toObj())},a.prototype.toObj=function(){var a,b;return a=document.querySelectorAll("[data-bdb]"),b=this,[].forEach.call(a,function(a){return a.addEventListener("change",function(){return b.dataObj[this.getAttribute("data-bdb")]=this.value},!1)})},a.prototype.toDom=function(){return watch(this.dataObj,function(a,b,c){var d;return d=document.querySelector("[data-bdb="+a+"]"),"checkbox"===d.type||"radio"===d.type?d.checked=c===d.value?!0:!1:d.value=c})},window.BiDirectionalBinding=a,a}()}).call(this);
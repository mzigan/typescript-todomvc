!function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t,s){"use strict";function i(e,t=null){let s;return s="string"==typeof e?(t||document).querySelectorAll(e):e,new n(s)}Object.defineProperty(t,"__esModule",{value:!0}),t.$=i;class n{constructor(e){this.element=e}get(){return this.element?this.element instanceof Element?this.element:0==this.element.length?null:this.element[0]:null}getAll(e){return this.element?this.element instanceof Element?this.element:0==this.element.length?null:e?this.element[e]:null:null}hasClass(e){if(!this.element)return!1;if(this.element instanceof Element)return o(this.element,e);if(0==this.element.length)return!1;let t=!0;return this.element.forEach(s=>{t=o(s,e)&&t}),t}removeClass(e){return this.element?this.element instanceof Element?(l(this.element,e),this):0==this.element.length?this:(this.element.forEach(t=>{l(t,e)}),this):this}addClass(e){return this.element?this.element instanceof Element?(a(this.element,e),this):0==this.element.length?this:(this.element.forEach(t=>{a(t,e)}),this):this}toggleClass(e){return this.element?this.element instanceof Element?(r(this.element,e),this):0==this.element.length?this:(this.element.forEach(t=>{r(t,e)}),this):this}}function o(e,t){if(!e)return!1;let s=!1;const i=t.split(" ");for(let t=0;t<i.length&&(s=e.classList?e.classList.contains(i[t]):new RegExp("\\b"+i[t]+"\\b").test(e.className),s);t++);return s}function l(e,t){if(e)if(e.classList){t.split(" ").forEach(t=>e.classList.remove(t))}else e.className=e.className.replace(new RegExp("\\b"+t+"\\b","g"),"")}function a(e,t){if(e)if(e.classList){t.split(" ").forEach(t=>e.classList.add(t))}else i(e).hasClass(t)||(e.className+=" "+t)}function r(e,t){const s=i(e).getAll();s&&(i(s).hasClass(t)?i(s).removeClass(t):i(s).addClass(t))}t.on=function(e,t,s,i,n=!1){t.addEventListener(s,i.bind(e),n)},t.delegate=function(e,t,s,i,n,o=!1){t.addEventListener(i,(i=>{const o=t.querySelectorAll(s);for(let t=0;t<o.length;t++)if(o[t]===i.target){n.bind(e).call(i.target,i);break}}).bind(e),o)};class d{static createElement(e,t,s=""){const i=document.createElement(e);return s&&(i.className=s),t&&t.appendChild(i),i}static div(e,t){return d.createElement("div",e,t)}static button(e,t){return d.createElement("button",e,t)}static editor(e,t){return d.createElement("input",e,t)}static li(e,t){const s=d.createElement("li",e);return s.dataset.id=t,s}static check(e,t,s=!1){const i=d.createElement("input",e,t);return i.setAttribute("type","checkbox"),i.checked=s,i}static label(e,t,s=""){const i=d.createElement("label",e,t);return s&&(i.textContent=s),i}}t.Factory=d,t.dot=function(e){return"."+e};const h=new Array;for(var c=0;c<256;c++)h[c]=(c<16?"0":"")+c.toString(16);t.uuid=function(){var e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,s=4294967295*Math.random()|0,i=4294967295*Math.random()|0;return h[255&e]+h[e>>8&255]+h[e>>16&255]+h[e>>24&255]+"-"+h[255&t]+h[t>>8&255]+"-"+h[t>>16&15|64]+h[t>>24&255]+"-"+h[63&s|128]+h[s>>8&255]+"-"+h[s>>16&255]+h[s>>24&255]+h[255&i]+h[i>>8&255]+h[i>>16&255]+h[i>>24&255]},t.getId=function(e){let t;return e instanceof HTMLElement&&e.parentNode&&(t=e.parentNode.dataset.id,!t&&e.parentNode.parentNode&&(t=e.parentNode.parentNode.dataset.id)),t}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),new(s(2).Controller)},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),n=s(3);t.Controller=class{constructor(){this.main=new n.Main(this),this.list=new n.TodoList(this),this.footer=new n.Footer(this),this.items=new Array,i.on(this,document,"DOMContentLoaded",this.load),i.on(this,window,"hashchange",this.render)}indexOf(e){const t=i.getId(e);let s=-1,n=this.items.length;for(;t&&n--;)if(this.items[n].id==t){s=n;break}return s}getItem(e){const t=this.indexOf(e);return t>-1?this.items[t]:null}del(e){this.items[e].element.remove(),this.items.splice(e,1)}add(e,t){this.items.push(new n.TodoItem(this.list,e,t))}load(){const e=localStorage.getItem("todos_typescript");if(e){const t=JSON.parse(e);for(const e in t)t.hasOwnProperty(e)&&this.add(t[e].name,t[e].checked)}this.render()}save(){const e={};for(const t in this.items){const s=this.items[t];e[t]={checked:s.toggle.checked,name:s.label.textContent}}localStorage.setItem("todos_typescript",JSON.stringify(e)),this.render()}render(){const e=this.items.length;let t=0;this.items.forEach(e=>{e.toggle.checked||t++}),this.items.forEach(e=>e.render()),this.main.render(t,e),this.footer.render(t,e)}addTodo(e){if(e instanceof KeyboardEvent&&13!=e.keyCode)return;let t=this.list.newTodo.value.trim();t&&(this.add(t,!1),this.list.newTodo.value="",this.save())}delTodo(e){const t=this.indexOf(e.target);t>-1&&(this.del(t),this.save())}focusoutTodo(e){const t=this.getItem(e.target);t&&(t.update(),this.save())}toggleTodo(){this.save()}keyupTodo(e){const t=this.getItem(e.target);t&&e instanceof KeyboardEvent&&(13==e.keyCode?(t.editor.value.trim()?t.update():this.delTodo(e),this.save()):27==e.keyCode&&t.cancel())}editTodo(e){const t=this.getItem(e.target);t&&t.edit()}clearCompleted(){let e=0;const t=this.items.length;for(let s=0;s<t;s++){this.items[e].toggle.checked?this.del(e):e++}this.save()}toggleAll(){this.items.forEach(e=>{e.toggle.checked=this.main.toggleAll.checked}),this.save()}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(4),n=s(0);t.TodoItem=class{constructor(e,t,s){this.list=e,this.id=n.uuid(),this.element=n.Factory.li(e.element,this.id),this.view=n.Factory.div(this.element,"view"),this.toggle=n.Factory.check(this.view,"toggle",s),this.label=n.Factory.label(this.view,"",t),this.destroy=n.Factory.button(this.view,"destroy"),this.editor=n.Factory.editor(this.element,"edit")}update(){this.editor.value.trim()&&(this.label.textContent=this.editor.value.trim(),n.$(this.element).removeClass("editing"))}cancel(){this.editor.value="",n.$(this.element).removeClass("editing")}edit(){this.editor.value="",this.label.textContent&&(this.editor.value=this.label.textContent),n.$(this.element).addClass("editing"),this.editor.focus()}render(){switch(this.toggle.checked?n.$(this.element).addClass("completed"):n.$(this.element).removeClass("completed"),window.location.hash){case"#/active":this.toggle.checked?n.$(this.element).addClass("hidden"):n.$(this.element).removeClass("hidden");break;case"#/completed":this.toggle.checked?n.$(this.element).removeClass("hidden"):n.$(this.element).addClass("hidden");break;default:n.$(this.element).removeClass("hidden")}}};t.TodoList=class{constructor(e){this.app=e,this.element=n.$(n.dot("todo-list")).get(),this.newTodo=n.$(n.dot("new-todo")).get(),n.on(this.app,this.newTodo,"keyup",this.app.addTodo),n.on(this.app,this.newTodo,"focusout",this.app.addTodo),n.delegate(this.app,this.element,n.dot("edit"),"focusout",this.app.focusoutTodo),n.delegate(this.app,this.element,n.dot("destroy"),"click",this.app.delTodo),n.delegate(this.app,this.element,n.dot("toggle"),"change",this.app.toggleTodo),n.delegate(this.app,this.element,n.dot("edit"),"keyup",this.app.keyupTodo),n.delegate(this.app,this.element,"label","dblclick",this.app.editTodo)}};t.Main=class{constructor(e){this.app=e,this.element=n.$(n.dot("main")).get(),this.toggleAll=n.$(n.dot("toggle-all")).get(),n.on(this.app,this.toggleAll,"change",this.app.toggleAll)}render(e,t){this.toggleAll.checked=t>0&&0==e,t>0?n.$(this.element).removeClass("hidden"):n.$(this.element).addClass("hidden")}};t.Footer=class{constructor(e){this.app=e,this.element=n.$(n.dot("footer")).get(),this.todoCount=n.$(n.dot("todo-count")).get(),this.clearCompleted=n.$(n.dot("clear-completed")).get(),this.allFilter=n.$(i.SELECTOR.HREF_ALL).get(),this.activeFilter=n.$(i.SELECTOR.HREF_ACTIVE).get(),this.completedFilter=n.$(i.SELECTOR.HREF_COMPLETED).get(),n.on(this.app,this.clearCompleted,"click",this.app.clearCompleted)}render(e,t){switch(this.todoCount.innerHTML=1==e?`<strong>${e}</strong> item left`:`<strong>${e}</strong> items left`,n.$("a").removeClass("selected"),window.location.hash){case"#/active":n.$(this.activeFilter).addClass("selected");break;case"#/completed":n.$(this.completedFilter).addClass("selected");break;default:n.$(this.allFilter).addClass("selected")}t-e>0?n.$(this.clearCompleted).removeClass("hidden"):n.$(this.clearCompleted).addClass("hidden"),t>0?n.$(this.element).removeClass("hidden"):n.$(this.element).addClass("hidden")}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class i{}t.SELECTOR=i,i.HREF_ALL='a[href="#/"]',i.HREF_ACTIVE='a[href="#/active"]',i.HREF_COMPLETED='a[href="#/completed"]'}]);
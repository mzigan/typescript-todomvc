(()=>{"use strict";var e={970:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SELECTOR=void 0;class s{}t.SELECTOR=s,s.HREF_ALL='a[href="#/"]',s.HREF_ACTIVE='a[href="#/active"]',s.HREF_COMPLETED='a[href="#/completed"]'},742:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Controller=void 0;const i=s(384),o=s(85);t.Controller=class{constructor(){this.main=new o.Main(this),this.list=new o.TodoList(this),this.footer=new o.Footer(this),this.items=new Array,(0,i.on)(this,document,"DOMContentLoaded",this.load),(0,i.on)(this,window,"hashchange",this.render)}indexOf(e){const t=(0,i.getId)(e);let s=-1,o=this.items.length;for(;t&&o--;)if(this.items[o].id==t){s=o;break}return s}getItem(e){const t=this.indexOf(e);return t>-1?this.items[t]:null}del(e){this.items[e].element.remove(),this.items.splice(e,1)}add(e,t){this.items.push(new o.TodoItem(this.list,e,t))}load(){const e=localStorage.getItem("todos_typescript");if(e){const t=JSON.parse(e);for(const e in t)t.hasOwnProperty(e)&&this.add(t[e].name,t[e].checked)}this.render()}save(){const e={};for(const t in this.items){const s=this.items[t];e[t]={checked:s.toggle.checked,name:s.label.textContent}}localStorage.setItem("todos_typescript",JSON.stringify(e)),this.render()}render(){const e=this.items.length;let t=0;this.items.forEach((e=>{e.toggle.checked||t++})),this.items.forEach((e=>e.render())),this.main.render(t,e),this.footer.render(t,e)}addTodo(e){if(e instanceof KeyboardEvent&&13!=e.keyCode)return;let t=this.list.newTodo.value.trim();t&&(this.add(t,!1),this.list.newTodo.value="",this.save())}delTodo(e){const t=this.indexOf(e.target);t>-1&&(this.del(t),this.save())}focusoutTodo(e){const t=this.getItem(e.target);t&&(t.update(),this.save())}toggleTodo(){this.save()}keyupTodo(e){const t=this.getItem(e.target);t&&e instanceof KeyboardEvent&&(13==e.keyCode?(t.editor.value.trim()?t.update():this.delTodo(e),this.save()):27==e.keyCode&&t.cancel())}editTodo(e){const t=this.getItem(e.target);t&&t.edit()}clearCompleted(){let e=0;const t=this.items.length;for(let s=0;s<t;s++)this.items[e].toggle.checked?this.del(e):e++;this.save()}toggleAll(){this.items.forEach((e=>{e.toggle.checked=this.main.toggleAll.checked})),this.save()}}},384:(e,t)=>{function s(e,t=null){let s;return s="string"==typeof e?(t||document).querySelectorAll(e):e,new i(s)}Object.defineProperty(t,"__esModule",{value:!0}),t.getId=t.uuid=t.dot=t.Factory=t.delegate=t.on=t.$=void 0,t.$=s;class i{constructor(e){this.element=e}get(){return this.element?this.element instanceof Element?this.element:0==this.element.length?null:this.element[0]:null}getAll(e){return this.element?this.element instanceof Element?this.element:0==this.element.length?null:e?this.element[e]:null:null}hasClass(e){if(!this.element)return!1;if(this.element instanceof Element)return o(this.element,e);if(0==this.element.length)return!1;let t=!0;return this.element.forEach((s=>{t=o(s,e)&&t})),t}removeClass(e){return this.element?this.element instanceof Element?(l(this.element,e),this):(0==this.element.length||this.element.forEach((t=>{l(t,e)})),this):this}addClass(e){return this.element?this.element instanceof Element?(n(this.element,e),this):(0==this.element.length||this.element.forEach((t=>{n(t,e)})),this):this}toggleClass(e){return this.element?this.element instanceof Element?(a(this.element,e),this):(0==this.element.length||this.element.forEach((t=>{a(t,e)})),this):this}}function o(e,t){if(!e)return!1;let s=!1;const i=t.split(" ");for(let t=0;t<i.length&&(s=e.classList?e.classList.contains(i[t]):new RegExp("\\b"+i[t]+"\\b").test(e.className),s);t++);return s}function l(e,t){e&&(e.classList?t.split(" ").forEach((t=>e.classList.remove(t))):e.className=e.className.replace(new RegExp("\\b"+t+"\\b","g"),""))}function n(e,t){e&&(e.classList?t.split(" ").forEach((t=>e.classList.add(t))):s(e).hasClass(t)||(e.className+=" "+t))}function a(e,t){const i=s(e).getAll();i&&(s(i).hasClass(t)?s(i).removeClass(t):s(i).addClass(t))}t.on=function(e,t,s,i,o=!1){t.addEventListener(s,i.bind(e),o)},t.delegate=function(e,t,s,i,o,l=!1){t.addEventListener(i,(i=>{const l=t.querySelectorAll(s);for(let t=0;t<l.length;t++)if(l[t]===i.target){o.bind(e).call(i.target,i);break}}).bind(e),l)};class d{static createElement(e,t,s=""){const i=document.createElement(e);return s&&(i.className=s),t&&t.appendChild(i),i}static div(e,t){return d.createElement("div",e,t)}static button(e,t){return d.createElement("button",e,t)}static editor(e,t){return d.createElement("input",e,t)}static li(e,t){const s=d.createElement("li",e);return s.dataset.id=t,s}static check(e,t,s=!1){const i=d.createElement("input",e,t);return i.setAttribute("type","checkbox"),i.checked=s,i}static label(e,t,s=""){const i=d.createElement("label",e,t);return s&&(i.textContent=s),i}}t.Factory=d,t.dot=function(e){return"."+e};const h=new Array;for(var r=0;r<256;r++)h[r]=(r<16?"0":"")+r.toString(16);t.uuid=function(){var e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,s=4294967295*Math.random()|0,i=4294967295*Math.random()|0;return h[255&e]+h[e>>8&255]+h[e>>16&255]+h[e>>24&255]+"-"+h[255&t]+h[t>>8&255]+"-"+h[t>>16&15|64]+h[t>>24&255]+"-"+h[63&s|128]+h[s>>8&255]+"-"+h[s>>16&255]+h[s>>24&255]+h[255&i]+h[i>>8&255]+h[i>>16&255]+h[i>>24&255]},t.getId=function(e){let t;return e instanceof HTMLElement&&e.parentNode&&(t=e.parentNode.dataset.id,!t&&e.parentNode.parentNode&&(t=e.parentNode.parentNode.dataset.id)),t}},85:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Footer=t.Main=t.TodoList=t.TodoItem=void 0;const i=s(970),o=s(384);t.TodoItem=class{constructor(e,t,s){this.list=e,this.id=(0,o.uuid)(),this.element=o.Factory.li(e.element,this.id),this.view=o.Factory.div(this.element,"view"),this.toggle=o.Factory.check(this.view,"toggle",s),this.label=o.Factory.label(this.view,"",t),this.destroy=o.Factory.button(this.view,"destroy"),this.editor=o.Factory.editor(this.element,"edit")}update(){this.editor.value.trim()&&(this.label.textContent=this.editor.value.trim(),(0,o.$)(this.element).removeClass("editing"))}cancel(){this.editor.value="",(0,o.$)(this.element).removeClass("editing")}edit(){this.editor.value="",this.label.textContent&&(this.editor.value=this.label.textContent),(0,o.$)(this.element).addClass("editing"),this.editor.focus()}render(){switch(this.toggle.checked?(0,o.$)(this.element).addClass("completed"):(0,o.$)(this.element).removeClass("completed"),window.location.hash){case"#/active":this.toggle.checked?(0,o.$)(this.element).addClass("hidden"):(0,o.$)(this.element).removeClass("hidden");break;case"#/completed":this.toggle.checked?(0,o.$)(this.element).removeClass("hidden"):(0,o.$)(this.element).addClass("hidden");break;default:(0,o.$)(this.element).removeClass("hidden")}}},t.TodoList=class{constructor(e){this.app=e,this.element=(0,o.$)((0,o.dot)("todo-list")).get(),this.newTodo=(0,o.$)((0,o.dot)("new-todo")).get(),(0,o.on)(this.app,this.newTodo,"keyup",this.app.addTodo),(0,o.on)(this.app,this.newTodo,"focusout",this.app.addTodo),(0,o.delegate)(this.app,this.element,(0,o.dot)("edit"),"focusout",this.app.focusoutTodo),(0,o.delegate)(this.app,this.element,(0,o.dot)("destroy"),"click",this.app.delTodo),(0,o.delegate)(this.app,this.element,(0,o.dot)("toggle"),"change",this.app.toggleTodo),(0,o.delegate)(this.app,this.element,(0,o.dot)("edit"),"keyup",this.app.keyupTodo),(0,o.delegate)(this.app,this.element,"label","dblclick",this.app.editTodo)}},t.Main=class{constructor(e){this.app=e,this.element=(0,o.$)((0,o.dot)("main")).get(),this.toggleAll=(0,o.$)((0,o.dot)("toggle-all")).get(),(0,o.on)(this.app,this.toggleAll,"change",this.app.toggleAll)}render(e,t){this.toggleAll.checked=t>0&&0==e,t>0?(0,o.$)(this.element).removeClass("hidden"):(0,o.$)(this.element).addClass("hidden")}},t.Footer=class{constructor(e){this.app=e,this.element=(0,o.$)((0,o.dot)("footer")).get(),this.todoCount=(0,o.$)((0,o.dot)("todo-count")).get(),this.clearCompleted=(0,o.$)((0,o.dot)("clear-completed")).get(),this.allFilter=(0,o.$)(i.SELECTOR.HREF_ALL).get(),this.activeFilter=(0,o.$)(i.SELECTOR.HREF_ACTIVE).get(),this.completedFilter=(0,o.$)(i.SELECTOR.HREF_COMPLETED).get(),(0,o.on)(this.app,this.clearCompleted,"click",this.app.clearCompleted)}render(e,t){switch(this.todoCount.innerHTML=1==e?`<strong>${e}</strong> item left`:`<strong>${e}</strong> items left`,(0,o.$)("a").removeClass("selected"),window.location.hash){case"#/active":(0,o.$)(this.activeFilter).addClass("selected");break;case"#/completed":(0,o.$)(this.completedFilter).addClass("selected");break;default:(0,o.$)(this.allFilter).addClass("selected")}t-e>0?(0,o.$)(this.clearCompleted).removeClass("hidden"):(0,o.$)(this.clearCompleted).addClass("hidden"),t>0?(0,o.$)(this.element).removeClass("hidden"):(0,o.$)(this.element).addClass("hidden")}}}},t={};new(function s(i){var o=t[i];if(void 0!==o)return o.exports;var l=t[i]={exports:{}};return e[i](l,l.exports,s),l.exports}(742).Controller)})();
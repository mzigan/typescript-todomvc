import { CLASS, EVENT, SELECTOR, STR, TAG, HASH, TPL } from './const'
import { Factory, on, delegate, $, uuid, dot } from './utl'
import { Controller } from './ctrl'

export class TodoItem {
    id: string;
    element: HTMLElement;
    view: HTMLElement;
    toggle: HTMLInputElement
    label: HTMLElement;
    destroy: HTMLElement;
    editor: HTMLInputElement;

    constructor(public list: TodoList, text: string, checked: boolean) {
        this.id = uuid();
        this.element = Factory.li(list.element, this.id);
        this.view = Factory.div(this.element, CLASS.VIEW);
        this.toggle = Factory.check(this.view, CLASS.TOGGLE, checked);
        this.label = Factory.label(this.view, CLASS.EMPTY, text);
        this.destroy = Factory.button(this.view, CLASS.DESTROY);
        this.editor = Factory.editor(this.element, CLASS.EDIT);
    }

    update() {
        if (this.editor.value.trim()) {
            this.label.textContent = this.editor.value.trim();
            $(this.element).removeClass(CLASS.EDITING);
        }
    }

    cancel() {
        this.editor.value = STR.EMPTY;
        $(this.element).removeClass(CLASS.EDITING);
    }

    edit() {
        this.editor.value = STR.EMPTY;
        if (this.label.textContent)
            this.editor.value = this.label.textContent;
        $(this.element).addClass(CLASS.EDITING);
        this.editor.focus();
    }

    render(){
        // completed
        (this.toggle.checked) ? $(this.element).addClass(CLASS.COMPLETED) : $(this.element).removeClass(CLASS.COMPLETED);
        // hidden
        switch (window.location.hash) {
            case HASH.ACTIVE: (this.toggle.checked) ? $(this.element).addClass(CLASS.HIDDEN) : $(this.element).removeClass(CLASS.HIDDEN); break;
            case HASH.COMPLETED: (this.toggle.checked) ? $(this.element).removeClass(CLASS.HIDDEN) : $(this.element).addClass(CLASS.HIDDEN); break;
            default: $(this.element).removeClass(CLASS.HIDDEN); break;
        }
    }
}

export class TodoList {
    element: HTMLUListElement;
    newTodo: HTMLInputElement;

    constructor(public app: Controller) {
        this.element = $(dot(CLASS.TODOLIST)).get() as HTMLUListElement;
        this.newTodo = $(dot(CLASS.NEWTODO)).get() as HTMLInputElement;

        on(this.app, this.newTodo, EVENT.KEY_UP, this.app.addTodo);
        on(this.app, this.newTodo, EVENT.FOCUSOUT, this.app.addTodo);
        delegate(this.app, this.element, dot(CLASS.EDIT), EVENT.FOCUSOUT, this.app.focusoutTodo);
        delegate(this.app, this.element, dot(CLASS.DESTROY), EVENT.CLICK, this.app.delTodo);
        delegate(this.app, this.element, dot(CLASS.TOGGLE), EVENT.CHANGE, this.app.toggleTodo);
        delegate(this.app, this.element, dot(CLASS.EDIT), EVENT.KEY_UP, this.app.keyupTodo);
        delegate(this.app, this.element, TAG.LABEL, EVENT.DBL_CLICK, this.app.editTodo);
    }
}

export class Main {
    element: HTMLElement
    toggleAll: HTMLInputElement;

    constructor(public app: Controller) {
        this.element = $(dot(CLASS.MAIN)).get() as HTMLElement;
        this.toggleAll = $(dot(CLASS.TOGGLEALL)).get() as HTMLInputElement;

        on(this.app, this.toggleAll, EVENT.CHANGE, this.app.toggleAll);
    }

    render(activeCount: number, allCount: number){
        this.toggleAll.checked = allCount > 0 && activeCount == 0;
        (allCount > 0) ? $(this.element).removeClass(CLASS.HIDDEN) : $(this.element).addClass(CLASS.HIDDEN);
    }
}

export class Footer {
    element: HTMLElement
    todoCount: HTMLSpanElement;
    allFilter: HTMLHRElement;
    activeFilter: HTMLHRElement;
    completedFilter: HTMLHRElement;
    clearCompleted: HTMLButtonElement;

    constructor(public app: Controller) {
        this.element = $(dot(CLASS.FOOTER)).get() as HTMLElement;
        this.todoCount = $(dot(CLASS.TODOCOUNT)).get() as HTMLSpanElement;
        this.clearCompleted = $(dot(CLASS.CLEARCOMPLETED)).get() as HTMLButtonElement;
        this.allFilter = $(SELECTOR.HREF_ALL).get() as HTMLHRElement;
        this.activeFilter = $(SELECTOR.HREF_ACTIVE).get() as HTMLHRElement;
        this.completedFilter = $(SELECTOR.HREF_COMPLETED).get() as HTMLHRElement;

        on(this.app, this.clearCompleted, EVENT.CLICK, this.app.clearCompleted);
    }

    render(activeCount: number, allCount: number){
        // todo count
        if(activeCount == 1)
            this.todoCount.innerHTML = `${TPL.S1}${activeCount}${TPL.S2}`;
        else    
            this.todoCount.innerHTML = `${TPL.S1}${activeCount}${TPL.S3}`;
        // filter
        $(TAG.A).removeClass(CLASS.SELECTED);
        switch (window.location.hash) {
            case HASH.ACTIVE: $(this.activeFilter).addClass(CLASS.SELECTED); break;
            case HASH.COMPLETED: $(this.completedFilter).addClass(CLASS.SELECTED); break;
            default: $(this.allFilter).addClass(CLASS.SELECTED); break;
        }
        // clear completed
        (allCount - activeCount > 0) ? $(this.clearCompleted).removeClass(CLASS.HIDDEN) : $(this.clearCompleted).addClass(CLASS.HIDDEN);
        // footer
        (allCount > 0) ? $(this.element).removeClass(CLASS.HIDDEN) : $(this.element).addClass(CLASS.HIDDEN);
    }
}

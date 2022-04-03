const elTodoForm= document.querySelector('todo__form');
const elTodoInput= document.querySelector('todo__input');
const elTodoList= document.querySelector('todo__list');

const elAlBtn= document.querySelector('btnAll');
const elComplatedBtn= document.querySelector('btnComplated');
const elUncomplatedBtn= document.querySelector('btnUnComplated');
const elAllCount= document.querySelector('allCount');
const elComplatedCount= document.querySelector('complatedCount');
const elUnComplatedCount= document.querySelector('uncomplatedCount');
const elTodosControls= document.querySelector('todo__controls');

let totosArray=[];

elTodoForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let todoInput= elTodoInput.value.trim();
    console.log(todoInput);
    
})


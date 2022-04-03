const elTodoForm= document.querySelector('.todo__form');
const elTodoInput= document.querySelector('.todo__input');
const elTodoList= document.querySelector('.todo__list');

const elAlBtn= document.querySelector('.btnAll');
const elComplatedBtn= document.querySelector('.btnComplated');
const elUncomplatedBtn= document.querySelector('.btnUnComplated');
const elAllCount= document.querySelector('.allCount');
const elComplatedCount= document.querySelector('.complatedCount');
const elUnComplatedCount= document.querySelector('.uncomplatedCount');
const elTodosControls= document.querySelector('.todo__controls');
const elTodoTemplate= document.querySelector('#todo_item_tempilate').content;

let storege = window.localStorage;
let localTodoArray = JSON.parse(storege.getItem("todoArray"));
let localCounter = JSON.parse(storege.getItem("counter"));

console.log(localTodoArray);

let todosArray= localTodoArray || []
let counter= localCounter || 1

function UpdateArray() {
    renderTodos(todosArray, elTodoList)
    storege.setItem("todoArray", JSON.stringify(todosArray))
    calculateTodo(todosArray)
}

elTodoForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let todoValue=elTodoInput.value.trim();
    if(todoValue){
        let oneTodo = {
            id: counter++,
            todo: todoValue,
            isComplated: false
        }
        storege.setItem("counter", JSON.stringify(counter))   

        todosArray.unshift(oneTodo)
        elTodoInput.value = null;
    }
   UpdateArray() 
   
})
function renderTodos(array, wrapper){
  wrapper.innerHTML = null;
  let todoFragment = document.createDocumentFragment()
  array.forEach(item => {
   let todoTemplate = elTodoTemplate.cloneNode(true)
    todoTemplate.querySelector(".todo__text").textContent = item.todo;
    todoTemplate.querySelector(".chekbox__todo").dataset.todoId = item.id;
    todoTemplate.querySelector(".todo__del-btn").dataset.todoId = item.id;

    if(item.isComplated===true){

        todoTemplate.querySelector(".chekbox__todo").checked = true;
    }

     todoFragment.appendChild(todoTemplate);
    

  });
  wrapper.appendChild(todoFragment);
}
renderTodos(todosArray, elTodoList)

elTodoList.addEventListener("click", function (evt) {
    let chek = evt.target.matches(".chekbox__todo")
  
    
    if(chek){
        let checkboxId = evt.target.dataset.todoId;
        
        let foundTodo = todosArray.find(function (item) {
            
            return item.id== checkboxId
        })
        let foundTodoIndex = todosArray.findIndex(function (item) {
            
            return item.id== checkboxId
        })
        if (!foundTodo.isComplated) {
            
            todosArray[foundTodoIndex].isComplated =true;
        }else{
         
            todosArray[foundTodoIndex].isComplated =false;
        }
        UpdateArray()
        console.log(todosArray)
    }
    
    let chekForBtn = evt.target.matches(".todo__del-btn")

    if(chekForBtn){
 let checkboxId = evt.target.dataset.todoId;

 let foundTodoIndex = todosArray.findIndex(function(item) {
            
    return item.id== checkboxId
})
  todosArray.splice(foundTodoIndex, 1)
 UpdateArray()
    }
})
function calculateTodo(array) {
    let complatedTodos = array.filter(item=>item.isComplated===true)
    let notComplatedTodos = array.filter(item=>item.isComplated===false)
    
    
    let allTodoNumber = array.length;
    let complateTodoNumber = allTodoNumber- notComplatedTodos.length;
    let notComplatedTodoNumber = allTodoNumber- complateTodoNumber

    elAllCount.textContent = allTodoNumber
    elComplatedCount.textContent = complateTodoNumber
    elUnComplatedCount.textContent = notComplatedTodoNumber
}

UpdateArray()
    elTodosControls.addEventListener("click", function (evt) {

        let allBtn = evt.target.matches(".btnAll")
        let complatedBtn = evt.target.matches(".btnComplated")
        let uncomplatedBtn = evt.target.matches(".btnUnComplated")

        if (allBtn) {
            renderTodos(todosArray, elTodoList)
            
        }else if(complatedBtn){
            let complatedTodos = todosArray.filter(item => item.isComplated === true)
            renderTodos(complatedTodos, elTodoList)
         } else if(uncomplatedBtn) {
            let notComplatedTodos = todosArray.filter(item => item.isComplated === false)
            renderTodos(notComplatedTodos, elTodoList)
            
        }

    })
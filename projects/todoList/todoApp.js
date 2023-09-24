//SELECTEURS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list"); //<ul>
const filterOption = document.querySelector(".filter-todo"); //<select>

// let todosJson = JSON.parse(localStorage.getItem("todos"));

//ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", CheckedDeleted);
filterOption.addEventListener("input", filterTodo);


//FONCTIONS

function addTodo(event) {
   event.preventDefault();

   // création de "todo-div"
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo-div");

   // création de <li>
   const newTodo = document.createElement("li");
   // newTodo.innerText = "Yo";
   newTodo.innerText = todoInput.value;
   newTodo.classList.add("todo-item");
   todoDiv.appendChild(newTodo);

   //Ajouter un item au localStorage
   saveLocalTodos(todoInput.value);

   // création du bouton check & ajout à todoDiv
   const checkButton = document.createElement("button");
   checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
   checkButton.classList.add("check-btn");
   todoDiv.appendChild(checkButton);

   // création du bouton trash & ajout à todoDiv
   const trashButton = document.createElement("button");
   trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);

   // ajout de todoDiv à todoList (<ul>)
   todoList.appendChild(todoDiv);

   // réinitialisation de l'input
   todoInput.value = "";
}


//cocher / supprimer
function CheckedDeleted(e) {
   const item = e.target;

   //Suppression du <li>
   if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement; //récupération du parent
      //ajout d'une animation
      todo.classList.add("fall");
      //suppression de localStorage
      removeLocalTodos(todo);
      //suppression dans un callback pour que l'animation puisse se jouer avant
      todo.addEventListener("transitionend", function () {
         todo.remove();
      });
   }

   //cocher l'item
   if (item.classList[0] === "check-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
   }
}

// filtrer les items
function filterTodo(e) {
   const todos = todoList.childNodes;  //récupération des enfants
   todos.forEach(function (todo) {
      switch (e.target.value) {
         case "all":
            todo.style.display = "flex";
            break;
         case "completed":
            if (todo.classList.contains("completed")) {
               todo.style.display = "flex";
            } else {
               todo.style.display = "none";
            }
            break;
         case "uncompleted":
            if (!todo.classList.contains("completed")) {
               todo.style.display = "flex";
            } else {
               todo.style.display = "none";
            }
            break;
      }
   });
   // console.log(todos);
}

function saveLocalTodos(todo) {
   //Checker s'il y a des items éxistants ... 
   let todos;
   //... si le localStorage ne contient pas liste [todos] ...
   if (localStorage.getItem("todos") === null) {
      //... on initialise un nouveau tableau vide.
      todos = [];
   } else {
      //... sinon on récupère les items exstants
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

//Afficher les items stockés dans le localStorage
function getTodos() {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.forEach(function (todo) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-div");

      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);

      const checkButton = document.createElement("button");
      checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
      checkButton.classList.add("check-btn");
      todoDiv.appendChild(checkButton);

      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      todoList.appendChild(todoDiv);
   });
}

function removeLocalTodos(todo) {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));
}




///* /// MÉMOIRE ///////////////////////////////////////////////////*

{/* CRÉATION EN JAVASCRIPT, DE LA DIV(*) EMBRIQUÉE DANS LA BALISE <UL>
   <ul class="todo-container">
   *   <div class="todo">
   *      <li>MA TACHE</li>
   *      <button>DELETE</button>
   *      <button>CHECK</button>
   *   </div>
   </ul>
*/}

{/* <i class="fa-solid fa-trash"></i>
<i class="fa fa-check"></i> */}
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function completeToDo(event) {
  const clickedSpan = event.target;
  clickedSpan.classList.toggle("complete");
}

function updateToDo(event) {
  const span = event.target.previousElementSibling;
  const fixedTodo = prompt("수정할 내용을 입력하세요");

  if (fixedTodo) {
    alert("수정되었습니다.");
    span.innerText = fixedTodo;
    const li = event.target.parentElement;
    const updateTargetTodoArrayIndex = toDos.findIndex(
      (toDo) => toDo.id === parseInt(li.id)
    );
    toDos[updateTargetTodoArrayIndex].text = fixedTodo;
    saveToDos();
  } else {
    alert("수정이 취소되었습니다.");
  }
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const span = document.createElement("span");
  span.innerText = newTodo.text;
  span.addEventListener("click", completeToDo);

  if (newTodo.text === "빵먹기") {
    span.innerText = "🍞🍞🍞";
  } else {
    span.innerText = newTodo.text;
  }

  const updateButton = document.createElement("button");
  updateButton.innerText = "수정";
  updateButton.addEventListener("click", updateToDo);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "삭제";
  deleteButton.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(updateButton);
  li.appendChild(deleteButton);

  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintTodo);
}

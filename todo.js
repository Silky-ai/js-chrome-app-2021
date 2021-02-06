const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
//local storage 에는 string만 저장 가능하다.
const TODOS_LS = "toDos";

let toDos = [];
let Ids = 0;
function deleteToDo(event) {
  let btn = event.target;
  if (btn.className === "fas fa-trash-alt") {
    btn = event.path[1];
    console.log(btn);
  }
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  }); //어레이의 모든 아이템을 filter 함수에 보내서 true인 아이템으로 어레이를 만들어 반환

  toDos = cleanToDos;
  saveToDos();
}
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON.stringify는 JS object를 string으로 바꿈
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");

  Ids += 1;
  delBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = Ids;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: Ids,
  };
  toDos.push(toDoObj);
  saveToDos();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

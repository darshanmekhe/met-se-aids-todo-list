let addtodo = document.querySelector("#addTodoButton");
let popup = document.querySelector(".popupTODO");
let save = document.querySelector("#saveBtn");
let close=document.querySelector("#close")


addtodo.addEventListener("click", () => {
    popup.classList.add("showPopup");
    popup.classList.remove("closePopup")
})


save.addEventListener("click", () => {
    popup.classList.remove("showPopup");
    popup.classList.add("closePopup");
})

close.addEventListener("click", () => {
    popup.classList.remove("showPopup");
    popup.classList.add("closePopup");
})

let todo_name = document.querySelector("#todoName");
let todo_description = document.querySelector("#todoDescription");
let todo_priority = document.querySelector("#todoPriority");
let taskList = document.querySelector(".taskList");

save.addEventListener("click", () => {

    let unique_Id = Date.now();

    let todoData = {
        name: todo_name.value,
        description: todo_description.value,
        priority: todo_priority.value,
        uId: unique_Id
    }

    let todolist = localStorage.getItem("todos");
    todolist = todolist === null ? [] : JSON.parse(todolist);
    console.log(todolist);

    todolist.unshift(todoData);
    Swal.fire({
        title: "Task Registered!",
        icon: "success"
      });
    localStorage.setItem("todos", JSON.stringify(todolist));
    window.location.reload();
});



let fetchedarray = localStorage.getItem('todos');

fetchedarray = JSON.parse(fetchedarray);




if (fetchedarray.length === 0){
    taskList.innerHTML = "<p>All Task Accomplished</p>";
} else {
let newList = fetchedarray.map((value) => {

    
    
    let mark;
    if (value.priority === "high") {
        mark = "!!!";
    } else if (value.priority === "medium") {
        mark = "!!"
    } else if (value.priority === "low") {
        mark = "!"
    }

    
    let bgCol;
    if (mark === "!!!") {
        bgCol = "#EA3D2F";
    } else if (mark === "!!") {
        bgCol = "#367BF5";
    } else if (mark === "!") {
        bgCol = "#2FA84F";
    }

    return `
                <div class="task">   
                    <div class="taskDetails">
                        <h3>${value.name}<span class="priorityMark" style="background-color: ${bgCol};">${mark}</span></h3>
                        
                        <p>${value.description}</p>
                    </div>

                        <a href="#" id="${value.uId}" class="deleteButton"><i class="fa-solid fa-trash-can"></i></a>

                </div>
        `
})

taskList.innerHTML = newList.join(" "); 
}



let deleteButton = document.querySelectorAll(".deleteButton");
let button_Id;

delBtn = deleteButton.forEach(function (button) {

    button.addEventListener('click', function() {
        
        button_Id = button.getAttribute("Id");
        
        let arrrayOfButton = JSON.parse(localStorage.getItem("todos"));

        arrrayOfButton = arrrayOfButton.filter(object => Number(object.uId) !== Number(button_Id));

        localStorage.setItem('todos', JSON.stringify(arrrayOfButton));

        window.location.reload();
    });
});
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){
const list = document.getElementById("taskList");
list.innerHTML="";

tasks.forEach((task,index)=>{

const li=document.createElement("li");
if(task.completed) li.classList.add("completed");

const details=document.createElement("div");
details.className="task-details";
details.innerHTML=`
<strong>${task.text}</strong>
<div class="task-date">${task.date ? task.date : ""}</div>
`;

const actions=document.createElement("div");
actions.className="actions";

const completeBtn=document.createElement("button");
completeBtn.innerText="Complete";
completeBtn.className="complete-btn";
completeBtn.onclick=()=>{
tasks[index].completed=!tasks[index].completed;
saveTasks();
renderTasks();
};

const editBtn=document.createElement("button");
editBtn.innerText="Edit";
editBtn.className="edit-btn";
editBtn.onclick=()=>{
let newText=prompt("Edit Task:",task.text);
if(newText){
tasks[index].text=newText;
saveTasks();
renderTasks();
}
};

const deleteBtn=document.createElement("button");
deleteBtn.innerText="Delete";
deleteBtn.className="delete-btn";
deleteBtn.onclick=()=>{
tasks.splice(index,1);
saveTasks();
renderTasks();
};

actions.appendChild(completeBtn);
actions.appendChild(editBtn);
actions.appendChild(deleteBtn);

li.appendChild(details);
li.appendChild(actions);

list.appendChild(li);

});
}

function addTask(){
const text=document.getElementById("taskInput").value.trim();
const date=document.getElementById("taskDate").value;

if(text===""){
alert("Please enter a task.");
return;
}

tasks.push({
text:text,
date:date,
completed:false
});

saveTasks();
renderTasks();

document.getElementById("taskInput").value="";
document.getElementById("taskDate").value="";
}

renderTasks();
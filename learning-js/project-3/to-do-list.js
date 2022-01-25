let addToButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let item = document.getElementById('item');
let editItem = null;

addToButton.addEventListener('click', function(){
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling')
    paragraph.innerText = item.value;
    toDoContainer.appendChild(paragraph);
    item.value = "";
    paragraph.addEventListener('click', function(){
        paragraph.style.textDecoration = "line-through";
    })
    paragraph.addEventListener('dblclick', function(){
        toDoContainer.removeChild(paragraph);
    })
    
})
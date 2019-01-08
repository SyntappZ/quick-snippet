let form = document.getElementById('form');
let input = document.getElementById('input');
let list = document.getElementById('list');


form.addEventListener('submit', (e) => {
 e.preventDefault();
createItem(input.value);
inputArr(input.value);
})



function inputArr(item){
 
}



function getData(){
    
}


function createItem(x){
  let addList = `<div id="addWrap"><div onclick="deleteItem(this)" id="trash"><i class="fas fa-trash-alt"></i></div><div onclick="lineThrough(this)" id="addItem">${x}</div></div>`
  list.insertAdjacentHTML('beforeend', addList);
//   input.value = '';
  input.focus();
}
function deleteItem(eleToDelete){
     eleToDelete.parentElement.remove();
}

function lineThrough(line){
    if(line.style.textDecoration === 'line-through'){
        line.style.textDecoration = 'none';
        line.style.transform = 'scale(1)';
        line.style.backgroundColor = '#F0F0DF';
    }else{
        line.style.textDecoration = 'line-through';
        line.style.transform = 'scale(.97)';
        line.style.backgroundColor = '#BDD3DE';
    }
   

    
}
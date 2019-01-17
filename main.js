let form = document.getElementById('form');
let input = document.getElementById('input');
let list = document.getElementById('list');
let btn = document.getElementById('btn');

let itemArr = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemArr));
const data = JSON.parse(localStorage.getItem('items'));
console.log(data);



form.addEventListener('submit', (e) => {
 e.preventDefault();

itemArr.push(input.value);
localStorage.setItem('items', JSON.stringify(itemArr));
createItem(input.value);
input.value = '';
})










function createItem(x){
  let addList = `<div class="addWrap"><div onclick="deleteItem(this)" class="trash"><i class="fas fa-trash-alt"></i></div><div onclick="lineThrough(this)" id="addItem">${x}</div><div onclick="quickCopy(this)" class="copy"><i class="fas fa-copy"></i></div></div>`
  list.insertAdjacentHTML('beforeend', addList);
  input.focus();
}
function deleteItem(eleToDelete){
    let added = eleToDelete.nextSibling.innerHTML;
    eleToDelete.parentElement.remove();
    for(let i = 0; i < data.length; i++){
        if(data[i] === added){
            data.splice(i , 1);
            localStorage.setItem('items', JSON.stringify(data))
            itemArr = [];
            console.log(data);
        }
    }
   
     
}

data.forEach(item =>{
    createItem(item);
})


function quickCopy(el){ 
    let toCopy =  el.previousSibling;
    let animCopy = document.querySelector('.copiedText');
    let selection = window.getSelection();
    let range = document.createRange();
    range.selectNodeContents(toCopy);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
    animCopy.style.opacity = '1';
    animCopy.style.transform = 'scale(2)';
    setTimeout(() => {
        animCopy.style.opacity = '0';
    }, 400);
    setTimeout(() => {
        animCopy.style.transform = 'scale(1)';
    }, 700);
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

btn.addEventListener('click', function(){
  [].forEach.call(document.querySelectorAll('.addWrap'), function(e){
      e.parentNode.removeChild(e)
  })
    localStorage.clear()
})


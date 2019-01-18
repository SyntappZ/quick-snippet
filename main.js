let form = document.getElementById('form');
let input = document.getElementById('title');
let textArea = document.getElementById('textarea');
let list = document.getElementById('list');
let btn = document.getElementById('btn');
let wraps = document.getElementsByClassName('addWrap');



//title storage
let titleArray = localStorage.getItem('title') ? JSON.parse(localStorage.getItem('title')) : [];
localStorage.setItem('title', JSON.stringify(titleArray));
const data = JSON.parse(localStorage.getItem('title'));

//textarea storage
let textArray = localStorage.getItem('mainText') ? JSON.parse(localStorage.getItem('mainText')) : [];
localStorage.setItem('mainText', JSON.stringify(textArray));
const textData = JSON.parse(localStorage.getItem('mainText'));


form.addEventListener('submit', (e) => {
 e.preventDefault();

titleArray.push(input.value);
localStorage.setItem('title', JSON.stringify(titleArray));

textArray.push(textArea.value);
localStorage.setItem('mainText', JSON.stringify(textArray));

createItem(input.value);

document.location.reload();
})

// console.log(localStorage);
// console.log(textArray);
// console.log(titleArray)




data.forEach(item =>{
    createItem(item);
})



function createItem(x){
  let addList = `<div onmouseover="getTextFromArray(this)" class="addWrap"><div onclick="deleteItem(this)" class="trash"><i class="fas fa-trash-alt"></i></div><div onclick="lineThrough(this)" id="addItem">${x}</div><div onclick="quickCopy(this)" class="copy"><i class="fas fa-copy"></i></div></div>`
  list.insertAdjacentHTML('beforeend', addList);
  input.focus();
}
function deleteItem(eleToDelete){
    let added = eleToDelete.nextSibling.innerHTML;
    
    for(let i = 0; i < data.length; i++){
      
        if(data[i] === added){
            data.splice(i , 1);
            textArray.splice(i, 1);
            localStorage.setItem('title', JSON.stringify(data));
            localStorage.setItem('mainText', JSON.stringify(textArray));
           
        }
        document.location.reload();
    }
    eleToDelete.parentElement.remove();
   
    
     
}

function getTextFromArray(text){



}

// let wrapArray = Array.from(wraps);

console.log(wraps);

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


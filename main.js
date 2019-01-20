let form = document.getElementById('form');
let input = document.getElementById('title');
let textArea = document.getElementById('textarea');
let list = document.getElementById('list');
let btn = document.getElementById('btn');
let wraps = document.getElementsByClassName('addWrap');
let snippet = document.getElementById('snippet');
let snippetCount = document.getElementById('snip-count');


//title storage
let titleArray = localStorage.getItem('title') ? JSON.parse(localStorage.getItem('title')) : [];
localStorage.setItem('title', JSON.stringify(titleArray));
const data = JSON.parse(localStorage.getItem('title'));

//textarea storage
let textArray = localStorage.getItem('mainText') ? JSON.parse(localStorage.getItem('mainText')) : [];
localStorage.setItem('mainText', JSON.stringify(textArray));
const textData = JSON.parse(localStorage.getItem('mainText'));



//add snippets to localStorage
form.addEventListener('submit', (e) => {
 e.preventDefault();

titleArray.push(input.value);
localStorage.setItem('title', JSON.stringify(titleArray));

textArray.push(textArea.value);
localStorage.setItem('mainText', JSON.stringify(textArray));

createItem(input.value);

document.location.reload();
});





//get elements on load
data.forEach(item =>{
    createItem(item);
    
});



//create elements
function createItem(x){
    let addList = `<div onmouseover="getTextFromArray(this)" class="addWrap"><div onclick="deleteItem(this)" class="trash"><i class="fas fa-trash-alt"></i></div><div onclick="lineThrough(this)" id="addItem">${x}</div><div onclick="quickCopy()" class="copy"><i class="fas fa-copy"></i></div></div>`
    list.insertAdjacentHTML('beforeend', addList);
    input.focus();
}
  
//snippet counter
let snippetNumber = wraps.length;
snippetCount.innerHTML = snippetNumber;

 //delete elements single
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


//find snippet and display it
function getTextFromArray(thisWrap){
    for(let i = 0; i < data.length; i++){
        if(thisWrap === wraps[i]){
        index = i;
            if(textArray[i].charAt(0) === '<'){ 
                snippet.innerHTML = '<xmp>'+ textArray[i] +'</xmp>';
            }else{
                snippet.innerHTML = textArray[i];
            }
       
        }
    }
}





//copy snippet
function quickCopy(){ 
    let toCopy =  snippet;
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


//line through the title  
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


//remove all snippets and elements
btn.addEventListener('click', function(){
   let sure = confirm('Are you sure!? all will be deleted!');
    if(sure){
        [].forEach.call(document.querySelectorAll('.addWrap'), function(e){
            e.parentNode.removeChild(e)
        })
          localStorage.clear()
          document.location.reload();
    }else{
        null;
    }

 
})


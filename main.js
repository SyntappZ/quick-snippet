let form = document.getElementById('form');
let input = document.getElementById('title');
let textArea = document.getElementById('textarea');
let list = document.getElementById('list');
let btn = document.getElementById('btn');
let wraps = document.getElementsByClassName('addWrap');
let snippet = document.getElementById('snippet-text');
let snippetCount = document.getElementById('snip-count');

//color storage
let colorArray = localStorage.getItem('color') ? JSON.parse(localStorage.getItem('color')) : [];
localStorage.setItem('color', JSON.stringify(colorArray));


//title storage
let titleArray = localStorage.getItem('title') ? JSON.parse(localStorage.getItem('title')) : [];
localStorage.setItem('title', JSON.stringify(titleArray));
const data = JSON.parse(localStorage.getItem('title'));

//textarea storage
let textArray = localStorage.getItem('mainText') ? JSON.parse(localStorage.getItem('mainText')) : [];
localStorage.setItem('mainText', JSON.stringify(textArray));
const textData = JSON.parse(localStorage.getItem('mainText'));

//line storage
let lineArray = localStorage.getItem('line') ? JSON.parse(localStorage.getItem('line')) : [];
localStorage.setItem('line', JSON.stringify(lineArray));


//stored colors
const headerColor = '--header';
const asideColor = '--aside';
const bGroundColor = '--background';
const buttonColor = '--button';
let root = document.documentElement.style;

if(colorArray[0] === 'r'){
    themeChanger('#330E14', '#40121A', '#83262F', '#FADDAE');
}
if(colorArray[0] === 'b'){
    themeChanger('#010026', '#0A3B5C', '#185C79', '#5FA49A');
}
if(colorArray[0] === 'p'){
    themeChanger('#29102E', '#361E40', '#4D2A4F', '#B87D95');
}

if(colorArray[0] === 'g'){
    themeChanger('#0C2925', '#1B3E3C', '#55746F', '#6BB983');
}




//color change functions
function themeChanger(headCol, asideCol, bgCol, btnCol){
    root.setProperty(headerColor, headCol);
    root.setProperty(asideColor, asideCol);
    root.setProperty(bGroundColor, bgCol);
    root.setProperty(buttonColor, btnCol);
}
function redTheme(){
    themeChanger('#330E14', '#40121A', '#83262F', '#FADDAE');
    colorArray[0] = 'r';
    localStorage.setItem('color', JSON.stringify(colorArray));
    
}
function blueTheme(){
    themeChanger('#010026', '#0A3B5C', '#185C79', '#5FA49A');
    colorArray[0] = 'b';
    localStorage.setItem('color', JSON.stringify(colorArray));
    
}

function purpleTheme(){
    themeChanger('#29102E', '#361E40', '#4D2A4F', '#B87D95');
    colorArray[0] = 'p';
    localStorage.setItem('color', JSON.stringify(colorArray));
    
}

function greenTheme(){
    themeChanger('#0C2925', '#1B3E3C', '#55746F', '#6BB983');
    colorArray[0] = 'g';
    localStorage.setItem('color', JSON.stringify(colorArray));
    
}



//add snippets to localStorage
form.addEventListener('submit', (e) => {
 e.preventDefault();

titleArray.push(input.value);
localStorage.setItem('title', JSON.stringify(titleArray));

textArray.push(textArea.value);
localStorage.setItem('mainText', JSON.stringify(textArray));

lineArray.push('a')
localStorage.setItem('line', JSON.stringify(lineArray));

createItem(input.value);
input.value = '';
textArea.value = '';

//  document.location.reload();
});





//get elements on load
titleArray.forEach(item =>{
    createItem(item);
});

// load completed snippets
lineLoop()
function lineLoop(){
   
    for(let i = 0; i < lineArray.length; i++){
        let textDiv = wraps[i].firstChild.nextSibling;
        
        if(lineArray[i] === "b"){
            textDiv.style.textDecoration = 'line-through';
            textDiv.style.transform = 'scale(.97)';
            textDiv.style.backgroundColor = '#BDD3DE';
        }else{
            textDiv.style.textDecoration = 'none';
            textDiv.style.transform = 'scale(1)';
            textDiv.style.backgroundColor = '#fff';
        }
    }
}


//create elements
function createItem(x){
    let addList = `<div onmouseover="getTextFromArray(this)" class="addWrap"><div onclick="deleteItem(this)" class="trash"><i class="fas fa-trash-alt"></i></div><div onclick="lineThrough(this)" id="addItem">${x}</div><div onclick="quickCopy()" class="copy"><i class="fas fa-copy"></i></div></div>`
    list.insertAdjacentHTML('beforeend', addList);
    input.focus();
    snippetCounter()
}


//snippet counter
function snippetCounter(){
    let snippetNumber = wraps.length;
    snippetCount.innerHTML = snippetNumber;
}


//completed counter
function cCounter(){
    let c = 0;
    let completedCount = document.getElementById('line-count');
    for(let i = 0; i <  lineArray.length; i++){
        if(lineArray[i] === 'b'){
        c++
        }
    }
    completedCount.innerHTML = c;
}






 //delete elements single
function deleteItem(eleToDelete){
    let added = eleToDelete.nextSibling.innerHTML;
    
    for(let i = 0; i < titleArray.length; i++){
      
        if(titleArray[i] === added){
            titleArray.splice(i , 1);
            textArray.splice(i, 1);
            lineArray.splice(i, 1);
            localStorage.setItem('title', JSON.stringify(titleArray));
            localStorage.setItem('mainText', JSON.stringify(textArray));
            localStorage.setItem('line', JSON.stringify(lineArray));
        }
        // document.location.reload();
    }
    eleToDelete.parentElement.remove();
    snippetCounter()
    cCounter()
    snippet.innerHTML = '';
}



//find snippet and display it
function getTextFromArray(thisWrap){
    for(let i = 0; i < titleArray.length; i++){
        if(thisWrap === wraps[i]){
        index = i;
            let lineWrap = thisWrap.firstChild.nextSibling.style.backgroundColor;
            if(lineWrap === 'rgb(189, 211, 222)'){
                snippet.style.textDecoration = 'line-through';
                if(textArray[i].charAt(0) === '<'){ 
                    snippet.innerHTML = '<xmp>'+ textArray[i] +'</xmp>';
                }else{
                    snippet.innerHTML = textArray[i];
                }
            }else{
                snippet.style.textDecoration = 'none';
                if(textArray[i].charAt(0) === '<'){ 
                    snippet.innerHTML = '<xmp>'+ textArray[i] +'</xmp>';
                }else{
                    snippet.innerHTML = textArray[i];
                }
            }
        }
    }
}

//search function
let search = document.getElementById('search');
let searchBtn = document.getElementById('search-btn');
let searchForm = document.getElementById('search-wrap');

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let searchInput = search.value;
    if(wraps.length === 0){
        snippet.innerHTML = 'You have no snippets!';
        
    }else{
        for(let i = 0; i < wraps.length; i++){
            let wrapInput = wraps[i].firstChild.nextSibling.innerHTML;
            if(searchInput === wrapInput){
             let wrapColor = wraps[i].firstChild.nextSibling.style.backgroundColor;
            if(wrapColor === 'rgb(189, 211, 222)'){
                snippet.style.textDecoration = 'line-through';
                    if(textArray[i].charAt(0) === '<'){ 
                        snippet.innerHTML = '<xmp>'+ textArray[i] +'</xmp>';
                    }else{
                        snippet.innerHTML = textArray[i];
                    }
            }else{
                snippet.style.textDecoration = 'none';
                    if(textArray[i].charAt(0) === '<'){ 
                        snippet.innerHTML = '<xmp>'+ textArray[i] +'</xmp>';
                    }else{
                        snippet.innerHTML = textArray[i];
                    }
            }
                
        }
        }
        
    }
    search.value = '';
});



//copy button
let copyBtn = document.getElementById('copy-button');
copyBtn.addEventListener('click', ()=>{
    if(snippet.innerHTML === '' ||
       snippet.innerHTML === 'You have no snippets!' ||
       snippet.innerHTML === 'Title not recognised!' ||
       snippet.style.textDecoration === 'line-through' ||
       snippet.innerHTML === 'no snippet to copy!'){

       snippet.style.textDecoration = 'none';
       snippet.innerHTML = 'no snippet to copy!';
       
    }else{
        quickCopy();
    }

})
    


//copy snippet function
function quickCopy(){ 
    if(snippet.innerHTML === 'done!'){
        null;
    }else{
        let toCopy = snippet;
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
   
  }


//line through the title  
function lineThrough(line){
    if(line.style.textDecoration === 'line-through'){
        line.style.textDecoration = 'none';
        line.style.transform = 'scale(1)';
        line.style.backgroundColor = '#fff';
       
    }else{
        line.style.textDecoration = 'line-through';
        line.style.transform = 'scale(.97)';
        line.style.backgroundColor = '#BDD3DE';
    }
    lineCheck()
}


//check if snippet is complete and send to array
    function lineCheck(){
        for(let x = 0; x < wraps.length; x++){
            let textDiv = wraps[x].firstChild.nextSibling;
            if(textDiv.style.backgroundColor === 'rgb(189, 211, 222)'){
               lineArray[x] = "b";
            }else{
                lineArray[x] = "a";
            }
                     
        }
        localStorage.setItem('line', JSON.stringify(lineArray));
        cCounter()
    }
    



//remove all snippets and elements
btn.addEventListener('click', function(){
   let sure = confirm('Are you sure!? everything will be wiped!');
    if(sure){
        [].forEach.call(document.querySelectorAll('.addWrap'), function(e){
            e.parentNode.removeChild(e)
        })
          localStorage.clear()
          document.location.reload();
    }else{
        null;
    }
    snippet.innerHTML = '';
})



// color palette
    let colorPalette = document.getElementById('palette');
    let colorChoice = document.getElementById('color-choice');
    let exit = document.getElementById('exit');

    //open
    colorPalette.addEventListener('mouseover', ()=>{
        colorChoice.style.transform = 'scale(1)';
        colorChoice.style.opacity = '1';
    })

    //close
    exit.addEventListener('click', ()=>{
        colorChoice.style.transform = 'scale(0)';
        colorChoice.style.opacity = '0';
    })
    
    
   
    

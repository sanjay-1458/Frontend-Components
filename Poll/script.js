import {pollData} from './pollData.js';

const topic=document.getElementById('topic');
topic.textContent=pollData.topic;
const inner = document.querySelector(".inner");
const option=document.querySelector(".option");

function runPoll(){

    inner.innerHTML='';

    let totalPoll=0;
    for(let ind = 0; ind < pollData.pollOption.length; ++ind){

        totalPoll+=pollData.pollValue[ind];
    }
    for(let ind = 0; ind < pollData.pollOption.length; ++ind){
        const option=document.createElement('div');
        option.classList.add('option');

        const val=document.createElement('p');
        val.textContent=pollData.pollOption[ind];

        
        

        const percentage = document.createElement('p');
        percentage.textContent=Math.round((pollData.pollValue[ind]/totalPoll) * 100) + "%";
        percentage.classList.add('percentage')

        val.style.zIndex=100;
        percentage.style.zIndex=100;

        option.appendChild(val);
        option.appendChild(percentage);
        option.addEventListener('click',(e)=>{handleClick(e,ind)});
        
        const color=document.createElement('div');
        color.classList.add('color');
        const left=document.createElement('div');
        left.classList.add('left');
        left.style.width=pollData.pollValue[ind] +"%";
        color.appendChild(left);
        option.appendChild(color);
        
        inner.appendChild(option);
    }
    
    
    
}

function handleClick(e, ind){
   pollData.pollValue[ind]++;

    runPoll();
}


runPoll();
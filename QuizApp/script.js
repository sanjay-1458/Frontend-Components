import {quizData} from './quizData.js';



let index = 0, score = 0;

const options = document.querySelector('.options');
const next = document.getElementById('next');
const inner = document.querySelector('.inner');
const result = document.querySelector('.result');
const quiz = document.querySelector('.quiz');
function runQuiz() {
    options.innerHTML='';
    if(options.classList.contains('disabled')) {
        options.classList.remove('disabled');
    }


    const question = document.getElementById('question');

    question.textContent = `${index + 1}. ` + quizData[index].question;

    if(index == quizData.length - 1) {
        next.textContent='Submit';
    }
    for(let val of quizData[index].options) {
        const option = document.createElement('div');
        option.className='option';
        option.textContent = val;
        
        options.appendChild(option);
    }
    const numbers = document.getElementById('numbers');
    numbers.textContent = `${index + 1} of ${quizData.length} questions`;

}
function handleOptions(e) {

    if(!e.target.classList.contains('options')) {

        
        
        if(e.target.textContent === quizData[index].answer) {
            
            e.target.style.backgroundColor='#90EE90';
            score++;
        }
        else {
            e.target.style.backgroundColor='#f28b82';

            const ele = document.getElementsByClassName('option');
            for(let val of ele) {
                if(val.textContent == quizData[index].answer) {
                    val.style.backgroundColor = '#90EE90';
                }
            }
        }
        options.classList.add('disabled')
    }
}
options.addEventListener('click', handleOptions);

function handleStart(){

    index = 0;
    score = 0;
    inner.classList.remove('hidden');
    result.classList.add('hidden');
    quiz.style.height='400px';
    next.textContent ='Next';
    runQuiz();
}
function handleLastPage() {
    inner.classList.add('hidden');
    result.classList.remove('hidden');
    quiz.style.height='200px';

    const text=document.getElementById('end-text');
    const button= document.getElementById('play-again');

    text.textContent = `You scored ${score} out of ${quizData.length}!`

    button.addEventListener('click',handleStart);

}
function handleNext() {
    index++;

    if(index == quizData.length) {
        handleLastPage();
    }
    else{

        options.innerHTML='';
        runQuiz();
    }


}
next.addEventListener('click',handleNext);

handleStart();
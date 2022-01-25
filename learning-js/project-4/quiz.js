const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push questions into availableQuestions array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i]);
    }
    console.log(availableQuestions);
}
function getNewQuestion(){
    questionNumber.innerHTML = "Question "+ (questionCounter+1)+ " of "+ quiz.length;
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //get index
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove current index so it will not repeat
    availableQuestions.splice(index1, 1);
    //set option
    const optionLen = currentQuestion.options.length;
    //push options into availableOptions Array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i);
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.2;
    //create options in html
    for(let i=0; i<optionLen; i++){
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random()* availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)")
    }
    questionCounter++;
}
function getResult(element){
    const id = parseInt(element.id);
    console.log(typeof(id));
    if(id === currentQuestion.answer){
        element.classList.add("correct");
        //add indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }else{
       element.classList.add("wrong");
        //add indicator to wrong mark
        updateAnswerIndicator("wrong");
        // if ans is wrong show the correct answer
        const optionLen = optionContainer.children.length;
        for(i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}
//make all options unclickable once user click a option
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}
function answerIndicator(){
    answerIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType);
}
function next(){
    if(questionCounter === quiz.length){
        console.log(questionCounter);
        quizOver();
    }else{
        getNewQuestion();
    }
}
function quizOver(){
    //hide quix box
    quizBox.classList.add("hide");
    //show result box
    resultBox.classList.remove("hide");
    getQuizResult();
}
function getQuizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length ;
    resultBox.querySelector(".total-attempt").innerHTML = attempt ;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers ;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers ;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(2)+"%" ;
    resultBox.querySelector(".total-score").innerHTML = correctAnswers +" / " + quiz.length;
}
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}
function tryAgainQuiz(){
    //hide resultBox
    resultBox.classList.add("hide");
    //show quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}
function goToHome(){
    //hide resultBox
    resultBox.classList.add("hide");
    //sow homeBox
    homeBox.classList.remove("hide");
    resetQuiz();
}
function startQuiz(){
    //hide homeBox
    homeBox.classList.add("hide");
    //show quizBox
    quizBox.classList.remove("hide");
    //set all question in available question array
    setAvailableQuestions();
    //call getNewQuestion function
    getNewQuestion();
    //create indicator of ans
    answerIndicator();
}
window.onload = function (){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}
const questions = [
    {
        question: "Who burn Moscow",
        answers: [
            { text: "Julius Caesar", correct: false },
            { text: "Sun Tzu", correct: false },
            { text: "Napoleon", correct: true },
            { text: "Genghis Khan", correct: false }
        ]
    },
    {
        question: "'To be, or not to be' is a famous line from which play?",
        answers: [
            { text: "Hamlet", correct: true },
            { text: "Macbeth", correct: false },
            { text: "Romeo and Juliet", correct: false },
            { text: "Othello", correct: false }
        ]
    },
    {
        question: "Who was the first emperor of Rome?",
        answers: [
            { text: "Augustus", correct: false },
            { text: "Tiberius", correct: false },
            { text: "Alexander, The Great", correct: true },
            { text: "Caesar", correct: false }
        ]
    },
    {
        question: "Who was the Roman emperor known for his philosophical writings?",
        answers: [
            { text: "Augustus", correct: false },
            { text: "Marcus Aurelius", correct: true },
            { text: "Tiberius", correct: false },
            { text: "Caesar", correct: false }
        ]
    },
    {
        question: "Who wrote the book 'The Prince'?",
        answers: [
            { text: "Niccolò Machiavelli", correct: true },
            { text: "Leonardo da Vinci", correct: false },
            { text: "Galileo Galilei", correct: false },
            { text: "William Shakespeare", correct: false }
        ]
    }
   
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questonNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questonNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


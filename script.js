const startButton = document.createElement('button');//This line creates a new HTML <button> element and assigns it to the constant variable startButton.
startButton.innerText = 'Start Exam';//set text content to Start Exam
startButton.className = 'button';//assign a css classname for styling purpose.
startButton.addEventListener('click', startExam);// event listener for the function startExam to work.

const contentDiv = document.getElementById('content');//gets the element with the id of content and assigns it to the constant variable of contentDiv
contentDiv.appendChild(startButton);//here the startButton we created is appended to the contentDiv

const dateElement = document.getElementById('date');//retireves the element with the id of date and assigns it to a variable called dateElement
const timeElement = document.getElementById('time');//retireves the element with the id of time and assigns it to a variable called timeElement

let timeRemaining = 600; // 10 minutes in seconds
let interval;

// Define an array of questions with options and correct answers
const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
        correctAnswer: 'Paris'
    },
    {
        question: 'Which planet is known as the "Red Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars'
    },
    // Add more questions here...
    {
        question: 'Which planet is known as the "Ring Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Saturn'
    },
    {
        question: 'Which planet is known as the "biggest Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Jupiter'
    },
    {
        question: 'Which planet is the as the closest to sun?',
        options: ['Venus', 'Mars', 'Mercury', 'Saturn'],
        correctAnswer: 'Mercury'
    },
    {
        question: 'Which planet was once part of the solar system?',
        options: ['Venus', 'Mars', 'Jupiter', 'Pluto'],
        correctAnswer: 'Pluto'
    },
    {
        question: 'Which planet is known as the "Blue Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Earth'],
        correctAnswer: 'Earth'
    },
    {
        question: 'Which planet has the most number of moons?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Saturn'
    },
    {
        question: 'Which planet is known as the "Red Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars'
    },
    {
        question: 'On which planet does it rain diamonds"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Uranus'],
        correctAnswer: 'Uranus'
    },
];

let currentQuestionIndex = 0;
let userAnswers = [];

function updateTime() {
    const minutes = Math.floor(timeRemaining / 60);//which basically means we get 10 minutes
    const seconds = timeRemaining % 60;//here we get 00
    timeElement.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;//we access the timeElement variable and their text content and add this timer there
    timeRemaining--;//decrementing

    if (timeRemaining < 0) {
        clearInterval(interval);// when the time gets to negative we clear the timer.
        showTimeoutScreen();//function to show the timeoutscreen
    }
}

function startExam() {//this function is called when we click on the start button
    contentDiv.innerHTML = ''; // Clear content
    
    // Reset the timer
    timeRemaining = 600; // Reset to 10 minutes in seconds
    
    interval = setInterval(updateTime, 1000);
    updateTime();
    showQuestion(currentQuestionIndex);
}


function showQuestion(questionNumber) {
    const questionData = questions[questionNumber];

    const questionElement = document.createElement('div');
    questionElement.textContent = `Question ${questionNumber + 1}: ${questionData.question}`;

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options'; // Add this line

    questionData.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'button option-button'; // Add this line
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => selectAnswer(questionNumber, index));
        optionsDiv.appendChild(optionButton);
    });

    const submitButton = document.createElement('button');
    submitButton.className = 'button submit-button'; // Add this line
    submitButton.textContent = 'Submit and go to next question';
    submitButton.disabled = true;
    submitButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            showResultScreen();
        }
    });

    contentDiv.innerHTML = ''; // Clear previous content
    contentDiv.appendChild(questionElement);
    contentDiv.appendChild(optionsDiv);
    contentDiv.appendChild(submitButton);
}



function selectAnswer(questionNumber, answerIndex) {
    userAnswers[questionNumber] = answerIndex;
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = false;

    const optionButtons = document.querySelectorAll('.option-button:not([disabled])');
    optionButtons.forEach(button => button.disabled = true);
}


function calculateScore() {
    let score = 0;
    userAnswers.forEach((userAnswer, index) => {
        if (userAnswer === questions[index].options.indexOf(questions[index].correctAnswer)) {
            score += 10;
        }
    });
    return score;
}

function showResultScreen() {
    clearInterval(interval);
    contentDiv.innerHTML = '';

    const score = calculateScore();

    const resultElement = document.createElement('div');
    resultElement.textContent = `Your Score: ${score}`;

    const restartButton = document.createElement('button');
    restartButton.className = 'button';
    restartButton.textContent = 'Restart Exam';
    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        userAnswers = [];
        startExam();
    });

    contentDiv.appendChild(resultElement);
    contentDiv.appendChild(restartButton);
}

function showTimeoutScreen() {
    contentDiv.innerHTML = '';

    const timeoutElement = document.createElement('div');
    timeoutElement.textContent = 'Time Out! You did not complete the exam in time.';

    const restartButton = document.createElement('button');
    restartButton.className = 'button';
    restartButton.textContent = 'Restart Exam';
    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        userAnswers = [];
        startExam();
    });

    contentDiv.appendChild(timeoutElement);
    contentDiv.appendChild(restartButton);
}

// Initialize date
const currentDate = new Date();
dateElement.textContent = `Date: ${currentDate.toDateString()}`;

let questionNumber = 0;
let score = 0;

function generateQuestion(){
  console.log('generateQuestion ran');
  if (questionNumber < STORE.length) {
  return `<div class="question-${questionNumber}">
      <h2>${STORE[questionNumber].question}</h2>
      <form>
        <fieldset>
            <label for="answerOne">
            <input type="radio" name="quizChoices" value="${STORE[questionNumber].answers[0]}" id="answerOne" required>
            <span class="red">${STORE[questionNumber].answers[0]}</span>
            </label>
            <label for="answerTwo">
            <input type="radio" name="quizChoices" value="${STORE[questionNumber].answers[1]}" id="answerTwo" required>
            <span class="blue">${STORE[questionNumber].answers[1]}</span>
            </label>
            <label for="answerThree">
            <input type="radio" name="quizChoices" value="${STORE[questionNumber].answers[2]}" id="answerThree" required>
            <span class="red">${STORE[questionNumber].answers[2]}</span>
            </label>
            <label for="answerFour">
            <input type="radio" name="quizChoices" value="${STORE[questionNumber].answers[3]}" id="answerFour" required   >
            <span class="blue">${STORE[questionNumber].answers[3]}</span>
            </label>
            <button name="submitButton" class="submitButton type="submit" value="HTML">SUBMIT</button>
        </fieldset>
      </form>
    </div>`;
  } else {
    renderResults();
    restartQuiz();
    $('.questionNumber(10)');
  }
}


function changeQuestionNumber(){
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

function changeScore(){
  score++;
}

function startQuiz(){
  console.log("startQuiz ran");
  $('.startButton').on('click', event =>{
    console.log('actually started quiz');
  $('.quizButton').remove();
  $('.questionAnswerForm').css('display','block');
  $('.questionNumber').text(1);
  });
}

function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
} 

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

//user feedback for correct answer
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

//user feedback for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  // let iconImage = `${STORE[questionNumber].icon}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore(){
  changeScore();
  $('.score').text(score);
}

function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
} 

function renderResults(){
  if (score >= 8){
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You proficient in the way of the DeadHead!</h3><img src="http://laoblogger.com/images/grateful-dead-bears-clipart-7.jpg" alt="psycedilc dancing bear"/><p>You got ${score} / 10</p><p>If you enjoy Grateful Dead then you probably know about Joe Russo's Almost Dead!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Great job! There is much for you to learn!</h3><img src="https://i.imgur.com/lo7qpSZ.gif" alt="animated Bertha"/><p>You got ${score} / 10</p><p>Learn more and venture to a live show!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You may not have enough Grateful Dead in your life!</h3><img src="http://laoblogger.com/images/grateful-dead-bears-clipart-7.jpg" alt="dancing bears"/><p>You got ${score} / 10</p><p>Studies show live music makes life better! Get out there!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}


function handleQuizApp() {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
//console.log(STORE[1].correctAnswer);  
}

$(handleQuizApp);
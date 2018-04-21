const questionList = [
  {
    question: 'Who was Metallica\'s first guitar player?',
    answer1: 'Ron McGovney',
    answer2: 'Kirk Hammett',
    answer3: 'Dave Mustaine',
    answer4: 'Jason Newstead',
    correct: 'Dave Mustaine'
  },
  {
    question: 'What was Metallica\'s first recorded album?',
    answer1: 'Kill \'em All',
    answer2: 'No Life \'Till Leather',
    answer3: 'Ride the Lightning',
    answer4: 'Rust in Peace',
    correct: 'No Life \'Till Leather'
  },
  {
    question: 'What was Lars Ulrich going to be before he became a drummer?',
    answer1: 'A tennis player',
    answer2: 'A bass player',
    answer3: 'A golfer',
    answer4: 'A singer',
    correct: 'A tennis player'
  },
  {
    question: 'After Dave Mustaine was kicked out of Metallica, he formed what metal band?',
    answer1: 'Anthrax',
    answer2: 'Machine Head',
    answer3: 'Slayer',
    answer4: 'Megadeth',
    correct: 'Megadeth'
  },
  {
    question: 'What year was Metallica formed?',
    answer1: '1980',
    answer2: '1981',
    answer3: '1982',
    answer4: '1983',
    correct: '1981'
  },
  {
    question: 'The song \"The Four Horsemen\" was originally what song?',
    answer1: 'Whiplash',
    answer2: 'Rattlehead',
    answer3: 'Seek and Destroy',
    answer4: 'Mechanix',
    correct: 'Mechanix'
  },
  {
    question: 'Who placed an ad in a newspaper to form the band that went on to be Metallica?',
    answer1: 'James Hetfield',
    answer2: 'Lars Ulrich',
    answer3: 'Cliff Burton',
    answer4: 'Dave Mustaine',
    correct: 'Lars Ulrich'
  },
  {
    question: 'What was the name of that newspaper?',
    answer1: 'The Recycler',
    answer2: 'The L.A. Times',
    answer3: 'The Bottomfeeder',
    answer4: 'The Quibbler',
    correct: 'The Recycler'
  },
  {
    question: 'Who responded to the ad and formed the band?',
    answer1: 'James Hetfield',
    answer2: 'Ron McGovney',
    answer3: 'Dave Mustaine',
    answer4: 'Cliff Burton',
    correct: 'Ron McGovney'
  },
  {
    question: 'What is the best selling Metallica album to date?',
    answer1: 'Master of Puppets',
    answer2: 'Metallica',
    answer3: '...And Justice for All',
    answer4: 'Ride the Lightning',
    correct: 'Metallica'
  } 
  ];
  
  let questionNumber = 0;
  let score = 0;
  
 function startQuiz () { 
  $(".yeahButton").on("click",function(){
    $(".main").css("display","none");
      $(".mainQuestions").css("display","block");
      $('.questionNumber').text(1);
      renderQuestion();
  });
 }
 
 $(".noButton").on("click",function(){
    $(".main").css("display","none");
    $(".mainBackground").css("display","none");
    $(".header").css("display","none");
    $(".devo").css("display","block");
  });
  
function renderQuestion () {
  $('.mainQuestions').html(generateQuestion());
}

function generateQuestion () {
  if (questionNumber < questionList.length) {
    return `<div class="mainQuestions-${questionNumber}">
    <h1>${questionList[questionNumber].question}</h1>
    <hr>
    <form>
      <fieldset>
        <ul class='listAnswers'>
          <li>
            <label>
              <input type="radio" value="${questionList[questionNumber].answer1}" name="answer" required>
              <span class='answers'>${questionList[questionNumber].answer1}</span>
            </label>
          </li>
          <li>
            <label>
              <input type="radio" value="${questionList[questionNumber].answer2}" name="answer" required>
              <span class='answers'>${questionList[questionNumber].answer2}</span>
            </lable>
          </li>
        </ul>
        <ul class='listAnswers'>
          <li>
            <label>
              <input type="radio" value="${questionList[questionNumber].answer3}" name="answer" required>
              <span class='answers'>${questionList[questionNumber].answer3}</span>
            </label>
          </li>
          <li>
            <label>
              <input type="radio" value="${questionList[questionNumber].answer4}" name="answer" required>
              <span class='answers'>${questionList[questionNumber].answer4}</span>
            </label>
          </li>
        </ul>
        <button type="submit" class="submitButton">Submit</button>
      </fieldset>
    </form>
  </div>`;
  }
  else {
    renderResults();
    $('.questionNumber').text(10);
  }
}
  
function changeScore() {
  score ++;
}

function updateScore() {
  changeScore();
  $('.score').text(score);
}    

function changeQuestionNumber () {
    questionNumber += 1;
  $('.questionNumber').text(questionNumber+1);
}

function checkUserAnswer(answer) {
  if(answer.val() === questionList[questionNumber].correct) {
    return true;
  } else {
    return false;
  }
}

const correctFeedback = `
  <div class="feedbackPage">
    <p style="color:green;">Searching...Seek and Destroy!</p>
    <p style="color:green;">That's right!</p>
    <button class="nextButton">Next</button>`;

function incorrectFeedback() {
  return `
  <div class="feedbackPage">
    <p style="color:red;">Sleep with one eye open.</p>
      <p style="color:red;">You got it wrong.</p>
      <p>The correct answer is <br> <span>"${questionList[questionNumber].correct}"</span></p>
    <button class="nextButton">Next</button>`; 
}
    
function generateCorrectFeedback() {
  $('.mainQuestions').html(correctFeedback);
  updateScore();
}

function generateIncorrectFeedback() {
  $('.mainQuestions').html(incorrectFeedback);
}

function nextQuestion() {
  $('.mainQuestions').html(generateQuestion);
}

function userSelectAnswer () {
  $('.mainQuestions').on('click', '.submitButton', function(event) {
      event.preventDefault();
      const answer = $('input:checked');
      const userIsCorrect = checkUserAnswer(answer);
      if(userIsCorrect) {
        generateCorrectFeedback();
      } else {
        generateIncorrectFeedback();
      }
  });
}

function renderNextQuestion () {
  $('.mainQuestions').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
  });
}

function renderResults () {
  if (score >= 8) {
    $('.mainQuestions').html(`<div class="results feedbackPage"><p>You got ${score} / 10</p><h3>You are the Master of Puppets!</h3><p>Congratulations! Bask in the greatness that is Metallica.</p><button class="restartButton">Restart</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.mainQuestions').html(`<div class="results feedbackPage"><p>You got ${score} / 10</p><h3>You are Unforgiven...</h3><p>unless you study up and score higher.</p><button class="restartButton">Restart</button></div>`);
  } else {
    $('.mainQuestions').html(`<div class="results feedbackPage"><p>You got ${score} / 10</p><h3>The Four Horsemen are coming for you!</h3><p>Learn more about the greatest band in history to save yourself!</p><button class="restartButton">Restart</button></div>`);
  }
}

$('.mainQuestions').on('click', '.restartButton', function (event) {
  questionNumber=0;
  $('.questionNumber').text(questionNumber);
  score=0;
  $('.score').text(score);
  renderQuestion();
});

$('.fine').on('click', '.restartButton', function (event) {
  location.reload();
});

function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);





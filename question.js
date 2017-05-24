// temp literal until JSON source is ready
var quizData = [
  { question: "This is the first quiz question?",
    answers: [
      { answer: "Right!", isRight: true },
      { answer: "1 Wrong", isRight: false },
      { answer: "2 Wrong", isRight: false },
      { answer: "3 Wrong", isRight: false },
    ] },
  { question: "Another question?",
    answers: [
      { answer: "Right!", isRight: true },
      { answer: "1 Wrong", isRight: false },
      { answer: "2 Wrong", isRight: false },
      { answer: "3 Wrong", isRight: false },
    ] }
];

console.log(quizData);

// spits out random integer between min & max inclusive
function getRandomNum( min, max ) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function loadQuestion(atQ) {
  $('#progress').text(`Q${atQ+1} of ${quizData.length}`);
  $('#question').text(quizData[atQ].question);
  $('#next').addClass("invisible");
  var answers = [];
  for (let a = 0; a < quizData[atQ].answers.length ; a++) {
    answers[a] = quizData[atQ].answers[a].answer;
    quizState.atQAnswerKey[a] =  quizData[atQ].answers[a].isRight;
  }
  var $answers = $('.answers li');
  for (var a = 0; a < $answers.length; a++) {
    $($answers[a]).text(answers[a]).removeClass().addClass("btn");
  }
  console.log(quizState);
}

function checkGuess(atQ, guess) {
  var $answers = $('.answers li');
  for (let i = 0; i < quizState.atQAnswerKey.length; i++) {
    if (i === guess) {
      $($answers[i]).addClass("guess");
      if (quizState.atQAnswerKey[i]) {
        $($answers[i]).addClass("right");
        quizState.statusQs[atQ] = "right";
        $('#next').removeClass("invisible");
      } else {
        $($answers[i]).addClass("wrong");
        quizState.statusQs[atQ] = guess;
      }
    }
  }
  if (quizState.atQ = quizState.quizLength - 1) {
    $('#next').text("Finish");
  }
}

$(document).on("click", '.answers li', function(e) {
  var $answers = $('.answers li');
  for (var i = 0; i < $answers.length; i++) {
    $($answers[i]).removeClass("guess");
  }
  $(this).toggleClass("guess");
  console.log(parseInt(this.id.substr(-1)));
  checkGuess(quizState.atQ, parseInt(this.id.substr(-1)))
});

$(document).on('click', '#next', function() {
  if (quizState.atQ < quizState.quizLength - 1) {
    quizState.atQ++;
    loadQuestion(quizState.atQ);
  }
})

// start the quiz at Q = 0
$(document).ready(function() {
  loadQuestion(quizState.atQ);
})

// stores the whole quiz state
var quizState = {
  atQ: 0,
  quizLength: quizData.length,
  statusQs: Array(quizData.length),
  atQAnswerKey: []
}

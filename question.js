// temp literal until JSON source is ready
var quizData = [
  { question: "This is the first quiz question?",
    answers: [
      { answer: "Right!", isRight: true },
      { answer: "1 Wrong", isRight: false },
      { answer: "2 Wrong", isRight: false },
      { answer: "3 Wrong", isRight: false }
    ] },
  { question: "Another question?",
    answers: [
      { answer: "1 Wrong answer that is so long that is wraps on to multiple lines to see how it looks", isRight: false },
      { answer: "2 Wrong", isRight: false },
      { answer: "Right!", isRight: true },
      { answer: "3 Wrong", isRight: false }
    ] }
];

console.log(quizData);

// stores the whole quiz state
var quizState = {
  atQ: 0,
  quizLength: quizData.length,
  statusQs: Array(quizData.length).fill("unseen"),
  statusAs: Array(quizData.length).fill("none"),
  atQAnswerKey: []
}

// spits out random integer between min & max inclusive
function getRandomNum( min, max ) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function loadQuestion(atQ) {
  $('#progress').text(`Q${atQ+1} of ${quizData.length}`);
  $('#question').text(quizData[atQ].question);
  $('#next').text("Next Question").addClass("invisible");
  if (quizState.statusQs[atQ] === "unseen") { quizState.statusQs[atQ] = "viewed"; };
  $('#next').addClass("invisible");
  var answers = [];
  for (let a = 0; a < quizData[atQ].answers.length ; a++) {
    answers[a] = quizData[atQ].answers[a].answer;
    quizState.atQAnswerKey[a] =  quizData[atQ].answers[a].isRight;
  }
  var $answers = $('.answer');
  for (var a = 0; a < $answers.length; a++) {
    $($answers[a]).removeClass().addClass("answer btn").children(".answertext").text(answers[a]);
  }
  console.log(quizState.statusQs, quizState.statusAs);
}

function checkGuess(atQ, guess) {
  var $answers = $('.answer');
  for (let i = 0; i < quizState.atQAnswerKey.length; i++) {
    if (i === guess) {
      // $($answers[i]).addClass("guess");
      if (quizState.atQAnswerKey[i]) {
        $($answers[i]).addClass("right");
        if (quizState.statusQs[atQ] !== "answer") { quizState.statusAs[atQ] = "right" };
        $('#next').removeClass("invisible");
      } else {
        $($answers[i]).addClass("wrong");
        if (quizState.statusQs[atQ] !== "answer") { quizState.statusAs[atQ] = guess };
      }
    }
  }
  quizState.statusQs[atQ] = "answer";
  console.log(quizState.statusQs, quizState.statusAs);
  if (quizState.atQ + 1 === quizState.quizLength) {
    $('#next').text("View Results");
  }
}

$(document).on("click", '.answer', function(e) {
  var $answers = $('.answer');
  for (var i = 0; i < $answers.length; i++) {
    $($answers[i]).removeClass("guess");
  }
  $(this).toggleClass("guess");
  checkGuess(quizState.atQ, parseInt(this.id.substr(-1)))
});

$(document).on('click', '#next', function() {
  if (quizState.atQ + 1 < quizState.quizLength) {
    quizState.atQ++;
    loadQuestion(quizState.atQ);
  }
})

// start the quiz at Q = 0
$(document).ready(function() {
  // quizState.atQ = 0;
  loadQuestion(quizState.atQ = 0);
})

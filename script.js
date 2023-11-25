let questions = [
  // Sample questions. You can add your own.
  { q: "The condition in an if/else statement is enclosed with?", options: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"], answer: 3 },
  { q: "Arrays in JavaScript can be used to store?", options: ["Numbers and Strings", "Other Arrays", "Boolean", "All Of The Above"], answer: 3 },
  { q: "Commonly used data types DO NOT include?", options: ["Strings", "Booleans", "Alerts", "Numbers"], answer: 1 },
  { q: "A very useful tool used during development and debugging for printing content to the debugger is?", options: ["JavaScript", "Terminal/Bash", "For Loops", "console.log"], answer: 3 },
  { q: "String values must be enclosed within ______. When being assigned to variables.", options: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"], answer: 1 },
  
];

let currentQuestion = 0;
let score = 0;
let timer = 75;

// 
function startQuiz() {
  document.getElementById("startBtn").hidden = true;
  document.getElementById("quizSection").hidden = false;
  displayQuestion();
  // Timer logic
  let timerDisplay = document.getElementById("timer");
  let interval = setInterval(() => {
      timer--;
      timerDisplay.textContent = `Time: ${timer}`;
      if (timer <= 0 || currentQuestion >= questions.length) {
          clearInterval(interval);
          endQuiz();
      }
  }, 1000);

}
// 
function displayQuestion() {
  let q = questions[currentQuestion];
  document.getElementById("question").textContent = q.q;
  for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("option")[i].textContent = q.options[i];
  }
}

function checkAnswer(index) {
  if (index === questions[currentQuestion].answer) {
      score++;
  } else {
      timer -= 5;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
      displayQuestion();
  } else {
      endQuiz();
  }
}

function endQuiz() {
  document.getElementById("quizSection").hidden = true;
  document.getElementById("endSection").hidden = false;
}

function saveScore() {
  let initials = document.getElementById("initials").value;
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({ initials: initials, score: score });
  highscores.sort((a, b) => b.score - a.score); // Sort scores in descending order
  localStorage.setItem("highscores", JSON.stringify(highscores));
  displayHighScores();
}
// Displays top scores
function displayHighScores() {
  document.getElementById("endSection").hidden = true;
  document.getElementById("highScoresSection").hidden = false;
  // limits the top scores to the top 5
  let highscores = JSON.parse(localStorage.getItem("highscores")).slice(0,5) || [];
  let highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = ""; 
  // Clears the list
  highscores.forEach(scoreObj => {
      let li = document.createElement("li");
      li.textContent = `${scoreObj.initials} - ${scoreObj.score}`;
      highScoresList.appendChild(li);
  });
}

function resetQuiz() {
  document.getElementById("highScoresSection").hidden = true;
  document.getElementById("startBtn").hidden = false;
  currentQuestion = 0;
  score = 0;
  timer = 75;
}


document.getElementById("startBtn").addEventListener("click", startQuiz);
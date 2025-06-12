const questionBank = {
  science: [
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: 1
    },
    {
      question: "What gas do plants absorb?",
      answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correct: 1
    },
    {
      question: "How many bones are in the adult human body?",
      answers: ["206", "205", "210", "200"],
      correct: 0
    },
    {
      question: "Which organ purifies blood in the human body?",
      answers: ["Liver", "Heart", "Lungs", "Kidney"],
      correct: 3
    },
    {
      question: "What is H2O commonly known as?",
      answers: ["Salt", "Oxygen", "Water", "Hydrogen"],
      correct: 2
    }
  ],
  math: [
    {
      question: "What is 12 x 8?",
      answers: ["96", "86", "88", "98"],
      correct: 0
    },
    {
      question: "Square root of 64?",
      answers: ["6", "7", "8", "9"],
      correct: 2
    },
    {
      question: "What is the value of π (pi) to 2 decimal places?",
      answers: ["3.12", "3.14", "3.16", "3.18"],
      correct: 1
    },
    {
      question: "What is 15% of 200?",
      answers: ["30", "25", "35", "40"],
      correct: 0
    },
    {
      question: "What is the next prime number after 7?",
      answers: ["9", "11", "10", "13"],
      correct: 1
    }
  ],
  technology: [
    {
      question: "What does CPU stand for?",
      answers: [
        "Central Program Unit",
        "Control Process Unit",
        "Central Processing Unit",
        "Computer Processing Unit"
      ],
      correct: 2
    },
    {
      question: "HTML is used to:",
      answers: [
        "Design apps",
        "Design websites",
        "Compile Java",
        "Draw graphics"
      ],
      correct: 1
    },
    {
      question: "What does 'www' stand for?",
      answers: [
        "World Web Wide",
        "Wide World Web",
        "World Wide Web",
        "Web World Wide"
      ],
      correct: 2
    },
    {
      question: "Which company developed the Windows OS?",
      answers: ["Apple", "Microsoft", "Google", "IBM"],
      correct: 1
    },
    {
      question: "What language is primarily used for Android development?",
      answers: ["Swift", "Java", "Kotlin", "Python"],
      correct: 2
    }
  ]
};


const category = localStorage.getItem("category");
const questions = questionBank[category] || [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

document.getElementById("user").textContent = localStorage.getItem("username") || "Guest";

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(i);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].correct;
  if (selected === correct) score++;
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    nextBtn.style.display = "none";
  } else {
    endQuiz();
  }
});

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) endQuiz();
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById("question-container").classList.add("hide");
  nextBtn.style.display = "none";
  scoreContainer.classList.remove("hide");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

if (questions.length > 0) {
  showQuestion();
  startTimer();
} else {
  questionEl.textContent = "No questions found for this category.";
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById("question-container").classList.add("hide");
  nextBtn.style.display = "none";
  scoreContainer.classList.remove("hide");
  scoreEl.textContent = `${score} / ${questions.length}`;

  // Save to localStorage
  const username = localStorage.getItem("username") || "Guest";
  const category = localStorage.getItem("category") || "Unknown";
  const date = new Date().toLocaleString();

  const attempt = {
    name: username,
    category: category,
    score: `${score} / ${questions.length}`,
    time: date
  };

  let history = JSON.parse(localStorage.getItem("scoreHistory")) || [];
  history.push(attempt);
  localStorage.setItem("scoreHistory", JSON.stringify(history));
}

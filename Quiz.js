const API_URL = "https://quizapi.io/api/v1/questions";
const API_KEY = "vJEcyVnGBK1tviPtiIh1yGmpIYbTkgNhq64BtvGs";

let currentQuestion = 1;
let score = 0;
const category = sessionStorage.getItem('Option');
const limit = sessionStorage.getItem('question_count');

const question_count = document.getElementById("Question_count");
const Next_btn = document.getElementById("Next_btn");
const Welcome_seen = document.getElementById("welcome-screen");
const start_btn = document.getElementById("start_btn");
const Questions = document.getElementById("Questions");
const question_text = document.getElementById("question_text");
const Answer_1 = document.getElementById("Answer_1");
const Answer_2 = document.getElementById("Answer_2");
const Answer_3 = document.getElementById("Answer_3");
const Answer_4 = document.getElementById("Answer_4");

let questions = [];

async function loadQuestions() {
    try {
        const response = await fetch(`${API_URL}?apiKey=${API_KEY}&limit=${limit}&category=${category}`);
        questions = await response.json();
        console.log(questions);

        start_btn.addEventListener('click', () => {
            Welcome_seen.classList.add("hidden");
            Questions.classList.remove("hidden");
            question_count.innerHTML = `Question ${currentQuestion}/${limit}`;
            showQuestion(currentQuestion - 1);
        });

        Next_btn.addEventListener('click', handleNext);

    } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to load questions. Please try again!");
    }
}

function showQuestion(index) {
    const q = questions[index];

    question_text.innerHTML = q.question;
    Answer_1.innerText = q.answers.answer_a || "";
    Answer_2.innerText = q.answers.answer_b || "";
    Answer_3.innerText = q.answers.answer_c || "";
    Answer_4.innerText = q.answers.answer_d || "";

    // Reset previous selection
    document.querySelectorAll('input[name="options"]').forEach(opt => opt.checked = false);
}

function handleNext() {
    const selected = document.querySelector('input[name="options"]:checked');
    if (!selected) {
        alert("Please select an answer!");
        return;
    }

    // Check correctness
    const correct = questions[currentQuestion - 1].correct_answers[`answer_${selected.value}_correct`] === "true";
    if (correct) {
        score++;
        console.log("Score:", score);
    }

    // Move to next question
    currentQuestion++;
    if (currentQuestion > limit) {
        sessionStorage.setItem('score', score);
        sessionStorage.setItem('Questions',questions);
        window.location.href = "REsults.html";
        setTimeout(() => {
            location.reload(); // to get new questions if the user tried to go back to the questions after submitting
        }, 100);
        return;
    }

    question_count.innerHTML = `Question ${currentQuestion}/${limit}`;
    showQuestion(currentQuestion - 1);

    // Change button text if it's the last question
    if (currentQuestion == limit) {
        Next_btn.innerHTML = "Finish";
    } else {
        Next_btn.innerHTML = "Next";
    }
}

loadQuestions();

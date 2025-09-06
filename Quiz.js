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
let selected_ans =[];
let explain = [];
let question_list = [];
let your_ans =[];
let correct_ans=[];

async function loadQuestions() {
    try {
        const response = await fetch(`${API_URL}?apiKey=${API_KEY}&limit=${limit}&category=${category}`);
        questions = await response.json();
        console.log(questions);
        for (let i = 0; i < limit; i++) {
            if (questions[i].correct_answers[`answer_a_correct`] === "true") {
                correct_ans.push(questions[i].answers.answer_a)
            }
            if (questions[i].correct_answers[`answer_b_correct`] === "true") {
                correct_ans.push(questions[i].answers.answer_b)
            }
            if (questions[i].correct_answers[`answer_c_correct`] === "true") {
                correct_ans.push(questions[i].answers.answer_c)
            }
            if (questions[i].correct_answers[`answer_d_correct`] === "true") {
                correct_ans.push(questions[i].answers.answer_d)
            }
        }

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
    explain.push(q.explanation);
    question_list.push(q.question);
    

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
        selected_ans.push(1);
        score++;
    }else{
        selected_ans.push(0);
    }
    your_ans.push(questions[currentQuestion-1].answers[`answer_${selected.value}`]);
    // Move to next question
    currentQuestion++;
    if (currentQuestion > limit) {
        sessionStorage.setItem('score', score);
        sessionStorage.setItem('explain', JSON.stringify(explain));
        sessionStorage.setItem('Question_list', JSON.stringify(question_list));
        sessionStorage.setItem('Sel_ans', JSON.stringify(selected_ans));
        sessionStorage.setItem('YOU_ans', JSON.stringify(your_ans));
        sessionStorage.setItem('Correct_ans', JSON.stringify(correct_ans));
        console.log(explain);
        window.location.href = "REsults.html";
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

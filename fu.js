const API_URL = "https://quizapi.io/api/v1/questions";
const API_KEY = "vJEcyVnGBK1tviPtiIh1yGmpIYbTkgNhq64BtvGs";

let currentQuestion = 1;
let score = 0;
let Changer = sessionStorage.getItem('Changer');
let catagori = "";
if (Changer == 1) {
    catagori = "Python"
} else if (Changer==2){
    catagori = "HTML"
}else if(Changer==3){
    catagori="JS"
}




async function loadQuestions() {
    const response = await fetch(`${API_URL}?apiKey=${API_KEY}&limit=5&category=${catagori}`);
    const questions = await response.json();
    console.log(questions);
    return questions
}


        const questions = [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correctAnswer: 2,
                explanation: "Paris is the capital and most populous city of France."
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correctAnswer: 1,
                explanation: "Mars is often called the 'Red Planet' because of its reddish appearance."
            },
            {
                question: "What is the largest mammal in the world?",
                options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                correctAnswer: 1,
                explanation: "The blue whale is the largest mammal and the largest animal to have ever existed."
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                correctAnswer: 2,
                explanation: "The Mona Lisa was painted by Leonardo da Vinci in the early 16th century."
            },
            {
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                correctAnswer: 2,
                explanation: "The chemical symbol for gold is Au, from the Latin word 'aurum'."
            }
        ];






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




async function showQuestion(index) {
    console.log(questions[index]);
    question_text.innerHTML = questions[index].question;
    Answer_1.innerHTML = questions[index].options[0];
    Answer_2.innerHTML = questions[index].options[1];
    Answer_3.innerHTML = questions[index].options[2];
    Answer_4.innerHTML = questions[index].options[3];
}


start_btn.addEventListener('click',()=>{
    Welcome_seen.classList.add("hidden");
    Questions.classList.remove("hidden");
    showQuestion(currentQuestion-1);
});




Next_btn.addEventListener('click',()=>{
    currentQuestion=currentQuestion+1;
    if (currentQuestion > 5) {
        currentQuestion = 5;// to Display 5 instead of 6
        setTimeout(async ()=>{
            window.location.href = "REsults.html"; // Waiting for redirecting
        });
        location.reload();// to start a new quiz & avoid problems
    }
    else{
        showQuestion(currentQuestion-1);
    }
    question_count.innerHTML= "Question "+currentQuestion+"/5";
    if (currentQuestion==5) {
        Next_btn.innerHTML ="Finish"
    }
    


    const selected = document.querySelector('input[name="options"]:checked');

    if (selected) {
        console.log("Selected answer:", selected.value);
    } else {
        alert("Please select an answer!");
    }
});


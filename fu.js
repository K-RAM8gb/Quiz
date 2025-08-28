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
    catagori="JavaScript"
}




async function loadQuestions() {
    const response = await fetch(`${API_URL}?apiKey=${API_KEY}&limit=5&category=${catagori}`);
    const questions = await response.json();
    console.log(questions);

    function showQuestion(index) {
        
        console.log(questions[index]);
        question_text.innerHTML = questions[index].question;
        Answer_1.innerHTML = questions[index].answers.answer_a;
        Answer_2.innerHTML = questions[index].answers.answer_b;
        Answer_3.innerHTML = questions[index].answers.answer_c;
        Answer_4.innerHTML = questions[index].answers.answer_d;
    }


    start_btn.addEventListener('click',()=>{
        Welcome_seen.classList.add("hidden");
        Questions.classList.remove("hidden");
        showQuestion(currentQuestion-1);
    });




    Next_btn.addEventListener('click',()=>{
        const selected = document.querySelector('input[name="options"]:checked');
        if (selected) {
            console.log("Selected answer:", selected.value);
        } else {
            alert("Please select an answer!");
        }
        currentQuestion=currentQuestion+1;
        question_count.innerHTML= "Question "+currentQuestion+"/5";
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
        
        if (currentQuestion==5) {
            Next_btn.innerHTML ="Finish"
        }
    });
    return questions
}


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


loadQuestions();




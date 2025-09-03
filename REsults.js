const marks = document.getElementById("marks");
const limit = sessionStorage.getItem('question_count');
const review = document.getElementById("Review");
const score = sessionStorage.getItem('score');
const explain = JSON.parse(sessionStorage.getItem('explain'));
const Question_list = JSON.parse(sessionStorage.getItem('Question_list'));
const selected_ans = JSON.parse(sessionStorage.getItem('Sel_ans'));
const correct_ans = JSON.parse(sessionStorage.getItem('Correct_ans'));
const your_ans = JSON.parse(sessionStorage.getItem('YOU_ans'));

const green = "#00ff3233";
const red = "#e1003233";
let colour = "";

console.log(Question_list);



marks.innerText = `${score}/${limit}`;


for (let i = 0; i < limit; i++) {
        if (your_ans[i] === correct_ans[i]) {
                colour = green;
        } else{
                colour = red;
        }

        const newdiv = document.createElement("div");
        newdiv.innerHTML = `
                <div class="flex flex-1 flex-col justify-center my-8 p-5 bg-[${colour}] rounded-xl">
                <p id="Q_${i}" class="text-[#111418] text-base font-medium leading-normal"> </p>
                <p id="E_${i}" class="text-[#637488] text-sm font-normal leading-normal"></p>
                <p id="Ya_${i}" class="text-[#637488] text-sm font-normal leading-normal"></p>
                <p id="Ca_${i}" class="text-[#637488] text-sm font-normal leading-normal">
                </p>
                </div>`;
        review.appendChild(newdiv);

}

      setTimeout(() => {// to avoid using html tags, and a delay for loadind the above loop
            for (let y = 0; y < limit; y++) {
        let Question = document.getElementById(`Q_${y}`);
        Question.innerText = `Question ${y+1}: ${Question_list[y]}`;
        let Explanation = document.getElementById(`E_${y}`);
        Explanation.innerText = `Explanation: "${explain[y]}"`;
        let Ya = document.getElementById(`Ya_${y}`);
        Ya.innerText=`Your answer: ${your_ans[y]};`
        let Ca = document.getElementById(`Ca_${y}`);
        Ca.innerText = `Correct answer: ${correct_ans[y]}`
}
        }, 1000);



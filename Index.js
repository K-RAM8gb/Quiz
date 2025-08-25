
        // Quiz questions
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

        // DOM elements
        const welcomeScreen = document.getElementById('welcome-screen');
        const questionsScreen = document.getElementById('questions-screen');
        const resultsScreen = document.getElementById('results-screen');
        const questionContainer = document.getElementById('question-container');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const startBtn = document.getElementById('start-btn');
        const restartBtn = document.getElementById('restart-btn');
        const progressBar = document.getElementById('progress');
        const scoreDisplay = document.getElementById('score-display');
        const scoreMessage = document.getElementById('score-message');
        const answersSummary = document.getElementById('answers-summary');
        

        // Quiz state
        let currentQuestion = 0;
        let userAnswers = Array(questions.length).fill(null);
        let score = 0;

        // Start quiz
        startBtn.addEventListener('click', () => {
            welcomeScreen.classList.add('hidden');
            questionsScreen.classList.remove('hidden');
            showQuestion(currentQuestion);
            updateProgress();
        });
        

        // Restart quiz
        restartBtn.addEventListener('click', () => {
            currentQuestion = 0;
            userAnswers = Array(questions.length).fill(null);
            score = 0;
            questionsScreen.classList.remove('hidden');
            resultsScreen.classList.add('hidden');
            showQuestion(currentQuestion);
            updateProgress();
            nextBtn.textContent = 'Next';
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right ml-2"></i>';
            prevBtn.classList.add('hidden');
        });

        // Next question
        nextBtn.addEventListener('click', () => {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateProgress();
                prevBtn.classList.remove('hidden');
                
                if (currentQuestion === questions.length - 1) {
                    nextBtn.textContent = 'Submit';
                    nextBtn.innerHTML = 'Submit <i class="fas fa-check ml-2"></i>';
                }
            } else {
                calculateResults();
                questionsScreen.classList.add('hidden');
                resultsScreen.classList.remove('hidden');
            }
        });

        // Previous question
        prevBtn.addEventListener('click', () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion(currentQuestion);
                updateProgress();
                
                if (currentQuestion === 0) {
                    prevBtn.classList.add('hidden');
                }
                
                nextBtn.textContent = 'Next';
                nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right ml-2"></i>';
            }
        });

        // Show current question
        function showQuestion(index) {
            const question = questions[index];
            let optionsHtml = '';
            
            question.options.forEach((option, i) => {
                const isSelected = userAnswers[index] === i;
                const optionClass = isSelected 
                    ? 'bg-indigo-100 border-indigo-500' 
                    : 'bg-white border-gray-300 hover:border-indigo-300';
                
                optionsHtml += `
                    <div class="option mb-3 transition cursor-pointer" onclick="selectOption(${index}, ${i})">
                        <div class="flex items-center p-4 border-2 ${optionClass} rounded-lg">
                            <div class="w-6 h-6 rounded-full border-2 ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'} flex items-center justify-center mr-4">
                                ${isSelected ? '<i class="fas fa-check text-white text-xs"></i>' : ''}
                            </div>
                            <span class="text-gray-800">${option}</span>
                        </div>
                    </div>
                `;
            });
            
            questionContainer.innerHTML = `
                <div class="mb-6">
                    <span class="text-indigo-600 font-medium">Question ${index + 1} of ${questions.length}</span>
                    <h2 class="text-xl md:text-2xl font-bold text-gray-800 mt-1">${question.question}</h2>
                </div>
                <div class="options-container">
                    ${optionsHtml}
                </div>
            `;
        }

        // Select an option
        window.selectOption = function(questionIndex, optionIndex) {
            userAnswers[questionIndex] = optionIndex;
            showQuestion(questionIndex);
        };

        // Update progress bar
        function updateProgress() {
            const progress = ((currentQuestion + 1) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Calculate results
        function calculateResults() {
            score = 0;
            let summaryHtml = '';
            
            questions.forEach((question, index) => {
                const isCorrect = userAnswers[index] === question.correctAnswer;
                if (isCorrect) score++;
                
                const userAnswer = userAnswers[index] !== null 
                    ? question.options[userAnswers[index]] 
                    : 'Not answered';
                
                const correctAnswer = question.options[question.correctAnswer];
                
                summaryHtml += `
                    <div class="mb-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}">
                        <div class="font-medium text-gray-800 mb-1">${index + 1}. ${question.question}</div>
                        <div class="text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'} mb-2">
                            <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'} mr-1"></i>
                            ${isCorrect ? 'Correct!' : 'Incorrect'}
                        </div>
                        <div class="text-sm text-gray-600 mb-1"><span class="font-medium">Your answer:</span> ${userAnswer}</div>
                        ${!isCorrect ? `<div class="text-sm text-gray-600 mb-1"><span class="font-medium">Correct answer:</span> ${correctAnswer}</div>` : ''}
                        <div class="text-sm text-gray-600 mt-2">${question.explanation}</div>
                    </div>
                `;
            });
            
            const percentage = Math.round((score / questions.length) * 100);
            scoreDisplay.textContent = `${percentage}%`;
            answersSummary.innerHTML = summaryHtml;
            
            // Set score message based on performance
            if (percentage >= 80) {
                scoreMessage.textContent = "Excellent work! You really know your stuff.";
            } else if (percentage >= 60) {
                scoreMessage.textContent = "Good job! You have solid knowledge.";
            } else if (percentage >= 40) {
                scoreMessage.textContent = "Not bad! Keep learning and try again.";
            } else {
                scoreMessage.textContent = "Keep practicing! You'll improve with more study.";
            }
        }

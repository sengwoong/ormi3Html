import { QuestionCommand, RemoteControl } from './CommandScoring.js';

const remoteControl = new RemoteControl();
let questionCommand;

const questionContainer = document.getElementById('question-container');
const answerInput = document.getElementById('answer-input');
const backButton = document.getElementById('back-btn');
const nextButton = document.getElementById('next-btn');
const evaluateButton = document.getElementById('evaluate-btn');
let questionIndexContainer = document.getElementById('question-index');

const scoringBtn = document.getElementById('scoring-btn');
const clearLocalStorageButton = document.getElementById('clear-localstorage-btn');

let storedAnswers;

const strategies = {
  react: ["React의 주요 특징은 무엇인가요?", "React 컴포넌트를 만드는 방법을 설명해주세요."],
  java: ["Java의 주요 특징은 무엇인가요?", "Java 클래스를 만드는 방법을 설명해주세요."],
  javascript: ["JavaScript의 주요 특징은 무엇인가요?", "JavaScript 컴포넌트를 만드는 방법을 설명해주세요.","자바스크립트와 자바의 관계는?"],
  // 다른 전략에 대한 질문들을 추가할 수 있습니다.
};

let currentStrategy = null;
let currentQuestionIndex = 0;

const selectOption = () => {
  const strategy = prompt("어떤 전략을 선택하시겠습니까? (react, java, javascript)");
  currentStrategy = strategy;
  storedAnswers = JSON.parse(localStorage.getItem(currentStrategy)) || [];
  if (strategy && strategy in strategies) {
    CreateSelector()
    updateQuestionAndAnswer()
    return strategy;
  } else {
    alert("react, java, javascript 중에서 선택하세요!");
    return selectOption();
  }
};

// Load stored answers when the page initially loads
selectOption();

backButton.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    updateQuestionAndAnswer();
  } else {
    alert("더 이상 뒤로 갈 수 없습니다.");
  }
});

nextButton.addEventListener('click', () => {
  if (!currentStrategy) {
    alert("새로고침 해주세요.");
    return;
  }

  const questions = strategies[currentStrategy];
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    updateQuestionAndAnswer();
    
  } else {
    alert("더 이상 질문이 없습니다.");
  }
});

evaluateButton.addEventListener('click', () => {
  const answer = answerInput.value.trim();
  if (!answer) {
    alert("답변을 입력해주세요.");
    return;
  }

  const existingAnswerIndex = storedAnswers.findIndex(answer => answer.strategy === currentStrategy && answer.index === currentQuestionIndex - 1);
  if (existingAnswerIndex !== -1) {
    storedAnswers[existingAnswerIndex].answer = answer;
  } else {
    storedAnswers.push({ strategy: currentStrategy, answer, index: currentQuestionIndex - 1 });
  }
  const questions = strategies[currentStrategy];
  const currentQuestion = questions[currentQuestionIndex];

  questionCommand = new QuestionCommand(currentQuestion, answer,currentQuestionIndex+1);
  remoteControl.addCommand(questionCommand);

  
 
  localStorage.setItem(currentStrategy, JSON.stringify(storedAnswers));
  PulleDisplaysProblems();
  alert("답변이 저장되었습니다.");
});

function updateQuestionAndAnswer() {
  const questions = strategies[currentStrategy];
  questionContainer.textContent = questions[currentQuestionIndex];

  //로컬스토리지에있으면 댈고오기
  const existingAnswer = storedAnswers.find(answer => answer.strategy === currentStrategy && answer.index === currentQuestionIndex - 1);
  answerInput.value = existingAnswer ? existingAnswer.answer : '';



PulleDisplaysProblems();
 
 

 
 
//   for (const i=1 ; i < questions.length+1; i++) {
//     // 문제를 푼 여부에 따라 스타일 클래스를 추가
    
//     if (problemSolved.has(i)) {
//         questionIndexContainer.classList.add('solved');
//     } else {
//         questionIndexContainer.classList.add('unsolved');
//     }

   
 
// }


  }

function  PulleDisplaysProblems() {
    let problemSolved =remoteControl.getCommand()
    questionIndexContainer.childNodes.forEach((content, idx) => {
        if (problemSolved.has(idx+1)) {
           content.classList.add("solved");
        } else {
           content.classList.remove("solved"); // 다른 경우에는 클래스를 제거할 수 있습니다.
        }
     });
 }


 function CreateSelector(){
    const questions = strategies[currentStrategy];
    console.log(questions.length)
    for (let i=1 ; i < questions.length+1; i++) {
    const questionContainer = document.createElement('div');
    questionContainer.textContent = `문제 ${i }`;
      //클릭시 currentQuestionIndex=i
      questionContainer.addEventListener('click', () => {
       
        currentQuestionIndex = i - 1; // 인덱스는 0부터 시작하므로 1을 
    console.log(currentQuestionIndex)
    updateQuestionAndAnswer()
    });
    // 문제를 화면에 추가
    questionIndexContainer.appendChild(questionContainer);
    }

  
 }

 


clearLocalStorageButton.addEventListener('click', () => {
  if (!currentStrategy) {
    alert("전략을 먼저 선택하세요.");
    return;
  }

  localStorage.removeItem(currentStrategy);
  alert(`${currentStrategy} 전략의 로컬 스토리지가 지워졌습니다.`);

  location.reload()
});

const url = "https://estsoft-openai-api.jejucodingcamp.workers.dev/";
scoringBtn.addEventListener('click', () => {
  remoteControl.executeCommands(url).then(resultMap => {
    console.log(resultMap);
  });
});

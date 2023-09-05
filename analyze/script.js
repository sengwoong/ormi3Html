import { QuestionCommand, RemoteControl } from './CommandScoring.js';

const remoteControl = new RemoteControl();
let questionCommand;

const questionContainer = document.getElementById('question-container');
const answerInput = document.getElementById('question-answer-input');
const backButton = document.getElementById('question-back-btn');
const nextButton = document.getElementById('question-next-btn');
const evaluateButton = document.getElementById('question-evaluate-btn');
let questionIndexContainer = document.getElementById('question-index');

const scoringBtn = document.getElementById('question-scoring-btn');
const clearLocalStorageButton = document.getElementById('question-clear-localstorage-btn');
const questionMain = document.getElementById('question');


const resultsDiv = document.getElementById("results");
const resultsContainer = document.getElementById("results-container");
const resultsBackBtn = document.getElementById("results-back-btn");


let storedAnswers;

const strategies = {
  react: [  "React의 주요 특징 중 하나는 무엇인가요?",
  "React 컴포넌트를 만드는 방법을 간단하게 설명해주세요.",
  "React에서 상태(State)와 속성(Props)의 차이는 무엇인가요?",
  "React Router의 역할은 무엇이며, 어떻게 사용하나요?",
  "React의 생명주기(Lifecycle) 메서드 중 어떤 것들이 있고, 각각 어떤 시점에 호출되나요?",
  "React에서 이벤트 핸들링(Event Handling)을 어떻게 구현하나요?",
  "React Hooks에 대해 간단히 설명해주세요.",
  "React에서 조건부 렌더링(Conditional Rendering)을 어떻게 처리하나요?",
  "React에서 상태 관리 라이브러리 중 하나인 Redux에 대해 설명해주세요.",
  "React에서 컴포넌트 간의 데이터 전달 방법에는 어떤 것들이 있나요?",
  "React의 렌더링 최적화(Optimization)를 위해 어떤 방법들을 사용할 수 있나요?",
  "React에서 테스트(Test)를 어떻게 진행하나요?",
  "React에서 라우팅(Routing)을 구현하기 위한 다른 라이브러리나 기술이 어떤 것들이 있나요?",
  "React Native와 React의 차이점은 무엇인가요?",
  "React에서 Redux 대신 MobX를 사용할 때 어떤 차이가 있을까요?"],
  java: [ "Java의 주요 특징 중 하나는 무엇인가요?",
  "Java 클래스를 만드는 기본 구조를 설명해주세요.",
  "Java에서 변수를 선언하고 초기화하는 방법을 예제와 함께 보여주세요.",
  "Java에서 상속(Inheritance)과 다형성(Polymorphism)의 개념을 설명해주세요.",
  "Java에서 예외(Exception) 처리의 중요성과 try-catch 블록의 역할은 무엇인가요?",
  "Java에서 인터페이스(Interface)와 추상 클래스(Abstract Class)의 차이는 무엇인가요?",
  "Java에서 컬렉션(Collection) 프레임워크를 설명해주세요.",
  "Java에서 스레드(Thread)를 생성하고 다루는 방법을 설명해주세요.",
  "Java에서 파일 입출력(File I/O)을 어떻게 처리하나요?",
  "Java에서 제네릭스(Generics)의 사용법과 장점은 무엇인가요?",
  "Java에서 JDBC(Java Database Connectivity)를 사용하여 데이터베이스와 연동하는 방법을 설명해주세요.",
  "Java에서 자바빈즈(JavaBeans)에 대해 설명해주세요.",
  "Java에서 메모리 관리와 가비지 컬렉션(Garbage Collection)에 대해 설명해주세요.",
  "Java에서 다중 스레드 프로그래밍을 할 때 발생할 수 있는 동기화(Synchronization) 문제에 대해 설명해주세요.",
  "Java 9 이후의 모듈 시스템에 대해 간단히 설명해주세요."],
  javascript: [ "JavaScript의 주요 특징 중 하나는 무엇인가요?",
  "JavaScript 컴포넌트를 만드는 방법을 간단하게 설명해주세요.",
  "자바스크립트와 자바의 주요 차이점은 무엇인가요?",
  "클로저(Closure)가 무엇이며 어떤 상황에서 유용하게 사용되나요?",
  "비동기 프로그래밍에서 Promise와 async/await의 역할을 설명해주세요.",
  "자바스크립트에서 클라이언트 측과 서버 측의 차이를 설명해주세요.",
  "자바스크립트의 호이스팅(Hoisting)이 무엇인가요? 이것이 코드 실행에 어떤 영향을 미칠까요?",
  "자바스크립트에서 객체(Object)와 JSON(JavaScript Object Notation)의 관계는 무엇인가요?",
  "자바스크립트에서 이벤트 버블링(Event Bubbling)과 캡처링(Event Capturing)에 대해 설명해주세요.",
  "자바스크립트에서 클로저(Closure)의 메모리 관리에 대해 어떻게 이해하나요?",
  "자바스크립트에서 RESTful API와 AJAX를 활용하여 데이터를 어떻게 가져올 수 있나요?",
  "자바스크립트에서 ES6의 중요한 기능 중 하나인 화살표 함수(Arrow Functions)에 대해 설명해주세요.",
  "자바스크립트에서 Webpack과 Babel의 역할은 무엇이며 어떻게 사용하나요?",
  "자바스크립트에서 비동기 코드를 효과적으로 관리하기 위한 패턴 중 하나인 Promise 체이닝에 대해 설명해주세요.",
  "자바스크립트에서 모듈 시스템을 사용하는 방법과 이점을 설명해주세요."],
  // 다른 전략에 대한 질문들을 추가할 수 있습니다.
};

let currentStrategy = null;
let currentQuestionIndex = 0;

const selectOption = () => {
  console.log(strategies)
  const strategyKeys = Object.keys(strategies);
  const strategy = prompt(`어떤 전략을 선택하시겠습니까? (${strategyKeys})`);
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
  console.log("currentQuestionIndex+1")
console.log(currentQuestionIndex+1)

console.log(remoteControl.getCommand())
// Set을 배열로 변환합니다.
const commandArray = Array.from(remoteControl.getCommand());

// 같은 문제를 이미 풀었다면 리턴합니다.
if (commandArray.includes(currentQuestionIndex + 1)) {
  console.log("중복뺴기")
    return;
}

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
 
 

 
 



  }

function  PulleDisplaysProblems() {
    let problemSolved =remoteControl.getCommand()
    questionIndexContainer.childNodes.forEach((content, idx) => {
      content.classList.add("clickable-element");
        if (problemSolved.has(idx+1)) {
           content.classList.add("solved");
        } else {
           content.classList.remove("solved"); // 다른 경우에는 클래스를 제거할 수 있습니다.
        }
     });
 }


 function CreateSelector(){
    const questions = strategies[currentStrategy];

    for (let i=1 ; i < questions.length+1; i++) {
    const questionContainer = document.createElement('div');
    questionContainer.textContent = `문제 ${i }`;
      //클릭시 currentQuestionIndex=i
      questionContainer.addEventListener('click', () => {
       
        currentQuestionIndex = i - 1; // 인덱스는 0부터 시작하므로 1을 
   
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

//체점페이지전환
const url = "https://estsoft-openai-api.jejucodingcamp.workers.dev/";




scoringBtn.addEventListener('click', async () => {
  // "로딩중" 메시지를 화면에 표시
  resultsDiv.innerHTML = "로딩중";

  // 화면 요소 표시 설정
  questionMain.style.display = "none";
  resultsContainer.style.display = "block";

  try {
    const resultMap = await remoteControl.executeCommands(url);

    // 결과를 화면에 출력
    resultsDiv.innerHTML = ""; // 기존 결과 초기화

    for (const questionId in resultMap) {
      if (resultMap.hasOwnProperty(questionId)) {
        const question = resultMap[questionId];
        const resultText = `
          질문 ${questionId + 1}'번'\n\n
          문제: ${question.question}\n\n
          답변: ${question.answer}\n\n
          해답: ${question.evaluation}\n\n\n\n\n`;

        // 결과를 각각의 pre 요소로 추가
        const resultElement = document.createElement("pre");
        resultElement.textContent = resultText;
        resultsDiv.appendChild(resultElement);
      }
    }
  } catch (error) {
    console.error("에러 발생:", error);
  }
});





resultsBackBtn.addEventListener('click', async () => {
 
  var resultsDiv = document.getElementById("results");

  
            // 초기화할 내용을 설정합니다.
            var initialContent = "";

            // <div> 요소의 내용을 초기화합니다.
            resultsDiv.innerHTML = "<pre>" + initialContent + "</pre>";

  console.log("로딩중");
  questionMain.style.display = "block";
  resultsContainer.style.display="none"


})


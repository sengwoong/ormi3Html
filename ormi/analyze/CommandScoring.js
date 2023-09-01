class Command {
  async execute(apiEndpoint) {
    // 기본적으로 비어있는 메서드로 정의
  }
}

export class QuestionCommand extends Command {
  constructor(question, answer ,id) {
    super();
    this.question = question;
    this.answer = answer;
    this.id =id 
  }

  async execute(apiEndpoint) {
    const evaluation = await callChatGPTAPI(apiEndpoint, this.question, this.answer);
    return {
      question: this.question,
      answer: this.answer,
      id: this.id,
      evaluation: evaluation
    };
  }
}

export class RemoteControl {

  constructor() {

    this.commands = [];
    
  }

  addCommand(command) {


    this.commands.push(command);
  
  }
getCommand(){
  let commandIds = new Set

  this.commands.forEach((x)=>commandIds.add(x.id));
  
  return commandIds
}
  async executeCommands(apiEndpoint) {
    const results = await Promise.all(
      this.commands.map(async command => {
        return await command.execute(apiEndpoint);
      })
    );

    const resultMap = {};
    results.forEach((result, index) => {
      resultMap[index] = {
        question: result.question,
        answer: result.answer,
        evaluation: result.evaluation,
        id: result.id
      };
    });

    return resultMap;
  }
}

async function callChatGPTAPI(url, question, answer) {
  const requestData = `${question} 의 정답은 ${answer} 인지 정확합니다. 조금 다릅니다. 틀렸습니다. 로 답하고 왜 그렇게 틀렸는지 말씀해주세요.`;

  const data = [
    {
      "role": "system",
      "content": "assistant는 친절한 답변가이다."
    },
    {
      "role": "user",
      "content": requestData
    },
  ];
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    redirect: 'follow'
  })
  .then(res => res.json())
  .then(res => {
    return res.choices[0].message.content;
  });

  return res;
}

// const remoteControl = new RemoteControl();

// const qaPairs = {
//   "사람은동물인가?": "사람도 동물중 하나야",
//   "사람은 여자인가?": "사람은여자만있어",
//   "사람은 죽는가?": "안죽을수도있지",
//   // 추가적인 질문과 대답 쌍을 여기에 추가
// };

// Object.entries(qaPairs).forEach(([question, answer]) => {
//   const questionCommand = new QuestionCommand(question, answer);
//   remoteControl.addCommand(questionCommand);
// });

// const url = "https://estsoft-openai-api.jejucodingcamp.workers.dev/";

// remoteControl.executeCommands(url).then(resultMap => {
//   console.log(resultMap);
// });


 
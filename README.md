# 내가 공부할것은 머지?
자신을 평가하고 어떤것을 공부할지 계획을 세우는 웹 시스템
<br/>
## 1. 목표와 기능
1)내가 어떠한것을 공부해야하는지 자신을평가한다.<br/>
2)계획을 세우고 캘런더에 추가한다.
<br/>
## 2. 기능
1)chat gpt 로 시험을쳐서 내가 생각하는게 맞는지 나의레벨을 측정한다.<br/>
2)계획대로 포스트잇을 올려서 자신이 얼마나했는지 보여준다.
<br/>
## 개발환경 및 배포
개발환경 - Html css js<br/>
배포 - http://sengwoong.github.io/ormi3Html
<br/>
# 3. 프로젝트 구조와 개발 일정
<br/><br/>
```
ㄴanalyze (문제풀이)
ㄴtodo (오늘할일)
  ㄴcrender (캘린더)
ㄴlogin (로그인페이지)
index.html (메인페이지)
```
<br/>
개발일정 - 총5일 소유 (아이디어 1일 개발3.5일 문서화0.5일)<br/>
<img  alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/3ce1165b-c3a4-4db7-9c2e-c710655552e4">
<br/>
# 프로젝트 스크린샷
<br/>
<h2>메인화면</h2>
<br/>
<h3> 페럴러즈스크롤</h3>
<br/>
<img alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/796d4db4-da79-47cf-b763-23273b33cb4a">
<img alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/97cc1d75-0660-49c0-a66d-f0fdd761e821">
![wfwf](https://github.com/sengwoong/ormi3Html/assets/92924243/8556ad28-4b7f-4180-961c-9e03fc4ea7e3)

<br/>
ㄴ스크린샷을 내려서 심슨오프닝 처럼만들어봤습니다.
<br/><br/>
<h3> 동영상컨트롤러 </h3> 
<br/>
<img  alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/7a223843-5b92-4f4f-b331-0240d3688789">
<br/>
ㄴ 옆동네에 다음이미지를 불러서 영상처럼 만들는 강의가있었는데 동영상으로 컨트롤하는것이 더좋다고 생각하여 리팩토링해서 만들어봤습니다 (스크롤인식)
<br/><br/>
<h3> 클릭시 점점커지는버튼 </h3>
<br/>
<img  alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/be50a600-4495-4a74-97e5-86ecba463b62">
화면을 가득채우면 다음페이지로넘어갑니다.
<br/><br/><br/>
## 문제화면<br/>
<img  alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/8735f274-c377-4f91-b213-912a09156617">
<img  alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/4b69bf40-7248-47c6-adf8-51b8fe61076e">
<br/>
ㄴ이떄까지 푼문제를 스토리지저장하고 들어올때 불러오기합니다.<br/>
ㄴ문제저장을 안누르면 체점하지않습니다 문제를 풀었는지 확인하기위해서 푼문제속에있는지확인합니다.
<br/>
<img " alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/4ccdc606-296a-4858-a38e-48f674a295a7">
<br/>
ㄴ문제를 풀었으면 다음과같이 화면이 전환됍니다.
<br/>
<img  alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/7aced9a7-6661-4b8f-a803-375c489cf190">
<br/>
ㄴ로딩화면은 오르미가 손을흔듭니다.<br/>
<img alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/0490a107-23a6-43c4-a60c-5510fa268eeb">
<br/>
ㄴ 간단하게 결과를 보여줍니다.<br/>
<br/><br/><br/>
<h2> 시퀀스다이어그램 </h2>
<h3> 전략패턴</h3>

<h3>  커맨드패턴 </h3>
<br/><br/>
<h2>  오늘할일</h2>
<img  alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/64df114d-506d-4e29-8ce1-e5a39854d7f1">
![asd](https://github.com/sengwoong/ormi3Html/assets/92924243/066396a0-58f4-4309-a26c-3c7e357ed08a)

ㄴ 화면사이즈에따라서 움직이기때문에 멀티로 여러사람이 시시간 공유하며 그리는것이 가능합니다.(벡엔드를 아직 안만들었습니다.)<br/>
<br/>
<img  alt="스크린샷 2023-09-06 오전 7 32 23" src="https://github.com/sengwoong/ormi3Html/assets/92924243/32c5eab6-ed59-4265-9c31-58066c03d5e2">
<br/>
ㄴ요일별로 데이트를저장하기위해서 아래와같이 달력으로 입장합니다.<br/>


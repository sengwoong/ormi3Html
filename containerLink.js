const preloaderBtns = document.querySelectorAll(".preloader__btn");
const preloaderHideThreshold = 18;

function setPreloaderStyle(button, scale, zIndex) {
  button.style.transform = `scale(${scale})`;
  button.style.zIndex = zIndex; // z-index 설정 추가
  button.querySelector(".preloader__btn_hold").style.opacity =
    1 - (scale - 1) / preloaderHideThreshold;
}

preloaderBtns.forEach((preloaderBtn, index) => {
  let intervalId = null;
  let scale = 1;
  let isButtonClicked = false;

  preloaderBtn.addEventListener("mousedown", () => {
    if (!isButtonClicked) {
      isButtonClicked = true;
      intervalId = setInterval(() => {
        scale += 0.175;
        setPreloaderStyle(preloaderBtn, scale, 3); // qhold 버튼은 더 높은 z-index 값을 가짐
        if (scale >= 1 + preloaderHideThreshold) {
          clearInterval(intervalId);

          // 위 버튼일 때는 해당 URL로 이동
          if (preloaderBtn.classList.contains("preloader__btn--top")) {
            window.location.href = `https://sengwoong.github.io/ormi3Html/analyze/index.html`;
          }

          // 아래 버튼일 때는 해당 URL로 이동
          if (preloaderBtn.classList.contains("preloader__btn--bottom")) {
            window.location.href = `https://sengwoong.github.io/ormi3Html/todo/crender/index.html`;
          }
        }
      }, 10);
    }
  });

  preloaderBtn.addEventListener("mouseup", () => {
    if (isButtonClicked) {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        scale -= 0.075;
        if (scale < 1) {
          scale = 1;
        }
        setPreloaderStyle(preloaderBtn, scale, 3); // todo hold 버튼은 더 낮은 z-index 값을 가짐
        if (scale <= 1) {
          clearInterval(intervalId);
          setPreloaderStyle(preloaderBtn, scale, 1);
          isButtonClicked = false;
        }
      }, 10);
    }
  });
});

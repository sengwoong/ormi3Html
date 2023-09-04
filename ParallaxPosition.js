const parallaxElement = document.getElementById('parallax');

export function adjustParallaxPosition() {
  const windowWidth = window.innerWidth;
  const scrollY = window.scrollY;

  // 이동할 거리 계산
  let moveDistance = scrollY * 0.4; // 스크롤 위치에 따라 조절 가능

  // 일정 이동 거리를 제한
  const maxMoveDistance = 120; // 원하는 최대 이동 거리 설정
  if (moveDistance > maxMoveDistance) {
    moveDistance = maxMoveDistance;
  }

  // 아래층 요소들을 이동
  const firstFloorClouds = document.querySelectorAll('.first-floor_cloud1, .first-floor_cloud2, .first-floor_cloud3, .first-floor_cloud4, .first-floor_cloud5, .first-floor_cloud6');
  firstFloorClouds.forEach(cloud => {
    cloud.style.transform = `translateY(${moveDistance}px)`;
  });

  // 중간층 요소들을 이동
  const secondFloorClouds = document.querySelectorAll('.second-floor_cloud1, .second-floor_cloud2, .second-floor_cloud3, .second-floor_cloud4');
  secondFloorClouds.forEach(cloud => {
    cloud.style.transform = `translateY(${moveDistance * 0.5}%)`; // 원하는 이동 비율로 조절 가능
  });


  const textBlocks = document.querySelectorAll('.TheOrmi');
textBlocks.forEach((block, index) => {



  // 블록의 위치와 크기를 설정
  block.style.transform = `translateY(${moveDistance}px)`;
  block.style.fontSize = `${ moveDistance }px`; // 텍스트 크기 조절
});







    // 두 번째 층의 산 요소들을 이동 (왼쪽으로)
  // 두 번째 층의 산 요소들을 이동 (왼쪽으로)
const secondFloorMountains = document.querySelectorAll('.second-floor_mount1,  .third-floor_mount1');

    secondFloorMountains.forEach(mountain => {
      mountain.style.transform = `translateX(-${moveDistance * 0.5}px)`; // 원하는 이동 비율로 조절 가능
    });
  
    // 위층 요소들을 이동 (오른쪽으로)
    const thirdFloorMountains = document.querySelectorAll('.third-floor_mount3, .third-floor_mount4,.second-floor_mount2 , .third-floor_mount2');
    thirdFloorMountains.forEach((mountain, index) => {
   
      mountain.style.transform = `translateX(${moveDistance * 0.5 * (index + 2)}px)`; // 원하는 이동 비율로 조절 가능
    });
  }


// 스크롤 이벤트에 adjustParallaxPosition 함수 연결
window.addEventListener('scroll', adjustParallaxPosition);

// 초기 로드 시도 한 번 호출
adjustParallaxPosition();

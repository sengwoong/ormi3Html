const container = document.getElementById('container');
const addBoxButton = document.getElementById('addBoxBtn');
const deleteBoxButton = document.getElementById('deleteBoxBtn');
const changeColorButton = document.getElementById('changeColorBtn');
let isDragging = false;
let initialX, initialY;
let currentClickedBox = null;

// Load box information from local storage when the page loads
const boxInfoJSON = localStorage.getItem('boxInfo');
let windowJSON = localStorage.getItem('windowInfo');
let savedBoxInfoMap = boxInfoJSON ? JSON.parse(boxInfoJSON) : {};


let savedWidowInfoMap = windowJSON ? JSON.parse(windowJSON) : {};




function updateAndSaveBoxInfo(boxElement) {
  const boxId = boxElement.id;

  const boxInfo = {
    x: boxElement.style.left,
    y: boxElement.style.top,
    color: boxElement.style.backgroundColor,
    content: boxElement.innerText,
    winX:window.screenX,
    winY:window.screenY
  };

  savedBoxInfoMap[boxId] = boxInfo;

  localStorage.setItem('boxInfo', JSON.stringify(savedBoxInfoMap));
}

function createNewBox() {
  const newBox = document.createElement('div');
  const boxId = Date.now().toString(); // Create a unique ID using timestamp
  newBox.id = boxId;
  newBox.classList.add('box');
  newBox.innerText = "Double Click to Edit"; // Initial content
  newBox.addEventListener('dblclick', handleBoxDoubleClick); // Add double click event listener
  container.appendChild(newBox);

  updateAndSaveBoxInfo(newBox);
}

function handleBoxDoubleClick(event) {
  const boxElement = event.target;
  const newContent = prompt('Enter new content:', boxElement.innerText);
  if (newContent !== null) {
    boxElement.innerText = newContent;
    updateAndSaveBoxInfo(boxElement);
  }
}

savedBoxInfoMap = Object.entries(savedBoxInfoMap).reduce((acc, [boxId, boxInfo]) => {
  const newBox = document.createElement('div');
  newBox.id = boxId;
  newBox.classList.add('box');
  newBox.innerText = boxInfo.content;
  newBox.style.left = boxInfo.x;
  newBox.style.top = boxInfo.y;
  newBox.style.backgroundColor = boxInfo.color;
  newBox.addEventListener('dblclick', handleBoxDoubleClick); // Add double click event listener
  container.appendChild(newBox);

  acc[boxId] = boxInfo;
  return acc;
}, {});

container.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('box')) {
    currentClickedBox = event.target;
  }
  isDragging = true;
  currentClickedBox.style.cursor = 'grabbing';
  initialX = event.clientX;
  initialY = event.clientY;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const distanceX = e.clientX - initialX;
  const distanceY = e.clientY - initialY;

  const newTop =   (currentClickedBox.offsetTop + distanceY ) /window.innerHeight*100


  console.log("currentClickedBox.offsetTop ")
  console.log(currentClickedBox.offsetTop+distanceY)
  console.log("window.innerHeight ")
  console.log(window.innerHeight)
  console.log("currentClickedBox.offsetTop + distanceY / window.innerHeight")

  

  const newLeft = (currentClickedBox.offsetLeft + distanceX)/window.innerWidth*100;

  currentClickedBox.style.top = newTop + '%';
  currentClickedBox.style.left = newLeft + '%';
  initialX = e.clientX;
  initialY = e.clientY;
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    if (currentClickedBox) {
      currentClickedBox.style.cursor = 'grab';
      updateAndSaveBoxInfo(currentClickedBox);
    }
  }
});

addBoxButton.addEventListener('click', createNewBox);

deleteBoxButton.addEventListener('click', () => {
  if (currentClickedBox) {
    currentClickedBox.remove();
    currentClickedBox = null;

    const boxId = currentClickedBox.id;
    delete savedBoxInfoMap[boxId];
    localStorage.setItem('boxInfo', JSON.stringify(savedBoxInfoMap));
  }
});

changeColorButton.addEventListener('click', () => {
  if (currentClickedBox) {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    currentClickedBox.style.backgroundColor = randomColor;

    updateAndSaveBoxInfo(currentClickedBox);
  }
});




  

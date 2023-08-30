

const videoElement = document.getElementById('video')
const videoSection = document.getElementById("video-section")
const videoDescription = document.getElementById("video-description")
const fixedWrapper = document.getElementById("fixed-wrapper")
const fixedDescription = document.getElementById("fixed-description")
const videoPlayBack = 500

function centerElement(elementId, video) {
  const element = document.getElementById(elementId);
  const parent = element.parentElement;
  console.log(Array.from(element.children).filter((x)=>{
    console.log(x.idlist) 
  }))
  const descriptionSiblings = Array.from(element.children).filter(child => child !== element && child.classList.contains('video-description')
  

  );
  console.log("descriptionSiblings")
  console.log(descriptionSiblings)


  if (window.scrollY > parent.offsetTop - ((document.documentElement.clientHeight - element.offsetHeight) / 2)) {
    element.style.position = "fixed";
    element.style.top = "50%"
    element.style.left = "50%"
    element.style.transform = "translate(-50%, -50%)"
    descriptionSiblings.forEach((x)=>

        x.style.display="block"
        )

        console.log(descriptionSiblings)
    if (video) video.currentTime = (window.scrollY - videoSection.offsetTop) / videoPlayBack
  } else {
    element.style.position = "relative"
    element.style.top = "initial"
    element.style.left = "initial"
    element.style.transform = "initial"

    descriptionSiblings.forEach((x)=>

    x.style.display="none"
    )

  }
}





videoElement.addEventListener("loadedmetadata", () => {
  document.getElementById("video-section").style.height = videoElement.duration * videoPlayBack + "px";
})

const fixedDescriptionAppearTiming = 3000
const fixedDescriptionAppearEnds = 3800

window.addEventListener("scroll", () => {






  centerElement("fixed-wrapper", videoElement)

  if (window.scrollY > videoSection.offsetTop + videoSection.offsetHeight - (fixedWrapper.offsetHeight + (document.documentElement.clientHeight - fixedWrapper.offsetHeight) / 2)) {
    fixedWrapper.style.position = "relative"
    fixedWrapper.style.top = "initial"
    fixedWrapper.style.left = "initial"
    fixedWrapper.style.transform = `translateY(${videoSection.offsetHeight - fixedWrapper.offsetHeight}px)`
  }

  if (window.scrollY > fixedDescriptionAppearTiming && window.scrollY < fixedDescriptionAppearEnds) {
    fixedDescription.style.transform = `translateY(${fixedDescriptionAppearEnds - window.scrollY}px)`

    fixedDescription.style.opacity = (window.scrollY - fixedDescriptionAppearTiming) / 300
  } else if (window.scrollY > fixedDescriptionAppearEnds) {
    fixedDescription.style.transform = `translateY(0px)`
    fixedDescription.style.opacity = 1
  } else {
    fixedDescription.style.transform = `translateY(100px)`
    fixedDescription.style.opacity = 0
  }


})



adjustYoutubePosition=()=>{
    videoElement.style.height= window.innerWidth/3+'px'
}
window.onload = adjustYoutubePosition;
window.onresize = adjustYoutubePosition;
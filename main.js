// Variables
// Slides and arrows
let slideImg = document.querySelectorAll(".slide");
let arrowLeft = document.querySelector('#arrow-left');
let arrowRight = document.querySelector('#arrow-right');
var slideIdx = 0;
//Slide Animation

// Caption text
var captionTxt = document.querySelector(".caption-holder .caption-txt");
//Caption Animation
var captionAnimation = "slideCaptionUp";
// Dot navigation
var dotCont = document.getElementById("dot-cont");
var dots = [];
// Loop, play and pause
var auto = null;
var playBtn = document.querySelector(".play-pause-btn");
var pauseBtn = document.querySelector(".play-pause-btn.pause");

// Functions
//Returns the Dot Navigation
function dotNav() {
  for (let i = 0; i < slideImg.length; i++) {
    var dot = document.createElement("span");
    dot.classList.add("dots");
    dot.setAttribute("onClick", "moveSlide("+i+")")
    dotCont.append(dot);
    dots.push(dot);
  }
}

//Hides all slide Images
function reset() {
  for (let i = 0; i < slideImg.length; i++) {
    slideImg[i].style.display = "none";
    dots[i].classList.remove("active");
  }
}

//Returns the right slide and caption
function displaySlide() {
  if (auto !== null) {
    pauseSlide();
    autoLoopSlides();
  }
  slideImg[slideIdx].style.display = "block";
  captionTxt.style.display = "none";
  captionTxt.className = "caption-txt " + captionAnimation;
  captionTxt.innerText = slideImg[slideIdx].querySelector(".caption-txt").innerText;
  captionTxt.style.display = "block";
  dots[slideIdx].classList.add("active");
}

//Auto-Loop slides with a set time
function autoLoopSlides() {
  auto = setInterval(toNext, 4000);
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

//Init first slide
function startSlides() {
  dotNav();
  reset();
  displaySlide();
  autoLoopSlides();
}

//For dot navigation, to move to correct slide
function moveSlide(i) {
  reset();
  slideIdx = i;
  captionAnimation = "slideCaptionUp";
  displaySlide();
}

//Play/Pause button
function pauseSlide() {
  clearInterval(auto);
  pauseBtn.style.display = "block";
  playBtn.style.display = "none";
  auto === null;
}

//Move to previous slide when the  left arrow is clicked with mouse
var toPrev = function() {
  reset();
  captionAnimation = "slideCaptionRight";
  if (slideIdx === 0) {
    slideIdx = slideImg.length - 1;
    displaySlide();
  } else {
    slideIdx--;
    displaySlide();
  }
}
arrowLeft.addEventListener("click", toPrev);

//Move to next slide when the right arrow is clicked with mouse
var toNext = function() {
  reset();
  captionAnimation = "slideCaptionLeft";
  if (slideIdx === slideImg.length - 1) {
    slideIdx = 0;
    displaySlide();
  } else {
    slideIdx++;
    displaySlide();
  }
}
arrowRight.addEventListener("click", toNext);

//Slide change when keyboard arrow is pressed
var checkKeyPressed = function(key) {
  switch (key.keyCode) {
    case 37:
      toPrev();
      break;
    case 39:
      toNext();
      break;
  }
}
document.addEventListener("keyup", checkKeyPressed);

//Running functions
startSlides();

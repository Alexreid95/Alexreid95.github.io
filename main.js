// Variables
// Slide Images and arrows
let slideImg = document.querySelectorAll(".slide");
let arrowLeft = document.querySelector('#arrow-left');
let arrowRight = document.querySelector('#arrow-right');
var slideIdx = 0;
// Caption text
var captionTxt = document.querySelector(".caption-holder .caption-txt");
var captionAnimation = "slideCaptionUp";
// Carousel and Slide
var slideTxt = document.querySelector(".text-holder .slide-txt");
var textHolder = document.querySelectorAll(".carousel .text-holder");
var textHolderCurrentAnimation = "slideCurrentLeft";
var textHolderNextAnimation = "slideNextLeft";
var currentTxt, nextTxt;
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

//Preperation for next slide
function reset() {
  currentTxt = textHolder[slideIdx];
  for (let i = 0; i < slideImg.length; i++) {
    slideImg[i].style.display = "none";
    dots[i].classList.remove("active");
    textHolder[i].className = "text-holder";
    textHolder[i].style.opacity = 0;
  }
}

//Displays the right information for slide
function displaySlide() {
  if (auto !== null) {
    pauseSlide();
    autoLoopSlides();
  }
  //Carousel movement
  nextTxt = textHolder[slideIdx];
  currentTxt.classList.add(textHolderCurrentAnimation);
  nextTxt.classList.add(textHolderNextAnimation);
  //Page Image
  slideImg[slideIdx].style.display = "block";
  //Caption text
  captionTxt.style.display = "none";
  captionTxt.className = "caption-txt " + captionAnimation;
  captionTxt.innerText = slideImg[slideIdx].querySelector(".caption-txt").innerText;
  captionTxt.style.display = "block";
  //Slide text and animation
  slideTxt.style.animation = "none";
  slideTxt.innerText = slideImg[slideIdx].querySelector(".slide-txt").innerText;
  slideTxt.style.animation = "";
  //Dot selection
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

//Move to previous slide
var toPrev = function() {
  reset();
  captionAnimation = "slideCaptionRight";
  textHolderCurrentAnimation = "slideCurrentRight";
  textHolderNextAnimation = "slideNextRight";
  (slideIdx === 0) ? slideIdx = slideImg.length - 1:slideIdx--;
  displaySlide();
}
//Move to previous when left arrow is clicked with mouse
arrowLeft.addEventListener("click", toPrev);

//Move to next slide
var toNext = function() {
  reset();
  captionAnimation = "slideCaptionLeft";
  textHolderCurrentAnimation = "slideCurrentLeft";
  textHolderNextAnimation = "slideNextLeft";
  (slideIdx === slideImg.length - 1) ? slideIdx = 0:slideIdx++;
  displaySlide();
}
//Move to Next when right arrow is clicked with mouse
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

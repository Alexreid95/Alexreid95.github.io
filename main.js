// Variables
let slideImg = document.querySelectorAll(".slide");
let arrowLeft = document.querySelector('#arrow-left');
let arrowRight = document.querySelector('#arrow-right');
let slideIdx = 0;
var captionTxt = document.querySelector(".caption-holder .caption-txt");
var dotCont = document.getElementById("dot-cont");
var dots = [];

//Hides all slide Images
function reset() {
  for (let i = 0; i < slideImg.length; i++) {
    slideImg[i].style.display = "none";
  }
}

//Returns the right slide and caption
function displaySlide() {
  slideImg[slideIdx].style.display = "block";
  captionTxt.innerText = slideImg[slideIdx].querySelector(".caption-txt").innerText;
}

//Returns the Dot Navigation
function dotNav() {
  for (let i = 0; i < slideImg.length; i++) {
    var dot = document.createElement("span");
    dot.classList.add("dots");
    dotCont.append(dot);
    dots.push(dot);
  }
}

//Init first slide
function startSlides() {
  reset();
  displaySlide();
  dotNav();
}

//Move to previous slide when the  left arrow is clicked with mouse
var toPrev = function() {
  reset();
  if (slideIdx === 0) {
    slideIdx = slideImg.length - 1;
    displaySlide()
  } else {
    slideIdx--;
    displaySlide()
  }
}
arrowLeft.addEventListener("click", toPrev);

//Move to next slide when the right arrow is clicked with mouse
var toNext = function() {
  reset();
  if (slideIdx === slideImg.length - 1) {
    slideIdx = 0;
    displaySlide()
  } else {
    slideIdx++;
    displaySlide()
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

// Variables
let slideImg = document.querySelectorAll(".slide");
let arrowLeft = document.querySelector('#arrow-left');
let arrowRight = document.querySelector('#arrow-right');
let slideIdx = 0;

//Hides all slide Images
function reset() {
  for (let i = 0; i < slideImg.length; i++) {
    slideImg[i].style.display = "none";
  }
}

//Init first slide
function startSlides() {
  reset();
  slideImg[0].style.display = "block";
}

//Move to previous slide
var toPrev = function() {
  reset();
  if (slideIdx === 0) {
    slideIdx = slideImg.length - 1;
    slideImg[slideIdx].style.display = "block";
  } else {
    slideIdx--;
    slideImg[slideIdx].style.display = "block"
  }
}

//Move to next slide
var toNext = function() {
  reset();
  if (slideIdx === slideImg.length - 1) {
    slideIdx = 0;
    slideImg[slideIdx].style.display = "block";
  } else {
    slideIdx++;
    slideImg[slideIdx].style.display = "block"
  }
}

//Slide change when the arrow is clicked with mouse
arrowLeft.addEventListener("click", toPrev);
arrowRight.addEventListener("click", toNext);

//Check keyboard arrow pressed
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

//Slide change when keyboard arrow is pressed
document.addEventListener("keyup", checkKeyPressed);

//Running functions
startSlides();

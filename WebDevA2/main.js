// PAGE NAVIGATION
var page1btn = document.querySelector("#page1btn");
var page2btn = document.querySelector("#page2btn");
var page3btn = document.querySelector("#page3btn");
var page4btn = document.querySelector("#page4btn");
var page5btn = document.querySelector("#page5btn");
var allpages = document.querySelectorAll(".page");

var menuItemsList = document.querySelector("ul");
var hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);

// const correctAnswer = new Audio("audio/correctAnswer.mp3");
// const flipcard = new Audio("audio/flipcard.mp3");
// const newFact = new Audio("audio/newFact.mp3");
// const paintbrush = new Audio("audio/paintbrush.mp3");
// const wrongAnswer = new Audio("audio/wrongAnswer.mp3");


function hideall() {
  for (var i = 0; i < allpages.length; i++) {
    allpages[i].style.display = "none";
  }
}

function show(pgno) {
  hideall();
  var onepage = document.querySelector("#page" + pgno);
  if (onepage) { // Add error checking
    onepage.style.display = "block";
  }
}

page1btn.addEventListener("click", function () { show(1); });
page2btn.addEventListener("click", function () { show(2); });
page3btn.addEventListener("click", function () { show(3); });
page4btn.addEventListener("click", function () { show(4); });
page5btn.addEventListener("click", function () { show(5); });

// Show page 1 by default
show(1);

function toggleMenus() {
  menuItemsList.classList.toggle("menuShow");
  if (menuItemsList.classList.contains("menuShow")) {
    hamBtn.innerHTML = "✕ Close Menu";
  } else {
    hamBtn.innerHTML = "☰ Menu";
  }
}

// SECONDARY COLOR MIXING SETUP
var images = document.querySelectorAll(".palette-grid img");
var resultBox = document.getElementById("secondaryColorBox");
var resultText = document.getElementById("mix-result");
var resetButton = document.getElementById("resetBtn");
var selected = [];

var mixMap = {
  "red,blue": "purple",
  "blue,red": "purple",
  "blue,yellow": "green",
  "yellow,blue": "green",
  "red,yellow": "orange",
  "yellow,red": "orange"
};

var styleMap = {
  red: { bg: "#ffcccc", border: "#cc0000", text: "#660000" },
  blue: { bg: "#cce5ff", border: "#0055cc", text: "#002244" },
  yellow: { bg: "#fff9cc", border: "#e6c300", text: "#665500" },
  green: { bg: "#ccffcc", border: "#33aa33", text: "#004400" },
  orange: { bg: "#ffe0cc", border: "#ff6600", text: "#663300" },
  purple: { bg: "#e0ccff", border: "#6600cc", text: "#330066" },
  unknown: { bg: "#dddddd", border: "#888888", text: "#333333" }
};

function applyStyle(colorKey) {
  var style = styleMap[colorKey] || styleMap.unknown;
  if (resultBox) { // Add error checking
    resultBox.style.backgroundColor = style.bg;
    resultBox.style.borderColor = style.border;
    resultBox.style.color = style.text;
  }
}

function handleImageClick() {
  var color = this.getAttribute("data-color");

  if (selected.length < 2 && selected.indexOf(color) === -1) {
    selected.push(color);
    this.classList.add("selected");
   new Audio("audio/paintbrush.mp3").play();

  }

  if (selected.length === 1) {
    applyStyle(selected[0]); 
    if (resultText) resultText.textContent = "You selected " + selected[0];
  } else if (selected.length === 2) {
    var key = selected[0] + "," + selected[1];
    var mixed = mixMap[key] || "unknown";
    applyStyle(mixed);

    if (resultText) {
      if (mixed === "unknown") {
        resultText.textContent = "These don't mix well..";
      } else {
        resultText.textContent = selected[0] + " + " + selected[1] + " = " + mixed;
      }
    }
  }
}

// error checking for images
if (images.length > 0) {
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", handleImageClick);
  }
}

if (resetButton) {
  resetButton.addEventListener("click", function () {
    selected = [];
    if (resultBox) {
      resultBox.style.backgroundColor = "";
      resultBox.style.borderColor = "";
      resultBox.style.color = "";
    }
    if (resultText) resultText.textContent = "Select two colors to mix!";
    for (var j = 0; j < images.length; j++) {
      images[j].classList.remove("selected");
    }
  });
}

// TERTIARY COLOR SLIDER 
var slider = document.querySelector(".tertiary-slider");
var colorName = document.querySelector(".color-name");
var colorPreview = document.querySelector(".color-preview");

var tertiaryColors = [
  { name: "Red-Orange", color: "#ff4500" },
  { name: "Yellow-Orange", color: "#ff8c00" },
  { name: "Yellow-Green", color: "#9acd32" },
  { name: "Blue-Green", color: "#00ced1" },
  { name: "Blue-Violet", color: "#6a5acd" },
  { name: "Red-Violet", color: "#c71585" }
];

if (slider && colorName && colorPreview) {
  slider.addEventListener("input", function () {
    var index = parseInt(slider.value, 10);
    if (tertiaryColors[index]) {
      colorName.textContent = tertiaryColors[index].name;
      colorPreview.style.backgroundColor = tertiaryColors[index].color;
    }
  });
  
  // Initialize the first color
  if (tertiaryColors[0]) {
    colorName.textContent = tertiaryColors[0].name;
    colorPreview.style.backgroundColor = tertiaryColors[0].color;
  }
}

// CARD FLIPPING WITH TIMED UNFLIP
var cardContainer = document.querySelector(".complementary-cards");

if (cardContainer) {
  cardContainer.addEventListener("click", function (e) {
    var card = e.target.closest(".color-card");

    if (!card || card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    new Audio("audio/flipcard.mp3").play();


    setTimeout(function () {
      card.classList.remove("flipped");
      new Audio("audio/flipcard.mp3").play();
    }, 2000);
    
  });
}

// ANALOGOUS COLORS SLIDER
var harmonySlider = document.getElementById('harmonySlider');
var harmonyDisplay = document.getElementById('harmonyDisplay');
var harmonyName = document.getElementById('harmonyName');
var harmonyMood = document.getElementById('harmonyMood');

var harmonies = [
  {
    name: 'Red → Orange → Yellow',
    mood: 'Energetic and vibrant - creates excitement',
    gradient: 'linear-gradient(90deg, #ff6b6b, #ff8e53, #feca57)',
    displayText: 'Warm Harmony'
  },
  {
    name: 'Orange → Yellow → Green',
    mood: 'Cheerful and natural - brings warmth',
    gradient: 'linear-gradient(90deg, #ff8e53, #feca57, #7bed9f)',
    displayText: 'Sunset Harmony'
  },
  {
    name: 'Yellow → Green → Blue',
    mood: 'Fresh and balanced - evokes growth',
    gradient: 'linear-gradient(90deg, #feca57, #7bed9f, #70a1ff)',
    displayText: 'Nature Harmony'
  },
  {
    name: 'Green → Blue → Purple',
    mood: 'Calming and peaceful - inspires tranquility',
    gradient: 'linear-gradient(90deg, #7bed9f, #70a1ff, #a55eea)',
    displayText: 'Cool Harmony'
  },
  {
    name: 'Blue → Purple → Red',
    mood: 'Mysterious and dramatic - creates depth',
    gradient: 'linear-gradient(90deg, #5352ed, #a55eea, #ff6b6b)',
    displayText: 'Deep Harmony'
  }
];

function updateHarmonyDisplay(index) {
  var harmony = harmonies[index];
  
  if (!harmony) return;
  
  if (harmonyDisplay) {
    harmonyDisplay.style.background = harmony.gradient;
    harmonyDisplay.textContent = harmony.displayText;
  }
  
  if (harmonyName) {
    harmonyName.textContent = harmony.name;
  }
  
  if (harmonyMood) {
    harmonyMood.textContent = harmony.mood;
  }

  if (harmonyDisplay) {
    harmonyDisplay.style.transform = 'scale(1.02)';
    setTimeout(function() {
      harmonyDisplay.style.transform = 'scale(1)';
    }, 200);
  }
}

if (harmonySlider) {
  harmonySlider.addEventListener('input', function(event) {
    var value = parseInt(event.target.value);
    updateHarmonyDisplay(value);
  });
  
  // Initialize with first harmony
  updateHarmonyDisplay(0);
}

// MUSCLE ANIMATION
var figure = document.getElementById("figure");
var statusText = document.getElementById("statusText");
var currentFlexed = "";

function updateFlex(muscle) {
  if (!figure) return; // Add error checking
  
  figure.classList.remove("flexing-deltoids", "flexing-pectorals", "flexing-biceps", "flexing-quadriceps");

  if (currentFlexed === muscle) {
    currentFlexed = "";
    if (statusText) statusText.textContent = "😌 All muscles relaxed. Click a muscle group to flex it!";
  } else {
    currentFlexed = muscle;
    figure.classList.add("flexing-" + muscle);
    if (statusText) statusText.textContent = formatMuscleName(muscle) + " flexing!";
  }
}

function formatMuscleName(muscle) {
  switch (muscle) {
    case "deltoids": return "💪 Deltoids";
    case "pectorals": return "💙 Pectorals";
    case "biceps": return "🧡 Biceps";
    case "quadriceps": return "💚 Quadriceps";
    default: return muscle;
  }
}

// Add error checking for muscle labels
var deltoidLabel = document.querySelector(".label.deltoids");
var pectoralLabel = document.querySelector(".label.pectorals");
var bicepLabel = document.querySelector(".label.biceps");
var quadricepLabel = document.querySelector(".label.quadriceps");

if (deltoidLabel) {
  deltoidLabel.addEventListener("click", function() { updateFlex("deltoids"); });
}
if (pectoralLabel) {
  pectoralLabel.addEventListener("click", function() { updateFlex("pectorals"); });
}
if (bicepLabel) {
  bicepLabel.addEventListener("click", function() { updateFlex("biceps"); });
}
if (quadricepLabel) {
  quadricepLabel.addEventListener("click", function() { updateFlex("quadriceps"); });
}

if (statusText) {
  statusText.textContent = "😌 All muscles relaxed. Click a muscle group to flex it!";
}

// PROPORTIONS BUILDER
var head = document.getElementById('builderHead');
var torso = document.getElementById('builderTorso');
var legLeft = document.getElementById('builderLegLeft');
var legRight = document.getElementById('builderLegRight');

var headSlider = document.getElementById('headSlider');
var torsoSlider = document.getElementById('torsoSlider');
var legSlider = document.getElementById('legSlider');

var headValue = document.getElementById('headValue');
var torsoValue = document.getElementById('torsoValue');
var legValue = document.getElementById('legValue');

var proportionRatio = document.getElementById('proportionRatio');
var proportionDesc = document.getElementById('proportionDesc');
var resetProportionsButton = document.getElementById('resetButton');

var baseHeadHeight = 30;

function updateFigure() {
  if (!headSlider || !torsoSlider || !legSlider) return; // Error checking
  
  var headScale = parseFloat(headSlider.value);
  var torsoScale = parseFloat(torsoSlider.value);
  var legScale = parseFloat(legSlider.value);

  var newHeadSize = baseHeadHeight * headScale;
  var newTorsoHeight = 60 * torsoScale;
  var newLegHeight = 70 * legScale;

  if (head) {
    head.style.width = newHeadSize + 'px';
    head.style.height = newHeadSize + 'px';
  }

  if (torso) {
    torso.style.height = newTorsoHeight + 'px';
  }

  if (legLeft && legRight) {
    legLeft.style.height = newLegHeight + 'px';
    legRight.style.height = newLegHeight + 'px';
  }

  if (headValue) headValue.textContent = headScale.toFixed(1) + 'x';
  if (torsoValue) torsoValue.textContent = torsoScale.toFixed(1) + 'x';
  if (legValue) legValue.textContent = legScale.toFixed(1) + 'x';

  updateProportions(headScale, torsoScale, legScale);
}

function updateProportions(headS, torsoS, legS) {
  var total = (30 * headS) + 8 + (60 * torsoS) + 15 + (70 * legS);
  var headsTall = total / (30 * headS);

  if (proportionRatio) {
    proportionRatio.textContent = headsTall.toFixed(1) + ' heads tall';
  }

  var description = "";
  if (headsTall < 6) {
    description = "Very stylized - cartoon or chibi style";
  } else if (headsTall < 7) {
    description = "Stylized proportions - animation style";
  } else if (headsTall <= 8) {
    description = "Standard adult proportions - realistic and balanced";
  } else if (headsTall <= 9) {
    description = "Heroic proportions - idealized superhero style";
  } else {
    description = "Very elongated - extreme stylization";
  }
  
  if (proportionDesc) {
    proportionDesc.textContent = description;
  }
}

function resetProportions() {
  if (headSlider) headSlider.value = 1;
  if (torsoSlider) torsoSlider.value = 1;
  if (legSlider) legSlider.value = 1;
  updateFigure();
}

// Add event listeners with error checking
if (headSlider) headSlider.addEventListener('input', updateFigure);
if (torsoSlider) torsoSlider.addEventListener('input', updateFigure);
if (legSlider) legSlider.addEventListener('input', updateFigure);
if (resetProportionsButton) resetProportionsButton.addEventListener('click', resetProportions);

// Initialize the figure
updateFigure();




// Rule of Thirds Demo

// This function checks if the subject is near any intersection point of the "rule of thirds" grid
function checkRuleOfThirds(x, y, w, h) {
  // Calculate vertical and horizontal "thirds" positions
  var thirdsX1 = w / 3;
  var thirdsX2 = (2 * w) / 3;
  var thirdsY1 = h / 3;
  var thirdsY2 = (2 * h) / 3;

  var tolerance = 20; // How close the subject must be to count as "near" an intersection

  // Helper function to check if a number is within a certain range of a target
  function near(val, target) {
    return Math.abs(val - target) < tolerance;
  }

  // Check if the subject is near any of the 4 rule-of-thirds intersection points
  var isNearIntersection =
    (near(x, thirdsX1) || near(x, thirdsX2)) &&
    (near(y, thirdsY1) || near(y, thirdsY2));

  // Show feedback depending on if the subject is placed correctly
  if (isNearIntersection) {
    feedback.textContent = "Perfect! Strong composition using rule of thirds!";
    feedback.style.color = "#27ae60";
  } else {
    feedback.textContent = "Try moving closer to a grid intersection";
    feedback.style.color = "#b94f27"; 
  }
}

// Variables for drag behavior and DOM elements
var dragging = false;
var subject = document.getElementById('subject');
var grid = document.getElementById('gridDemo');
var feedback = document.getElementById('gridFeedback');

if (subject && grid && feedback) {
  // Start dragging when mouse is pressed on subject
  subject.addEventListener('mousedown', function () {
    dragging = true;
  });

  // Stop dragging when mouse is released
  document.addEventListener('mouseup', function () {
    dragging = false;
  });

  // While dragging, update the subject's position
  document.addEventListener('mousemove', function (e) {
    if (!dragging) return; // Exit if not dragging

    // Get position of the grid container
    var rect = grid.getBoundingClientRect();

    // Calculate new position relative to the grid, minus half of the subject size (15px)
    var offsetX = e.clientX - rect.left - 15;
    var offsetY = e.clientY - rect.top - 15;

    // Keep subject inside the grid box (no overflow)
    var x = Math.max(0, Math.min(offsetX, rect.width - 30));
    var y = Math.max(0, Math.min(offsetY, rect.height - 30));

    // Move the subject visually using CSS left/top
    subject.style.left = x + 'px';
    subject.style.top = y + 'px';

    // Check whether the new position follows the rule of thirds
    checkRuleOfThirds(x, y, rect.width, rect.height);
  });

  // Show default feedback before user interacts
  checkRuleOfThirds(50, 50, 300, 200);
}


// Leading Lines

document.getElementById('btnConverging').addEventListener('click', function() {
  setLinePattern('converging');
});

document.getElementById('btnParallel').addEventListener('click', function() {
  setLinePattern('parallel');
});

document.getElementById('btnVertical').addEventListener('click', function() {
  setLinePattern('vertical');
});

document.getElementById('btnCurved').addEventListener('click', function() {
  setLinePattern('curved');
});

function setLinePattern(pattern) {
  const line1 = document.getElementById('leadingLine1'); 
  const line2 = document.getElementById('leadingLine2');  
  const focalPoint = document.getElementById('focalPoint');
  
  if (!line1 || !line2 || !focalPoint) return;
  
  // Reset classes
  line1.className = 'line-element';
  line2.className = 'line-element';
  
  switch(pattern) {
    case 'converging':
      line1.className += ' diagonal-one';
      line2.className += ' diagonal-two';
      focalPoint.style.right = '100px';
      focalPoint.style.top = '120px';
      break;
    case 'parallel':
      line1.className += ' horizontal-one';
      line2.className += ' horizontal-two';
      focalPoint.style.right = '130px';
      focalPoint.style.top = '80px';
      break;
    case 'vertical':
      line1.className += ' vertical-one';
      line2.className += ' vertical-two';
      focalPoint.style.right = '135px';
      focalPoint.style.top = '80px';
      break;
    case 'curved':
      line1.className += ' curved-one';
      line2.className += ' curved-two';
      focalPoint.style.right = '130px';
      focalPoint.style.top = '120px';
      break;
  }
}

// Initialize with converging lines
if (document.getElementById('leadingLine1')) {  // Changed
  setLinePattern('converging');
}


// Visual Balance Demo

document.getElementById('btnSymmetrical').addEventListener('click', function() {
  showBalance('symmetrical');
});

document.getElementById('btnAsymmetrical').addEventListener('click', function() {
  showBalance('asymmetrical');
});

document.getElementById('btnUnbalanced').addEventListener('click', function() {
  showBalance('unbalanced');
});

document.getElementById('btnReset').addEventListener('click', function() {
  showBalance('reset');
});


function showBalance(type) {
  const element1 = document.getElementById('element1');
  const element2 = document.getElementById('element2');
  const element3 = document.getElementById('element3');
  const feedback = document.getElementById('balanceFeedback');
  
  if (!element1 || !element2 || !element3 || !feedback) return;
  
  switch(type) {
    case 'symmetrical':
      element1.style.left = '60px';
      element1.style.top = '70px';
      element2.style.left = '200px';
      element2.style.top = '70px';
      element3.style.left = '140px';
      element3.style.top = '100px';
      feedback.textContent = "Symmetrical: Formal and stable composition";
      feedback.style.color = "#27ae60";
      break;
      
    case 'asymmetrical':
      element1.style.left = '40px';
      element1.style.top = '60px';
      element2.style.left = '180px';
      element2.style.top = '40px';
      element3.style.left = '220px';
      element3.style.top = '120px';
      feedback.textContent = "Asymmetrical: Dynamic but balanced composition";
      feedback.style.color = "#3498db";
      break;
      
    case 'unbalanced':
      element1.style.left = '30px';
      element1.style.top = '40px';
      element2.style.left = '60px';
      element2.style.top = '120px';
      element3.style.left = '40px';
      element3.style.top = '90px';
      feedback.textContent = "Unbalanced: Feels heavy on one side";
      feedback.style.color = "#e74c3c";
      break;
      
    case 'reset':
      element1.style.left = '50px';
      element1.style.top = '70px';
      element2.style.left = '200px';
      element2.style.top = '80px';
      element3.style.left = '135px';
      element3.style.top = '40px';
      feedback.textContent = "Click a button to explore balance!";
      feedback.style.color = "#b94f27";
      break;
  }
}

if (document.getElementById('element1')) {
  showBalance('reset');
}



// Focal Point Demo 

document.getElementById('btnContrast').addEventListener('click', function() {
  setFocalTechnique('contrast');
});

document.getElementById('btnSize').addEventListener('click', function() {
  setFocalTechnique('size');
});

document.getElementById('btnIsolation').addEventListener('click', function() {
  setFocalTechnique('isolation');
});

document.getElementById('btnLines').addEventListener('click', function() {
  setFocalTechnique('lines');
});

document.getElementById('btnFocalReset').addEventListener('click', function() {
  setFocalTechnique('reset');
});

function setFocalTechnique(technique) {
  var focalSubject = document.getElementById('focalSubject');
  var bgElements = document.querySelectorAll('.bg-element');
  var line1 = document.getElementById('line1');
  var line2 = document.getElementById('line2');
  var feedback = document.getElementById('focalFeedback');
  
  if (!focalSubject || !feedback) return;
  
  // Reset all styles
  for (var i = 0; i < bgElements.length; i++) {
    bgElements[i].style.backgroundColor = '#ddd';
    bgElements[i].style.transform = 'scale(1)';
    bgElements[i].style.opacity = '1';
  }
  
  focalSubject.style.transform = 'scale(1)';
  focalSubject.style.backgroundColor = '#ff6b6b';
  focalSubject.style.boxShadow = 'none';
  line1.style.opacity = '0';
  line2.style.opacity = '0';
  
  switch(technique) {
    case 'contrast':
      focalSubject.style.backgroundColor = '#ff1744';
      focalSubject.style.boxShadow = '0 0 20px rgba(255, 23, 68, 0.6)';
      for (var j = 0; j < bgElements.length; j++) {
        bgElements[j].style.backgroundColor = '#f0f0f0';
      }
      feedback.textContent = "Color Contrast: Bright focal point stands out against muted background";
      feedback.style.color = "#e91e63";
      break;
      
    case 'size':
      focalSubject.style.transform = 'scale(1.8)';
      focalSubject.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.5)';
      feedback.textContent = "Size Contrast: Larger element draws attention immediately";
      feedback.style.color = "#2196f3";
      break;
      
    case 'isolation':
      bgElements[1].style.opacity = '0';
      bgElements[2].style.opacity = '0';
      bgElements[0].style.transform = 'translateX(-20px)';
      bgElements[3].style.transform = 'translateX(20px)';
      bgElements[4].style.transform = 'translateY(30px)';
      focalSubject.style.boxShadow = '0 0 25px rgba(255, 107, 107, 0.4)';
      feedback.textContent = "Isolation: Empty space around subject creates focus";
      feedback.style.color = "#9c27b0";
      break;
      
    case 'lines':
      line1.style.opacity = '1';
      line2.style.opacity = '1';
      focalSubject.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.6)';
      feedback.textContent = "Leading Lines: Lines guide the eye to the focal point";
      feedback.style.color = "#ff9800";
      break;
      
    case 'reset':
      feedback.textContent = "Click a technique to see how focal points work!";
      feedback.style.color = "#b94f27";
      break;
  }
}

if (document.getElementById('focalSubject')) {
  setFocalTechnique('reset');
}



// Quiz Data
var quizQuestions = [
  {
    question: "Which colors cannot be made by mixing other colors?",
    answers: ["Primary colors", "Secondary colors", "Tertiary colors", "Complementary colors"],
    correct: 0
  },
  {
    question: "What color do you get when you mix red and yellow?",
    answers: ["Purple", "Green", "Orange", "Brown"],
    correct: 2
  },
  {
    question: "How many heads tall is the average adult figure in classical proportions?",
    answers: ["5-6 heads", "7-8 heads", "9-10 heads", "3-4 heads"],
    correct: 1
  },
  {
    question: "Which perspective technique uses a single vanishing point?",
    answers: ["2-point perspective", "3-point perspective", "1-point perspective", "Atmospheric perspective"],
    correct: 2
  },
  {
    question: "What does the rule of thirds help artists achieve?",
    answers: ["Better color mixing", "Dynamic compositions", "Accurate proportions", "Realistic shading"],
    correct: 1
  },
  {
    question: "Which muscle group is located in the shoulders?",
    answers: ["Quadriceps", "Pectorals", "Biceps", "Deltoids"],
    correct: 3
  },
  {
    question: "What type of balance uses equal weight on both sides?",
    answers: ["Asymmetrical balance", "Symmetrical balance", "Dynamic balance", "Visual balance"],
    correct: 1
  },
  {
    question: "Which colors are directly opposite each other on the color wheel?",
    answers: ["Analogous colors", "Primary colors", "Complementary colors", "Tertiary colors"],
    correct: 2
  }
];





// Quiz Section

var currentQuestion = 0;     // Index of the current question
var score = 0;               // User's score
var selectedAnswer = -1;     // Track selected answer index
var quizStarted = false;     // Whether the quiz has started

var quizBtn = document.getElementById('quiz-btn');
var quizContainer = document.getElementById('quizContainer');
var questionCounter = document.getElementById('questionCounter');
var scoreDisplay = document.getElementById('scoreDisplay');
var questionText = document.getElementById('questionText');
var answersContainer = document.getElementById('answersContainer');
var nextBtn = document.getElementById('nextBtn');
var quizResults = document.getElementById('quizResults');
var finalScore = document.getElementById('finalScore');
var scoreMessage = document.getElementById('scoreMessage');
var restartBtn = document.getElementById('restartBtn');

// Attach event listeners to buttons
if (quizBtn) {
  quizBtn.addEventListener('click', startQuiz);
}
if (nextBtn) {
  nextBtn.addEventListener('click', nextQuestion);
}
if (restartBtn) {
  restartBtn.addEventListener('click', restartQuiz);
}

// Start the quiz: hide button, reset state, show first question
function startQuiz() {
  quizStarted = true;
  currentQuestion = 0;
  score = 0;
  
  if (quizBtn) quizBtn.style.display = 'none';
  if (quizContainer) quizContainer.style.display = 'block';
  if (quizResults) quizResults.style.display = 'none';
  
  showQuestion();
}

// Show a question and create answer buttons dynamically
function showQuestion() {
  if (currentQuestion >= quizQuestions.length) {
    showResults(); // If no more questions, end the quiz
    return;
  }
  
  var question = quizQuestions[currentQuestion];
  selectedAnswer = -1; // Reset selected answer

  // Update question tracker and score
  if (questionCounter) {
    questionCounter.textContent = 'Question ' + (currentQuestion + 1) + ' of ' + quizQuestions.length;
  }
  if (scoreDisplay) {
    scoreDisplay.textContent = 'Score: ' + score + '/' + currentQuestion;
  }

  // Display question text
  if (questionText) {
    questionText.textContent = question.question;
  }

  // Generate answer buttons
  if (answersContainer) {
    answersContainer.innerHTML = '';
    
    for (var i = 0; i < question.answers.length; i++) {
      var answerDiv = document.createElement('div');
      answerDiv.className = 'answer-option';
      answerDiv.textContent = question.answers[i];
      answerDiv.setAttribute('data-index', i);
      answerDiv.onclick = handleAnswerClick; 
      
      answersContainer.appendChild(answerDiv);
    }
  }

  // Hide next button until an answer is chosen
  if (nextBtn) nextBtn.style.display = 'none';
}

// Handles answer selection from the user
function handleAnswerClick() {
  var answerIndex = parseInt(this.getAttribute('data-index'));
  selectAnswer(answerIndex);
}

//  logic to select and validate an answer
function selectAnswer(answerIndex) {
  selectedAnswer = answerIndex;
  var question = quizQuestions[currentQuestion];
  var answerOptions = document.querySelectorAll('.answer-option');

  // Clear previous styles (selected, correct, incorrect)
  for (var i = 0; i < answerOptions.length; i++) {
    answerOptions[i].classList.remove('selected', 'correct', 'incorrect');
  }

  // Highlight correct and incorrect choices
  for (var j = 0; j < answerOptions.length; j++) {
    if (j === question.correct) {
      answerOptions[j].classList.add('correct');
    } else if (j === answerIndex && j !== question.correct) {
      answerOptions[j].classList.add('incorrect');
     new Audio("audio/wrongAnswer.mp3").play();

    }
  }

  // Update score if correct
  if (answerIndex === question.correct) {
    score++;
    new Audio("audio/correctAnswer.mp3").play();

  }

  // Reveal the next button
  if (nextBtn) nextBtn.style.display = 'inline-block';
}

// Advance to the next question
function nextQuestion() {
  currentQuestion++;
  showQuestion();
}

// Show final results at end of quiz
function showResults() {
  var questionCard = document.getElementById('questionCard');
  if (questionCard) questionCard.style.display = 'none';
  if (quizResults) quizResults.style.display = 'block';

  // Show score
  if (finalScore) {
    finalScore.textContent = 'Your Score: ' + score + '/' + quizQuestions.length;
  }

  // Give performance message
  var percentage = (score / quizQuestions.length) * 100;
  var message = '';

  if (percentage >= 90) {
    message = 'Excellent! You really know your art fundamentals!';
  } else if (percentage >= 70) {
    message = 'Great job! You have a solid understanding of the basics.';
  } else if (percentage >= 50) {
    message = 'Good effort! You might want to review some sections.';
  } else {
    message = 'Keep studying! Try going through the lessons again.';
  }

  if (scoreMessage) {
    scoreMessage.textContent = message;
  }
}

// Restart the quiz from the beginning
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = -1;

  var questionCard = document.getElementById('questionCard');
  if (questionCard) questionCard.style.display = 'block';
  if (quizResults) quizResults.style.display = 'none';

  showQuestion();
}



// Fun Fact Section

// Fun Facts Array
var artFacts = [
  {
    fact: "The color wheel was invented by Sir Isaac Newton in 1666! He discovered that white light could be split into different colors using a prism, leading to our modern understanding of color theory."
  },
  {
    fact: "The golden ratio (1:1.618) appears throughout art and nature! Artists like Leonardo da Vinci used it to create pleasing compositions in masterpieces like the Mona Lisa."
  },
  {
    fact: "Linear perspective was perfected during the Renaissance around 1415. Before this, most paintings looked flat because artists didn't understand how to show depth!"
  },
  {
    fact: "Artists study anatomy so much that many can draw accurate human figures from memory! Leonardo da Vinci dissected over 30 human corpses to understand muscle structure."
  },
  {
    fact: "The rule of thirds was first written about in 1797, but artists had been using it intuitively for centuries! It's based on how our eyes naturally scan images."
  },
  {
    fact: "Red can actually make people feel warmer and increase their appetite - that's why many restaurants use red in their decor! Blue has the opposite effect and can suppress appetite."
  },
  {
    fact: "The 8-heads-tall rule for figure drawing was established by ancient Greek sculptors! They believed this created the most aesthetically pleasing human form."
  },
  {

    fact: "When you stare at a red object for 30 seconds then look at a white wall, you'll see a green afterimage! This happens because your eyes get tired of red and create its complement."
  }
];

var currentFactIndex = 0;

// Fun Facts Event Listener
var factBtn = document.getElementById('factBtn');
var factContent = document.getElementById('factContent');

if (factBtn && factContent) {
  factBtn.addEventListener('click', showNewFact);
}

function showNewFact() {
  currentFactIndex = (currentFactIndex + 1) % artFacts.length;
  var fact = artFacts[currentFactIndex];
  
  if (factContent) {
    factContent.innerHTML =  // Value is from user while inenrHTML has content that has already been generated
       fact.fact ;
      new Audio("audio/newFact.mp3").play();

  }
}
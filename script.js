// constants
const questionEle = document.querySelector("#question");
const optionEle = document.querySelectorAll(".option");
const nextBtn = document.querySelector("#next");

// variables
let questionNo = 0;
let score = 0;
let life = 3;


// dispaly previous hiScore
if (localStorage.getItem("hiScore") === null) {
  localStorage.setItem("hiScore", 0);
} else if (localStorage.getItem("outOf") === null) {
  localStorage.setItem("outOf", 0);
}
hiScoreEle.innerText = `Hi Score: ${localStorage.getItem("hiScore")} / ${localStorage.getItem("outOf")}`;
let hiScore = localStorage.getItem("hiScore");

// functions
/* const preHiScore = () => {
  if (localStorage.getItem("hiScore") === null) {
    localStorage.setItem("hiScore", 0);
  } else if (localStorage.getItem("outOf") === null) {
    localStorage.setItem("outOf", 0);
  }
  hiScoreEle.innerText = `Hi Score: ${localStorage.getItem("hiScore")} / ${localStorage.getItem("outOf")}`;
  let hiScore = localStorage.getItem("hiScore");
}; */

const displayQuestion = () => {
  questionEle.innerText = Questions[questionNo].question;
  
  optionEle.forEach((opVal,idx) => {
    opVal.innerText = Questions[questionNo].options[idx];
  });
  
};

const disableBtn = () => {
  for (let op of optionEle) {
    op.disabled = true;
    op.classList.remove("effect");
  }
};

const enableBtn = () => {
  for (let op of optionEle) {
    op.disabled = false;
    op.classList.add("effect");
  }
};

const resetBtn = () => {
  optionEle.forEach((option) => {
    if (option.classList[1]
 === "correct") {
      option.classList.remove("correct");
    } else if (option.classList[1] === "incorrect"){
      option.classList.remove("incorrect");
    }
  });
  enableBtn();
};

const incorrectAns = (op) => {
  op.classList.add("incorrect");
  life--;
  
  //visibale the correct Answer
  optionEle.forEach((option) => {
      if (option.innerText === Questions[questionNo].correct) {
        option.classList.add("correct");
      }
  console.log(`You select Incorrect Answer!   SCORE: ${score}`)
  });
};

const correctAns = (op) => {
  op.classList.add("correct");
  score++;
  console.log(`You select Correct answer!    SCORE: ${score}`);
};


const updateLife = () => {
  switch (life) {
    case 3:
      lifeContainer.innerHTML = `
        <p>Life</p>
        <div class="life">❤</div>
        <div class="life">❤</div>
        <div class="life">❤</div>`
      break;
    
    case 2:
        lifeContainer.innerHTML = `
            <p>Life</p>
            <div class="life">❤</div>
            <div class="life">❤</div>`;
      console.log("2")
      break;
      
    case 1:
        lifeContainer.innerHTML = `
            <p>Life</p>
            <div class="life">❤</div>`;
      break;
    
    case 0 :
      questionBox.style.display = "none";
      restart.style.display = "block";
      header.classList.add("headerbox");
      gameOver.style.display = "block";
      break;
  }
};

const updateScore = () => {
  scoreEle.innerText = `Score: ${score} / ${questionNo + 1}`;
  
  if (score > hiScore) {
    localStorage.setItem("hiScore", score);
    localStorage.setItem("outOf", questionNo + 1);
  }
  else if (localStorage.getItem("hiScore") == null) {
    localStorage.setItem("hiScore", 0)
  } else if (localStorage.getItem("outOf") === null) {
    localStorage.setItem("lutOf", 0);
  }
  
  hiScoreEle.innerText = `Hi Score: ${localStorage.getItem("hiScore")} / ${localStorage.getItem("outOf")}`;
};

const reset = () => {
  questionNo = 0;
  score = 0;
  life = 3;
  header.classList.remove("headerbox");
  questionBox.style.display = "block";
  restart.style.display = "none";
  gameOver.style.display = "none";
  
  displayQuestion();
  resetBtn();
  enableBtn();
  updateLife();
  updateScore();
};



//Events
//game
optionEle.forEach((option) => {
  displayQuestion();
  option.addEventListener("click",() => {
    if (option.innerText === Questions[questionNo].correct) {
      correctAns(option);
    }
    else {
      incorrectAns(option);
    }
    
    disableBtn();
    updateScore();
    updateLife();
  });
});

// next question & Error
nextBtn.addEventListener("click", () => {
  try {
    if (optionEle[0].disabled === true) {
      questionNo++;
      resetBtn();
      displayQuestion();
    }
  } catch (e) {
    if (Questions[questionNo] === undefined) {
      questionBox.style.display = "none";
      restart.style.display = "block"
      header.classList.add("headerbox");
    }
  }
});

//reset game
restart.addEventListener("click", () => {
  reset();
});

//quit game
quit.addEventListener("click", () => {
  questionBox.style.display = "none";
  restart.style.display = "block";
  header.classList.add("headerbox");
});

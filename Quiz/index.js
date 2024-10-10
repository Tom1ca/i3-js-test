const questions = ["Pitanje1", "Pitanje2", "Pitanje3", "Pitanje4"];

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const questionElement = document.getElementById("question");
const buttonRow = document.getElementById("answer-buttons-row");
const numberOfQuestions = document.querySelectorAll(".answer-buttons");
const resultButton = document.getElementById("show");
const slides = document.querySelectorAll(".slide");
const upozorenje = document.querySelector(".upozorenje")
const scoreElement = document.querySelector(".score");


let score = questions.length;
let trenutnoPitanje = 0;
questionElement.textContent = questions[0];
resultButton.style.display = "none";


const pitanjeIOdgovori = [];

function showQuestion (questionIndex) {
    showOdgovoreZaPitanja(questionIndex);
    trenutnoPitanje = questionIndex;
    questionElement.textContent = questions[questionIndex];
    if (questionIndex > 0) {
        showPreviousButton();
    }
    else {
        hidePreviousButton();
    }

    if (questionIndex === 3) {
        showResultButton();
    } else {
        showNextButton();
    }
};

slides.forEach((slide,index) => {
    slide.addEventListener("click", () => showQuestion(index));
});


function init() {
  previousButton.style.opacity = 0;
  for (let i = 0; i < questions.length; i++) {
    let numberOdgovori = Math.floor(Math.random() * 6) + 3;
    let numberTocnih = Math.floor(Math.random() * numberOdgovori) + 1;
    pitanjeIOdgovori.push({
      pitanje: questions[i],
      odgovori: numberOdgovori,
      tocniOdgovori: numberTocnih,
      answersClicked: 0,
      answersSelected: []
    });
  }
  showOdgovoreZaPitanja(0);

}


function showOdgovoreZaPitanja(pitanje) {
    numberOfQuestions.forEach((q) => q.classList.remove("active"));
  numberOfQuestions.forEach((q) => q.classList.add("hide"));
  let brojPitanja = pitanjeIOdgovori[pitanje].odgovori;
  for (let i = 0; i < brojPitanja; i++) {
    numberOfQuestions[i].classList.remove("hide");
  }
  numberOfQuestions.forEach(n => {
    pitanjeIOdgovori[trenutnoPitanje].answersSelected.includes(+n.getAttribute("data-index")) ? n.classList.add('active') : null
  })
}

function clickedResultButton (){
    let buttonText = document.createElement("p");
    buttonText.innerHTML = `Vaš score je ${score}`;
    scoreElement.appendChild(buttonText);
    scoreElement.classList.remove("hide");  
}

function showResultButton() {
  resultButton.style.display = "block";
  nextButton.style.display = "none";
  pitanjeIOdgovori.forEach((q) => {
     if (q.answersClicked == 0) 
       {
        resultButton.disabled = true;
        resultButton.classList.add("hide");
       }
       else {
        resultButton.disabled = false;
        resultButton.classList.remove("hide");
       }
    })
}

function showNextButton() {
  resultButton.style.display = "none";
  nextButton.style.display = "block";
}

function hidePreviousButton() {
  previousButton.style.opacity = 0;
  previousButton.style.userSelect = "none";
  previousButton.disabled = true;
}

function showPreviousButton() {
  previousButton.style.opacity = 1;
  previousButton.style.userSelect = "auto";
  previousButton.disabled = false;
}

function prikaziProsloPitanje() {
  trenutnoPitanje--;
  showNextButton();
  if (trenutnoPitanje <= 0) {
    hidePreviousButton();
    questionElement.innerText = questions[0];
    showOdgovoreZaPitanja(0);
    trenutnoPitanje = 0;
    return;
  }
  showOdgovoreZaPitanja(trenutnoPitanje);
  questionElement.innerText = questions[trenutnoPitanje];
}

function prikaziSljedecePitanje() {
  trenutnoPitanje++;
  showPreviousButton();
  if (trenutnoPitanje === questions.length - 1) {
    showResultButton();
    questionElement.innerText = questions[trenutnoPitanje];
    showOdgovoreZaPitanja(trenutnoPitanje);
    return;
  }
  showNextButton();
  showOdgovoreZaPitanja(trenutnoPitanje);
  questionElement.innerText = questions[trenutnoPitanje];
}

function showUpozorenje(){
    upozorenje.classList.remove("hide");
    setTimeout(() => {
        upozorenje.classList.add("hide");
    },3000)
}

function obojiSlide(index) {
    slides[index].style.backgroundColor = "green";
}

init();
function clickedAnswer(e){
    if (e.target.classList.contains("answer-buttons")) {
        pitanjeIOdgovori[trenutnoPitanje].answersClicked++;
        obojiSlide(trenutnoPitanje);
        pitanjeIOdgovori[trenutnoPitanje].answersSelected.includes(+e.target.getAttribute("data-index")) ? null : pitanjeIOdgovori[trenutnoPitanje].answersSelected.push(+e.target.getAttribute("data-index"));
        if (trenutnoPitanje === questions.length -1) {
            showResultButton();
            console.log("asdas")
        }
        if (e.target.getAttribute("data-index") > (pitanjeIOdgovori[trenutnoPitanje].tocniOdgovori)) {
            showUpozorenje();
            score--;
        } 
            e.target.classList.add("active");
        
    }
};
buttonRow.addEventListener("click", clickedAnswer.bind(event));
resultButton.addEventListener("click", clickedResultButton);
previousButton.addEventListener("click", prikaziProsloPitanje);
nextButton.addEventListener("click", prikaziSljedecePitanje);
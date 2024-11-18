var subject = sessionStorage.getItem("subject");
var brandCode = sessionStorage.getItem("brandCode");
var nextBtn = document.querySelector(".next-btn");
var studentName = sessionStorage.getItem("name");
var address = sessionStorage.getItem("address");
var fatherName = sessionStorage.getItem("fatherName");
var enrollment = sessionStorage.getItem("enrollment");

var allQuestion = [];

//start reading question from local storage
if (localStorage.getItem(brandCode + "_" + subject + "_question") != null) {
  allQuestion = JSON.parse(
    localStorage.getItem(brandCode + "_" + subject + "_question")
  );
  console.log(allQuestion);
}

var index = 0;
var total = allQuestion.length;
var right = 0;
var wrong = 0;
var allUserResult = [];
var particualrUserResult = [];

let mainBox = document.querySelector(".main");
var allOptionsEl = document.querySelectorAll(".option");
let questionEl = document.querySelector(".question-el");

const getQuestionFunc = () => {
  if (index == total) {
    return endQuiz();
  }
  resetFunc();
  let data = allQuestion[index];
  questionEl.innerHTML = `Q-${index + 1} : ${data.question}`;
  allOptionsEl[0].nextElementSibling.innerText = data.optionOne;
  allOptionsEl[1].nextElementSibling.innerText = data.optionTwo;
  allOptionsEl[2].nextElementSibling.innerText = data.optionThree;
  allOptionsEl[3].nextElementSibling.innerText = data.optionFour;
};

getQuestionFunc();

nextBtn.onclick = function () {
  let data = allQuestion[index];
  var ans = getAnswer();
  if (ans == data.correctAnswer) {
    right++;
  } else {
    wrong++;
  }
  index++;
  getQuestionFunc();
  return;
};

const getAnswer = () => {
  var answer;
  allOptionsEl.forEach((input) => {
    if (input.checked) {
      answer = input.value;
    }
  });
  return answer;
};

function resetFunc() {
  allOptionsEl.forEach((input) => {
    input.checked = false;
  });
}

const endQuiz = () => {
  mainBox.innerHTML = `
    <h2>Clicck on submit button to complete your examinatio.</h2>
    <div align="center">
      <button class="btn btn-primary quiz-submit-btn">Submit</botton>
    </div>
    `;
  submitFunc();
};

const submitFunc = () => {
  if (localStorage.getItem(brandCode + "_" + subject + "_result") != null) {
    allUserResult = JSON.parse(
      localStorage.getItem(brandCode + "_" + subject + "_result")
    );
  }
  if (localStorage.getItem(brandCode + "_" + enrollment + "_result") != null) {
    particualrUserResult = JSON.parse(
      localStorage.getItem(brandCode + "_" + enrollment + "_result")
    );
  }
  var submitBtn = document.querySelector(".quiz-submit-btn");
  submitBtn.onclick = function () {
    allUserResultFunc();
    particualrUserResult();
    this.innerHTML = "please wait...";
    this.disabled = true;
  };
};

const allUserResultFunc = () => {
  allUserResult.push({
    name: studentName,
    enrollment: enrollment,
    rightAns: right,
    wrongAns: wrong,
    subject: subject,
    maxMark: total,
  });
  localStorage.setItem(
    brandCode + "_" + subject + "_result",
    JSON.stringify(allUserResult)
  );
  setTimeout(function () {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("address");
    sessionStorage.removeItem("enrollment");
    sessionStorage.removeItem("fatheName");
    sessionStorage.removeItem("subject");
    window.location = "../homepage/homepage.html";
  }, 2000);
};

// const particualrUserResult = () => {
//   particualrUserResult.push({
//     name: studentName,
//     fatherName: fatherName,
//     enrollment: enrollment,
//     subject: subject,
//     wrongAns: wrong,
//     rightAns: right,
//     maxMark: total,
//   });
//   localStorage.setItem(
//     brandCode + "_" + enrollment + "_result",
//     JSON.stringify(particualrUserResult)
//   );

//   setTimeout(function () {
//     sessionStorage.removeItem("name");
//     sessionStorage.removeItem("address");
//     sessionStorage.removeItem("enrollment");
//     sessionStorage.removeItem("fatherName");
//     sessionStorage.removeItem("subject");
//     window.location = "../homepage/homepage.html";
//   }, 2000);
// };

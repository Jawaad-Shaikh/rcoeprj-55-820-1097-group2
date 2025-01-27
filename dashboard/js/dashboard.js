function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

var brandCode;
brandCode = sessionStorage.getItem("brandCode");
if (brandCode == null) {
  document.body.innerHTML = "";
  document.body.style.background = "black";
  swal("Unauthorized user", "Don't waste Your Time", "error");
}

var allUserData = JSON.parse(localStorage.getItem(brandCode + "_brand"));
var brandNameEL = document.getElementById("brand-name");
// alert(brandCode+"_brand");
// console.log(`BrandCode+"_brand" : ${brandCode+"_brand"}`);

brandNameEL.innerHTML = " Welcome : " + allUserData.brandName;

//start logout coding
var logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
  //   alert();
  this.innerHTML = "Please wait...";
  logoutBtn.disabled = true;
  this.style.background = "#ccc";
  setTimeout(function () {
    window.location = "../company/company.html";
    sessionStorage.removeItem("brandCode");
  }, 3000);
};

//start store subject coding
var visibleSubject = document.querySelector(".visible-subject");
var subjectBtn = document.querySelector(".subject-btn");
var subjectEL = document.querySelector(".subject");
var allSubject = [];

subjectBtn.onclick = function (e) {
  // alert();
  e.preventDefault();
  if (subjectEL.value != "") {
    // alert(subjectEL.value);
    newSubject();
    subjectEL.value = "";
  } else {
    swal("Subject is empty", "please enter subject!", "error");
  }
  updateSubject();
};

const newSubject = (subject, index) => {
  var subjectName = subjectEL.value;
  if (subject) {
    subjectName = subject.subjectName;
  }
  visibleSubject.innerHTML += `
  <div class="d-flex  subject-box   justify-content-between align-items-center">
    <h3 index=${index}>${subjectName}</h3>
    <div>
     <i class="fa fa-edit edit-btn  mx-2" style="font-size:22px;"></i>
     <i class="fa fa-save save-btn mx-2 d-none" style="font-size:22px;"></i>
     <i class="fa fa-trash del-btn mx-2" style="font-size:22px;"></i>
    </div>
  </div>`;

  //start delete coding
  var i;
  var delAllBtn = visibleSubject.querySelectorAll(".del-btn");
  for (i = 0; i < delAllBtn.length; i++) {
    delAllBtn[i].onclick = function () {
      var parent = this.parentElement.parentElement;
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          parent.remove();
          updateSubject();
          swal("Your file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your file is safe!");
        }
      });
    };
  }

  //start update coding
  allEditBtn = visibleSubject.querySelectorAll(".edit-btn");
  for (i = 0; i < allEditBtn.length; i++) {
    allEditBtn[i].onclick = function () {
      var parent = this.parentElement.parentElement;
      var h3 = parent.getElementsByTagName("H3");
      var saveBtn = parent.querySelector(".save-btn");
      h3[0].contentEditable = true;
      h3[0].focus();
      this.classList.add("d-none");
      saveBtn.classList.remove("d-none");
      saveBtn.onclick = function () {
        var editedSub = h3[0].innerHTML;
        var id = h3[0].getAttribute("index");
        updateSubject(editedSub, id);
        this.classList.add("d-none");
        allEditBtn[id].classList.remove("d-none");
        h3[0].contentEditable = false;
      };
    };
  }
};

if (localStorage.getItem(brandCode + "_allSubject") != null) {
  allSubject = JSON.parse(localStorage.getItem(brandCode + "_allSubject"));
  allSubject.forEach((subject, index) => {
    newSubject(subject, index);
  });
}
function updateSubject(subject, id) {
  if (subject != undefined && id != undefined) {
    allSubject[id] = {
      subjectName: subject,
    };
  } else {
    var i;
    allSubject = [];
    var subjectBox = visibleSubject.querySelectorAll(".subject-box");
    for (i = 0; i < subjectBox.length; i++) {
      var h3 = subjectBox[i].getElementsByTagName("H3");
      allSubject.push({
        subjectName: h3[0].innerHTML,
      });
    }
  }
  localStorage.setItem(brandCode + "_allSubject", JSON.stringify(allSubject));
}

//start return subject question form

var chooseSubject = document.querySelector("#choose-subject");
var questionForm = document.querySelector(".question-form");
var textareaValue = document.querySelector("#myTextarea");
var allQuesInput = questionForm.querySelectorAll("INPUT");
var selectSubject = document.querySelector("#select-subject");
var subjectResultEl = document.querySelector("#subject-result-el");
var allQuestion = [];
var subject;
questionForm.onsubmit = (e) => {
  e.preventDefault();
  insertQuestionFunc();
};

const chooseSubjectFunc = () => {
  // alert("success");
  allSubject.forEach((subject, index) => {
    chooseSubject.innerHTML += `
    <option value='${subject.subjectName}'>${subject.subjectName}</option>  
    `;

    selectSubject.innerHTML += `
    <option value='${subject.subjectName}'>${subject.subjectName}</option>
    `;

    subjectResultEl.innerHTML += `
    <option value='${subject.subjectName}'>${subject.subjectName}</option>
    `;
  });
};
chooseSubjectFunc();

chooseSubject.addEventListener("change", () => {
  checkSubject();
  checkSubjectKey();
});

var firstOption = chooseSubject.querySelectorAll("OPTION")[1];
// console.log(firstOption);
function checkSubject() {
  if (chooseSubject.value == "choose subject") {
    subject = firstOption.value;
    // alert(subject);
  } else {
    subject = chooseSubject.value;
  }
  // alert(subject);
}
checkSubject();

function checkSubjectKey() {
  if (localStorage.getItem(brandCode + "_" + subject + "_question") != null) {
    allQuestion = JSON.parse(
      localStorage.getItem(brandCode + "_" + subject + "_question")
    );
  } else {
    allQuestion = [];
  }
}
checkSubjectKey();

function insertQuestionFunc(
  sub,
  id,
  question,
  opOne,
  opTwo,
  opThree,
  opFour,
  corAns
) {
  if (sub != undefined && id != undefined) {
    allQuestion[id] = {
      question: question,
      optionOne: opOne,
      optionTwo: opTwo,
      optionThree: opThree,
      optionFour: opFour,
      correctAnswer: corAns,
    };
    localStorage.setItem(
      brandCode + "_" + sub + "_question",
      JSON.stringify(allQuestion)
    );
    swal("Success", "Data Updated Successfully", "success");
  } else {
    if (chooseSubject.value != "choose subject") {
      allQuestion.push({
        question: textareaValue.value,
        optionOne: allQuesInput[0].value,
        optionTwo: allQuesInput[1].value,
        optionThree: allQuesInput[2].value,
        optionFour: allQuesInput[3].value,
        correctAnswer: allQuesInput[4].value,
      });
      localStorage.setItem(
        brandCode + "_" + chooseSubject.value + "_question",
        JSON.stringify(allQuestion),
        swal("Success", "Data Inserted Successfully", "success"),
        questionForm.reset("")
      );
    } else {
      swal("Choose Subject", "please Select subject!", "error");
    }
  }
}

//start returning question from local storage

var newQuestions = [];
var visibleQuestion = document.querySelector(".visible-question");
selectSubject.onchange = () => {
  if (
    localStorage.getItem(brandCode + "_" + selectSubject.value + "_question") !=
    null
  ) {
    // alert("success");
    newQuestions = JSON.parse(
      localStorage.getItem(brandCode + "_" + selectSubject.value + "_question")
    );
    visibleQuestion.innerHTML = "";
    // console.log(newQuestions);
    newQuestionFunc();
  } else {
    // alert("no data");
    visibleQuestion.innerHTML = "<b style='color:red'>NO DATA AVAILABLE !</b>";
  }
};

const newQuestionFunc = () => {
  newQuestions.forEach((question, index) => {
    // console.log(question, index);
    visibleQuestion.innerHTML += `
    <div class="mb-5" index=${index}>
      <br>
      <div class="d-flex justify-content-between">
        <textarea class=" col-9">${index + 1}] ${question.question}</textarea>
        <div>
          <i class="fa fa-edit  edit-btn mx-3"></i>
        <i class="fa fa-save  save-btn d-none mx-3"></i>
        <i class="fa fa-trash del-btn mx-3"></i>
        </div>
      </div>
      <br>
      <div>
        <span>1} ${question.optionOne}</span>
        <br><br>
        <span>2} ${question.optionTwo}</span>
        <br><br>
        <span>3} ${question.optionThree}</span>
        <br><br>
        <span>4} ${question.optionFour}</span>
        <br><br>
        <span class="bg-info text-white p-3">${question.correctAnswer}</span >
        <br><br>
      </div>
      `;
  });

  // //start delete coding
  // var allDelBtn = visibleQuestion.querySelectorAll(".del-btn");
  // // console.log(allDelBtn);
  // var i;
  // for (i = 0; i < allDelBtn.length; i++) {
  //   allDelBtn[i].onclick = (e) => {
  //     var parent = e.target.parentElement.parentElement.parentElement;
  //     // console.log(parent);
  //     var index = parent.getAttribute("index");
  //     alert(index);
  //   };
  // }

  var allDelBtn = visibleQuestion.querySelectorAll(".del-btn");
  var i, j;
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = (e) => {
      var parent = e.target.parentElement.parentElement.parentElement;
      var index = parent.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          newQuestions.splice(index, 1);
          localStorage.setItem(
            brandCode + "_" + selectSubject.value + "_question",
            JSON.stringify(newQuestions)
          );
          parent.remove();
          swal("Your file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your file is safe!");
        }
      });
    };
  }

  // start edit coding
  var allEditBtn = visibleQuestion.querySelectorAll(".edit-btn");
  for (i = 0; i < allDelBtn.length; i++) {
    allEditBtn[i].onclick = function () {
      // alert();
      var parent = this.parentElement.parentElement.parentElement;
      var index = +parent.getAttribute("index");
      var saveBtn = parent.querySelector(".save-btn");
      this.classList.add("d-none");
      saveBtn.classList.remove("d-none");

      var textarea = parent.querySelector("textarea");
      var span = parent.querySelectorAll("span");
      textarea.contentEditable = true;
      textarea.focus();
      for (j = 0; j < span.length; j++) {
        span[j].contentEditable = true;
        span[j].style.border = "2px solid orange";
      }
      saveBtn.onclick = function () {
        var subject = selectSubject.value;
        var question = textarea.value.replace(`${index + 1}] `, "");
        var opOne = span[0].innerHTML.replace("1} ", "");
        var opTwo = span[1].innerHTML.replace("2} ", "");
        var opThree = span[2].innerHTML.replace("3} ", "");
        var opFour = span[3].innerHTML.replace("4} ", "");
        var corAns = span[4].innerHTML;
        // alert(opFour);
        swal({
          title: "Are you sure?",
          text: "Once Updated, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willUpdated) => {
          if (willUpdated) {
            insertQuestionFunc(
              subject,
              index,
              question,
              opOne,
              opTwo,
              opThree,
              opFour,
              corAns
            );
            allEditBtn[index].classList.remove("d-none");
            saveBtn.classList.add("d-none");
            // //ye line se sirf ek baar edit hoga.
            textarea.contentEditable = false;
            for (j = 0; j < span.length; j++) {
              span[j].contentEditable = false;
              span[j].style.border = "none";
            }
          } else {
            swal("Your file is safe!");
          }
        });
      };
    };
  }
};

//start registration coding

var registrationForm = document.querySelector(".registration-form");
var allRegInput = registrationForm.querySelectorAll("INPUT");
var userType = registrationForm.querySelector("select");
var address = registrationForm.querySelector("textarea");
var registrationDataEl = document.querySelector(".registration-data");
var profileBox = document.querySelector(".upload-box");
var uplaodInput = document.querySelector(".upload-input");
var modalImgUrl;
var registrationData = [];

registrationForm.onsubmit = function (e) {
  e.preventDefault();
  registrationFunc();
  getRegistrationDataFunc();
};

//get data

if (localStorage.getItem(brandCode + "_registrationData") != null) {
  registrationData = JSON.parse(
    localStorage.getItem(brandCode + "_registrationData")
  );
}

const registrationFunc = () => {
  if (userType.value != "choose type") {
    registrationData.push({
      name: allRegInput[0].value,
      fatherName: allRegInput[1].value,
      dob: allRegInput[2].value,
      userType: userType.value,
      mobile: allRegInput[3].value,
      enrollment: allRegInput[4].value,
      password: allRegInput[5].value,
      address: address.value,
      profilePic: "images/avatar.png",
    });
    localStorage.setItem(
      brandCode + "_registrationData",
      JSON.stringify(registrationData)
    );
    swal("DATA INSERTED !", "REGISTRATION DONE SUCCESSFULLY !", "success");
    registrationForm.reset("");
  } else {
    swal("Choose Type!", "Please Select a user !", "warning");
  }
};

const getRegistrationDataFunc = () => {
  registrationDataEl.innerHTML = "";
  registrationData.forEach((allData, index) => {
    registrationDataEl.innerHTML += `
    <tr index=${index}>
     <th scope="row">${index + 1}</th>
     <td>
       <div class="profile">
         <img src="${allData.profilePic}" width="40" height="40" alt="Image">
       </div>
     </td>
     <td class="text-nowrap" style="width: 8rem;">${allData.name}</td>
     <td class="text-nowrap" style="width: 8rem;">${allData.fatherName}</td>
     <td class="text-nowrap" style="width: 8rem;">${allData.dob}</td>
     <td class="text-nowrap" style="width: 8rem;">${allData.userType}</td>
     <td class="text-nowrap" style="width: 8rem;">${allData.mobile}</td>
     <td class="text-nowrap" style="width: 8rem;">${allData.enrollment}</td>
     <td class="text-nowrap" style="width: 8rem;">${allData.password}</td>
     <td class="text-nowrap" style="width: 8rem;">${allData.address}</td>
     <td class="text-nowrap" style="width: 8rem;">
     <i class="fa fa-trash del-btn mx-3"></i>
     <i class="fa fa-eye edit-btn" data-bs-toggle="modal" data-bs-target="#myModal"></i>
     
     </td>
    </tr>
    `;
  });

  //start delete coding

  var i, j;
  var allDelBtn = registrationDataEl.querySelectorAll(".del-btn");
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      var parent = this.parentElement.parentElement;
      var index = parent.getAttribute("index");
      // alert(index);
      // console.log(parent);
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          registrationData.splice(index, 1);
          localStorage.setItem(
            brandCode + "_registrationData",
            JSON.stringify(registrationData)
          );
          parent.remove("");
          getRegistrationDataFunc();

          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  }
  //start edit coding(update coding)
  var allEditBtn = registrationDataEl.querySelectorAll(".edit-btn");
  var modalEditBtn = document.querySelector(".modal-edit");
  var modalUpdateBtn = document.querySelector(".modal-update-btn");
  var modalForm = document.querySelector(".modal-form");
  var allModalInput = modalForm.querySelectorAll("input");
  var modalTextarea = modalForm.querySelector("textarea");
  var closeBtn = document.querySelector(".btn-close");

  for (let i = 0; i < allEditBtn.length; i++) {
    allEditBtn[i].onclick = function () {
      var parent = this.parentElement.parentElement;
      var index = parent.getAttribute("index");
      var td = parent.querySelectorAll("td");
      var imgUrl = td[0].querySelector("img").src;
      var name = td[1].innerHTML;
      var fatherName = td[2].innerHTML;
      var dob = td[3].innerHTML;
      var userType = td[4].innerHTML;
      var mobile = td[5].innerHTML;
      var enrollment = td[6].innerHTML;
      var password = td[7].innerHTML;
      var address = td[8].innerHTML;
      profileBox.style.backgroundImage = `url(${imgUrl})`;
      allModalInput[0].value = name;
      allModalInput[1].value = fatherName;
      allModalInput[2].value = dob;
      allModalInput[3].value = userType;
      allModalInput[4].value = mobile;
      allModalInput[5].value = enrollment;
      allModalInput[6].value = password;
      modalTextarea.value = address;
      for (j = 0; j < allModalInput.length; j++) {
        allModalInput[j].disabled = true;
      }
      modalTextarea.disabled = true;
      uplaodInput.disabled = true;
      modalEditBtn.onclick = function () {
        for (j = 0; j < allModalInput.length; j++) {
          allModalInput[j].disabled = false;
        }
        modalTextarea.disabled = false;
        uplaodInput.disabled = false;
        this.classList.add("d-none");
        modalUpdateBtn.classList.remove("d-none");

        modalUpdateBtn.onclick = function () {
          var name = allModalInput[0].value;
          var fatherName = allModalInput[1].value;
          var dob = allModalInput[2].value;
          var userType = allModalInput[3].value;
          var mobile = allModalInput[4].value;
          var enrollment = allModalInput[5].value;
          var password = allModalInput[6].value;
          var address = modalTextarea.value;
          // alert(modalImgUrl);
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willUpdated) => {
            if (willUpdated) {
              registrationData[index] = {
                name: name,
                fatherName: fatherName,
                dob: dob,
                userType: userType,
                mobile: mobile,
                enrollment: enrollment,
                password: password,
                address: address,
                profilePic: modalImgUrl == undefined ? imgUrl : modalImgUrl,
              };
              localStorage.setItem(
                brandCode + "_registrationData",
                JSON.stringify(registrationData)
              );
              getRegistrationDataFunc();
              this.classList.add("d-none");
              modalEditBtn.classList.remove("d-none");
              closeBtn.click();
              swal("Your file has been Updated", {
                icon: "success",
              });
            } else {
              swal("Your file is safe!");
            }
          });
        };
      };
    };
  }
};
getRegistrationDataFunc();

//read photo coding
uplaodInput.onchange = function () {
  var fReader = new FileReader();
  fReader.onload = function (e) {
    modalImgUrl = e.target.result;
    profileBox.style.backgroundImage = `url(${modalImgUrl})`;
  };
  fReader.readAsDataURL(uplaodInput.files[0]);
};

//start toggler coding
var togglersBtn = document.querySelectorAll(".toggler-icon");
var sideNav = document.querySelector(".side-nav");
togglersBtn[0].onclick = function () {
  sideNav.classList.add("active");
  this.classList.add("d-none");
  togglersBtn[1].classList.remove("d-none");
};
togglersBtn[1].onclick = function () {
  sideNav.classList.remove("active");
  this.classList.add("d-none");
  togglersBtn[0].classList.remove("d-none");
};
//start get result coding from database

let allResult = [];
var allUserResultBox = document.querySelector(".subject-result-data");
subjectResultEl.addEventListener("change", () => {
  allUserResultBox.innerHTML = "";
  if (subjectResultEl.value != "choose subject") {
    // alert("success");
    if (
      localStorage.getItem(
        brandCode + "_" + subjectResultEl.value + "_result"
      ) != null
    ) {
      allResult = JSON.parse(
        localStorage.getItem(
          brandCode + "_" + subjectResultEl.value + "_result"
        )
      );
      allResult.forEach((data, index) => {
        allUserResultBox.innerHTML += `
        <tr>

                          <td class="text-nowrap" style="width :8rem;">${
                            index + 1
                          }}</td>
                          <td class="text-nowrap" style="width :8rem;">${
                            data.name
                          }</td>
                          <td class="text-nowrap" style="width :8rem;">${
                            data.enrollment
                          }</td>
                          <td class="text-nowrap" style="width :8rem;">${
                            data.subject
                          }</td>
                          <td class="text-nowrap" style="width :8rem;">${
                            data.rightAns
                          }</td>
                          <td class="text-nowrap" style="width :8rem;">${
                            data.wrongAns
                          }</td>
                          <td class="text-nowrap" style="width :8rem;">${
                            data.maxMark
                          }</td>
                          
        </tr>
        `;
      });
    }
  } else {
    swal({
      title: "Select subject",
      text: "Please subject first",
      icon: "warning",
    });
  }
});

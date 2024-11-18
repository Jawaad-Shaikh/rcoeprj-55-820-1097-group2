// alert();
//start get brand code from local storage

var i;
var allBrandKey = [];
for (i = 0; i < localStorage.length; i++) {
  var allKeys = localStorage.key(i);
  if (allKeys.match("_brand")) {
    allBrandKey.push(allKeys.replace("_brand", ""));
  }
}
// console.log(allBrandKey);

//start option coding for brandcode

var brandCodeEl = document.querySelector("#brand-code-el");
allBrandKey.forEach((code, index) => {
  brandCodeEl.innerHTML += `
    <option value="${code}">${code}</option>`;
});

//all global variable
var loginForm = document.querySelector(".login-form");
var allLoginInput = loginForm.querySelectorAll("input");
console.log(allLoginInput);
var loginBtn = loginForm.querySelector("button");
var brandCode;
var allUserData = [];

//start login coding

brandCodeEl.addEventListener("change", () => {
  if (brandCodeEl.value != "choose space code") {
    sessionStorage.setItem("brandCode", brandCodeEl.value);
    allLoginInput[0].disabled = false;
    allLoginInput[1].disabled = false;
    loginBtn.disabled = false;
    brandCode = sessionStorage.getItem("brandCode");
    logicUserFun();
  } else {
    allLoginInput[0].disabled = true;
    allLoginInput[1].disabled = true;
    loginBtn.disabled = true;
    swal(
      "Please select the brand !",
      "please select the brand code first !",
      "warning"
    );
  }
});

const logicUserFun = () => {
  if (localStorage.getItem(brandCode + "_registrationData") != null) {
    allUserData = JSON.parse(
      localStorage.getItem(brandCode + "_registrationData")
    );
  }
  console.log(allUserData);

  loginForm.onsubmit = function (e) {
    e.preventDefault();
    // alert();
    console.log(allLoginInput[0].value);
    console.log(allUserData);
    //let enrollmentFound = false; // Flag to check if enrollment exists

    for (i = 0; i < allUserData.length; i++) {
      if (allUserData[i].enrollment == allLoginInput[0].value) {
        //enrollmentFound = true; // Set flag to true if enrollment is found
        alert("user");
        if (allUserData[i].password == allLoginInput[1].value) {
          alert("password");
          //sessionStorage.setItem("brandCode", brandCode);
          if (allUserData[i].userType == "teacher") {
            sessionStorage.setItem("brandCode", brandCode);
            window.location = "../dashboard/dashboard.html";
          } else {
            sessionStorage.setItem("enrollment", allUserData[i].enrollment);
            sessionStorage.setItem("name", allUserData[i].name);
            sessionStorage.setItem("address", allUserData[i].address);
            sessionStorage.setItem("fatherName", allUserData[i].fatherName);

            sessionStorage.setItem("brandCode", brandCode);
            window.location = "../welcome/welcome.html";
          }
          return;
        } else {
          swal("Wrong password!", "please contact your teacher !", "warning");
          return;
        }
      } else {
        swal("Wrong enrollment!", "please contact your teacher !", "warning");
      }
    }
  };
};

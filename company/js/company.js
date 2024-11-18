var signupBtn = document.querySelector(".signup-btn");
var loginBtn = document.querySelector(".login-btn");
var loginBox = document.querySelector(".login-box");
var signupBox = document.querySelector(".signup-box");

signupBtn.onclick = function () {
  signupBox.classList.add("active");
  loginBox.classList.remove("active");
  loginBtn.classList.remove("d-none");
  signupBtn.classList.add("d-none");
};

loginBtn.onclick = () => {
  signupBox.classList.remove("active");
  loginBox.classList.add("active");
  loginBtn.classList.add("d-none");
  signupBtn.classList.remove("d-none");
};

//start register coding

var registerForm = document.querySelector(".signup-form");
// console.log(registerForm);
var allInput = registerForm.querySelectorAll("INPUT");
// console.log(allInput);
var textArea = registerForm.querySelector("textarea");

registerForm.onsubmit = function (e) {
  // alert();
  e.preventDefault();
  registrationData();
  registerForm.reset("");
};

const registrationData = () => {
  if (localStorage.getItem(allInput[0].value + "_brand") == null) {
    const userData = {
      brandCode: allInput[0].value,
      brandName: allInput[1].value,
      website: allInput[2].value,
      contact: allInput[3].value,
      address: textArea.value,
      username: allInput[4].value,
      password: allInput[5].value,
    };
    let userString = JSON.stringify(userData);
    localStorage.setItem(allInput[0].value + "_brand", userString);
    //   swal("Registeration Done", "Please Sign in!", "success");
    // } else {
    //   swal("Change BRAND CODE", "This brand Code Is Already Taken", "error");
    // }
    swal("Registration Done", "Please Sign in!", "success").then(() => {
      signupBox.classList.remove("active"); // Hide sign-up box
      loginBox.classList.add("active"); // Show login box
      loginBtn.classList.remove("d-none"); // Show the login button
      signupBtn.classList.add("d-none"); // Hide the sign-up button//idhar pe abhi add ki jagah remove kara hai
    });
  } else {
    swal("Change BRAND CODE", "This brand Code Is Already Taken", "error");
  }
};

let signinBtn = document.querySelector(".signin-btn");
let brandCode = document.querySelector("#brand-code");
let username = document.querySelector("#username");
let password = document.querySelector("#password");

signinBtn.onclick = function (e) {
  // alert();
  e.preventDefault();
  if (brandCode.value && username.value && password.value != "") {
    // alert("success");
    if (localStorage.getItem(brandCode.value + "_brand") != null) {
      const allData = JSON.parse(
        localStorage.getItem(brandCode.value + "_brand")
      );
      console.log(allData);
      if (allData.username == username.value) {
        // alert("success");
        if (allData.password == password.value) {
          // alert(" Login success");
          signinBtn.innerHTML = "Please wait...";
          signinBtn.disabled = true;
          setTimeout(function () {
            window.location = "../dashboard/dashboard.html";
            sessionStorage.setItem("brandCode", brandCode.value);
          }, 1000);
        } else {
          swal("wrong passsword ", "PLEASE check your password", "warning");
        }
      } else {
        swal("wrong username ", "PLEASE check your username", "warning");
      }
    } else {
      swal("wrong brandcode ", "PLEASE check your brand code", "warning");
    }
  } else {
    swal("EMPTY FIELD ", "PLEASE FILL ALL THE FIELD", "warning");
  }
};

var studentLoginLink = document.querySelector("#student-login-link");

studentLoginLink.onclick = function (e) {
  e.preventDefault(); // Prevent the default link behavior
  window.location = "../homepage/homepage.html"; // Redirect to the desired page
};

var signInEmailInp = document.getElementById("signInEmailInp");
var signInPasswordInp = document.getElementById("signInPasswordInp");
var signUpNameInp = document.getElementById("signUpNameInp");
var userNameAlert = document.getElementById("userNameAlert");
var signUpEmailInp = document.getElementById("signUpEmailInp");
var userEmailAlert = document.getElementById("userEmailAlert");
var signUpPasswordInp = document.getElementById("signUpPasswordInp");
var userPasswordAlert = document.getElementById("userPasswordAlert");
var fillMsg = document.getElementById("fillMsg");
var wrongMsg = document.getElementById("wrongMsg");
var confirmMsg = document.getElementById("confirmMsg");
var accountExistMsg = document.getElementById("accountExistMsg");
var tryAgainMsg = document.getElementById("tryAgainMsg");
var loginBtn = document.getElementById("loginBtn");
var userName = document.getElementById("userName");
var usersName = localStorage.getItem("usersSession");
var usersData = [];

if (localStorage.getItem("allData") != null) {
    usersData = JSON.parse(localStorage.getItem("allData"));
} else {
    usersData = [];
}

signUpNameInp.onkeyup = function () {
    var userNameRejex = /^[A-Z][a-z A-z 0-9]{3,}$/;
    if (
        userNameRejex.test(signUpNameInp.value) == true &&
        signUpNameInp.value != ""
    ) {
        signUpNameInp.classList.add("is-valid");
        signUpNameInp.classList.remove("is-invalid");
        userNameAlert.classList.add("d-none");
        return true;
    } else {
        signUpNameInp.classList.add("is-invalid");
        signUpNameInp.classList.remove("is-valid");
        userNameAlert.classList.remove("d-none");
        return false;
    }
};

signUpEmailInp.onkeyup = function () {
    var userEmailRejex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
    if (
        userEmailRejex.test(signUpEmailInp.value) == true &&
        signUpEmailInp.value != ""
    ) {
        signUpEmailInp.classList.add("is-valid");
        signUpEmailInp.classList.remove("is-invalid");
        userEmailAlert.classList.add("d-none");
        return true;
    } else {
        signUpEmailInp.classList.add("is-invalid");
        signUpEmailInp.classList.remove("is-valid");
        userEmailAlert.classList.remove("d-none");
        return false;
    }
};

signUpPasswordInp.onkeyup = function () {
    var userPasswordRejex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (
        userPasswordRejex.test(signUpPasswordInp.value) == true &&
        signUpPasswordInp.value != ""
    ) {
        signUpPasswordInp.classList.add("is-valid");
        signUpPasswordInp.classList.remove("is-invalid");
        userPasswordAlert.classList.add("d-none");
        return true;
    } else {
        signUpPasswordInp.classList.add("is-invalid");
        signUpPasswordInp.classList.remove("is-valid");
        userPasswordAlert.classList.remove("d-none");
        return false;
    }
};

function userInpValidation() {
    signUpNameInp.onkeyup();
    signUpEmailInp.onkeyup();
    signUpPasswordInp.onkeyup();
    if (
        signUpNameInp.onkeyup() == true &&
        signUpEmailInp.onkeyup() == true &&
        signUpPasswordInp.onkeyup() == true
    ) {
        return true;
    } else {
        return false;
    }
}

function isEmailExist() {
    for (var i = 0; i < usersData.length; i++) {
        if (
            usersData[i].email.toLowerCase() == signUpEmailInp.value.toLowerCase()
        ) {
            signUpNameInp.classList.remove("is-valid");
            signUpNameInp.classList.add("is-invalid");
            signUpEmailInp.classList.remove("is-valid");
            signUpEmailInp.classList.add("is-invalid");
            signUpPasswordInp.classList.remove("is-valid");
            signUpPasswordInp.classList.add("is-invalid");
            accountExistMsg.classList.remove("d-none");
            return true;
        }
    }
    return false;
}

function signUp() {
    userInpValidation();
    isEmailExist();
    if (userInpValidation() == true && isEmailExist() == false) {
        var user = {
            name: signUpNameInp.value,
            email: signUpEmailInp.value,
            password: signUpPasswordInp.value,
        };
        usersData.push(user);
        localStorage.setItem("allData", JSON.stringify(usersData));
        confirmMsg.classList.remove("d-none");
        tryAgainMsg.classList.add("d-none");
    } else {
        tryAgainMsg.classList.remove("d-none");
    }
}

function signIn() {
    if (signInEmailInp.value == "" || signInPasswordInp.value == "") {
        fillMsg.classList.remove("d-none");
        wrongMsg.classList.add("d-none"); 
        return false;
    } else {
        fillMsg.classList.add("d-none"); 
    }

    let found = false; 

    for (var i = 0; i < usersData.length; i++) {
        if (
            usersData[i].email.toLowerCase() === signInEmailInp.value.toLowerCase() &&
            usersData[i].password === signInPasswordInp.value
        ) {
            localStorage.setItem("usersSession", usersData[i].name);
            location.replace("welcome.html");
            displayWelcomeUser();
            found = true;
            break;
        }
    }

    if (!found) {
        wrongMsg.classList.remove("d-none");
    }
}


function displayWelcomeUser() {
    userName.innerHTML = "Welcome" + " " + usersName;
}
function logout() {
    localStorage.removeItem("usersSession");
}

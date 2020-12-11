

var isError, isError2;
const errorMessage1 = "First Character must be an alphabet character.";
const errorMessage2 = "User Name must be at least 3 alphanumerical characters.";
const errorMessage3 = "8 or more characters\nAND contains at least 1 upper case letter\nAND 1 number\nAND 1 of the"
let guide = document.getElementById("validationGuide");

function userNameValidation() {
    let userName = document.getElementById("username");

    let regex1 = /^[a-zA-Z]/;
    let regex2 = /^(?=.*\d)(|.*[a-z])(|.*[A-Z])[0-9+a-zA-Z]{3,}$/;
    if(userName){
        userName.addEventListener("focus", () => {
            if (userName.value == "") {
                isError = true;
                guide.innerText = errorMessage1 + "\n" + errorMessage2;
            }
    
            else if (!regex1.test(userName.value) || !regex2.test(userName.value)) {
                isError = true;
                if (!regex1.test(userName.value)) guide.innerText = errorMessage1
                else guide.innerText = errorMessage2;
    
            }
    
            else {
                isError = false;
                guide.innerText = "";
    
            }
            userName.addEventListener("input", () => {
                if (userName.value == "") {
                    isError = true;
                    guide.innerText = errorMessage1 + "\n" + errorMessage2;
    
                }
    
                else if (!regex1.test(userName.value) || !regex2.test(userName.value)) {
                    isError = true;
                    if (!regex1.test(userName.value)) guide.innerText = errorMessage1;
                    else guide.innerText = errorMessage2;
    
                }
    
                else {
                    isError = false;
                    guide.innerText = "";
                }
            });
        });
    }
    
}
function validSubmit() {
    let error1 = "CHECK USERNAME(One or more of the following):\n" + errorMessage1 + "\n" + errorMessage2;
    let error2 = "CHECK PASSWORD:\n" + errorMessage3;
    if (isError && isError2) {
        guide.innerText = error1 + "\n\n" + error2;
        return false;
    }
    else if (isError) {
        guide.innerText = error1;
        return false;
    }
    else if (isError2) {
        guide.innerText = error2;
        return false;
    }

    else return true;
}

function passwordValidation() {
    let password = document.getElementById("password");
    + "following special characters(/*-+!@#$^&*)."

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(password){
        password.addEventListener("focus", () => {
            if (password.value == "") {
                isError2 = true;
                guide.innerText = errorMessage3;
            }
            else if (!regex.test(password.value)) {
                isError2 = true;
                guide.innerText = errorMessage3;
            }
            else {
                isError2 = false;
                guide.innerText = "";
            }
    
            password.addEventListener("input", () => {
                if (!regex.test(password.value)) {
                    isError2 = true;
                    guide.innerText = errorMessage3;
                }
                else {
                    isError2 = false;
                    guide.innerText = "";
                }
            })
        });
    }
}

userNameValidation();
passwordValidation();


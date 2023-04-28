import removeSignInForm from "./frontpage";

const accountForm = document.createElement("form");
const accountFormContainer = document.createElement("div");
const h2 = document.createElement("h2");
const p = document.createElement("p");
const createAccountLink = document.createElement("button");
const labelForUsername = document.createElement("LABEL");
const inputUsername = document.createElement("input");
const inputEmail = document.createElement("input");
const inputPassword = document.createElement("input");
const signInBtn = document.createElement("button");
const createAccountBtn = document.createElement("button");

export default function createLoginForm() {
    console.log("test");
    accountForm.classList.add("account-form");
    accountFormContainer.classList.add("account-form-container");
    h2.classList.add("h2");
    p.classList.add("p");
    createAccountLink.classList.add("create-account-link");
    signInBtn.classList.add("sign-in-btn");
    inputUsername.classList.add("input-username");
    inputEmail.classList.add("input-email");
    inputPassword.classList.add("input-password");

    inputEmail.type = "email";
    inputPassword.type = "password";

    h2.innerText = "Sign in"
    p.innerText = "Don't have an account?";
    createAccountLink.innerText = "Create one here";
    labelForUsername.innerHTML = "username";
    inputUsername.placeholder = "Username";
    inputEmail.placeholder = "Email";
    inputPassword.placeholder = "Password";
    signInBtn.innerText = "Sign in"
    
    document.body.appendChild(accountForm);
    accountForm.appendChild(accountFormContainer);
    accountFormContainer.appendChild(h2);
    accountFormContainer.appendChild(p);
    p.appendChild(createAccountLink);
    labelForUsername.appendChild(inputUsername);
    accountFormContainer.appendChild(inputUsername);
    accountFormContainer.appendChild(inputEmail);
    accountFormContainer.appendChild(inputPassword);
    accountFormContainer.appendChild(signInBtn);

    console.log("hej");

    createAccountLink.addEventListener("click", createAccountForm);
    signInBtn.addEventListener("click", loginUser);
}

createLoginForm();

function loginUser(e: Event) {
    e.preventDefault();
    const inputUsername = document.querySelector(".input-username")! as HTMLInputElement;
  const inputEmail = document.querySelector(".input-email") ! as HTMLInputElement;;
  const inputPassword = document.querySelector(".input-password") ! as HTMLInputElement;;


  let loginUser = {
    username: inputUsername.value,
    email: inputEmail.value,
    password: inputPassword.value,
  };

  console.log("loginUser", loginUser);

  fetch("http://localhost:3000/users/loginuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log("data", data);
        if (data.username) {
            console.log("data", data);
            alert(`Good morning ${data.username}`);
            localStorage.setItem("username", data.username);
            localStorage.setItem("id", data.id);
            console.log("username", data.username, "id", data.id);

            removeSignInForm();
        } else {
            alert("Failed login attempt, please check your username and password!");
        }
    })
    .catch(err => {
        console.error(err);
        alert("An error occurred, please try again later.");
    })
}


function createAccountForm(e: Event) {
    e.preventDefault()

    accountFormContainer.innerHTML = "";
    accountForm.classList.add("account-form");
    accountFormContainer.classList.add("account-form-container");
    h2.classList.add("h2");
    createAccountBtn.classList.add("create-account-btn");

    inputUsername.classList.add("input-username");
    inputEmail.classList.add("input-email");
    inputPassword.classList.add("input-password");

    inputEmail.type = "email";
    inputPassword.type = "password";

    h2.innerText = "Create account"
    labelForUsername.innerHTML = "username";
    inputUsername.placeholder = "Username";
    inputEmail.placeholder = "Email";
    inputPassword.placeholder = "Password";
    createAccountBtn.innerText = "Create account"
    
    document.body.appendChild(accountForm);
    accountForm.appendChild(accountFormContainer);
    accountFormContainer.appendChild(h2);
    labelForUsername.appendChild(inputUsername);
    accountFormContainer.appendChild(inputUsername);
    accountFormContainer.appendChild(inputEmail);
    accountFormContainer.appendChild(inputPassword);
    accountFormContainer.appendChild(createAccountBtn);

    createAccountBtn.addEventListener("click", createUserAccount);
}


function createUserAccount(e: Event) {
    e.preventDefault();
    const inputUsername = document.querySelector(".input-username")! as HTMLInputElement;;
    const inputEmail = document.querySelector(".input-email")! as HTMLInputElement;;
    const inputPassword = document.querySelector(".input-password")! as HTMLInputElement;;

    let username = inputUsername.value;
    let email = inputEmail.value;
    let password = inputPassword.value; 

    console.log("username", inputUsername.value);

    let createUser = {
        username: username,
        email: email,
        password: password,
    }

    console.log(username, password, email);

    createUserInDatabase(createUser);
}


function createUserInDatabase(createUser: Object) {
    console.log("createUser", createUser);

    fetch("http://localhost:3000/users/createuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
       },
    
        body: JSON.stringify(createUser)
    })
    .then(res => res.json())
    .then(createUser => {
        console.log("data", createUser);
        alert("Welcome, your account is now created. Please sign in to access all your information by reloading this webpage.");
    })
    .catch(err => console.log("err", err));
}
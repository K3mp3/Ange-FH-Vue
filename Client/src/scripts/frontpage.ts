const toolContainer = document.createElement("div");


export default function removeSignInForm() {
    const accountForm = document.querySelector(".account-form") as HTMLDivElement;
    console.log("accountForm", accountForm);
    accountForm.innerHTML = "";

    
}


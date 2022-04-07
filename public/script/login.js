const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});

// const submit = document.querySelector('#login');

// submit.addEventListener('click', () => {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     if(username == 'admin' && password == 'admin'){
//         alert('LOGIN SUCCESS');
//         // window.location.replace('www.google.com');
//         return false;
//     }
//     else{
//         alert('LOGIN FAILED');
//     }
// })
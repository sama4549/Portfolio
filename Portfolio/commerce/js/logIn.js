const navShoppingCart = document.querySelector('.fa-shopping-cart');
const navShoppingCartLink = document.getElementById('shopping-cart-link');
const pleaseLogInMessage = document.querySelector('.please-log-in');
const newAccountButton = document.querySelector('.new-account-button');
const navLink = document.querySelectorAll('.nav-link');
const logInButton = document.querySelector('.log-in-button');
const navLoginItem = document.querySelector('.nav-log-in-item');
const loginFailed = document.querySelector('.login-failed');

//VARIABLES//
let loggedIn;
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let loginUsers = JSON.parse(localStorage.getItem('savedLogInInfo'));

//EVENT LISTENERS//
navShoppingCart.addEventListener('click', goToCart);
logInButton.addEventListener('click', checkInputs);
document.addEventListener('DOMContentLoaded', obtainLocalData);
navLoginItem.addEventListener('click', accountRedirect);
document.addEventListener('DOMContentLoaded', checkForLocalData);
document.addEventListener('DOMContentLoaded', obtainUserInfo);

//ARRAY//
let loginInfo = [];

navLink.forEach(item => {
    item.addEventListener('mouseover', () => {              //Adds color to navigation buttons when you hover over them
        item.style.transitionDuration = '0.5s'
        item.style.color = 'burlywood';
    })
});

navLink.forEach(item => {
    item.addEventListener('mouseout', () => {
        item.style.color = 'white';
    })
})

//FUNCTIONS//
function goToCart(ev) {                                         //Prevents going to the cart page if you are not logged in//
    if (loggedIn === false) {
        ev.preventDefault();

        pleaseLogInMessage.style.transform = 'scale(1)';

        setTimeout(() => {
            pleaseLogInMessage.style.transform = 'scale(0)';
        }, 3000);
    }
}

function obtainLocalData() {
    console.log('obtained log in info.');
    loginInfo = JSON.parse(localStorage.getItem('savedLogInInfo'));
    loggedIn = JSON.parse(localStorage.getItem('loginStatus'));
    checkForLoginStatus();
}

function checkInputs() {
    console.log('button works.');
    let counter = 0;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    for (i = 0; i < loginInfo.length; i++) {
        if (username == loginInfo[i].username && password == loginInfo[i].password) {
            counter ++;
        }
    }
    if (counter > 0) {
        console.log('login successful.');
        applyLogin(username);
    } else {
        console.log('login failed.');
        loginFailed.style.transform = 'scale(1)';
        setTimeout(function() {loginFailed.style.transform = 'scale(0)'} , 3000);
    }
}

function applyLogin(username) {
    console.log('Applying Login...');
    localStorage.setItem('loginStatus', JSON.stringify(true));
    currentUser = username;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    loggedIn = JSON.parse(localStorage.getItem('loginStatus'));
    checkForLoginStatus();
    location.replace('./loginSuccess.html');
}

function checkForLoginStatus() {
    if (loggedIn == true) {
        navLoginItem.innerHTML = currentUser;
    } else if (loggedIn == false) {
        navLoginItem.innerHTML = 'Log In';
    }
}

function accountRedirect() {                                     //Brings user to their accout page instead of the login page
    if (loggedIn == true) {
        location.replace('./account.html');
    } else if (loggedIn == false) {
        location.replace('./login.html');
    }
}

function obtainUserInfo() {
    loginUsers.forEach(user => {
        if (user.username == currentUser) {
            console.log(user);
        }
    });
}

function checkForLocalData() {
    if (loginUsers == null) {
        loginUsers = [
            {
                cart: 0,
                email: 'test@gmail.com',
                firstName: 'John',
                lastName: 'Doe',
                items: [],
                username: 'test',
                password: 'test'
            },
        ]
        localStorage.setItem('savedLogInInfo', JSON.stringify(loginUsers));
    }

    if (currentUser == null) {
        currentUser = '';
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
    }

    if (loggedIn == null) {
        loggedIn = false;
        localStorage.setItem('loginStatus', JSON.stringify(loggedIn));
    }
}
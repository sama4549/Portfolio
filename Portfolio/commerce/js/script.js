//SELECTORS//
const navShoppingCart = document.querySelector('.fa-shopping-cart');
const navShoppingCartLink = document.getElementById('shopping-cart-link');
const pleaseLogInMessage = document.querySelector('.please-log-in');
const newAccountButton = document.querySelector('.new-account-button');
const navLink = document.querySelectorAll('.nav-link');
const navLoginItem = document.querySelector('.nav-log-in-item');
const aboutUsButton = document.querySelector('.about-us-button');
const aboutUsButtonText = document.querySelector('.about-us-link');


//VARIABLES//
let loggedIn;
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let loginUsers = JSON.parse(localStorage.getItem('savedLogInInfo'));
let currentUserInfo;

//EVENT LISTENERS//
navShoppingCart.addEventListener('click', goToCart); 
navLoginItem.addEventListener('click', accountRedirect);
document.addEventListener('DOMContentLoaded', obtainLocalData);
document.addEventListener('DOMContentLoaded', obtainUserInfo);
document.addEventListener('DOMContentLoaded', applyCurrentUserInfoToLocalData);
document.addEventListener('DOMContentLoaded', checkForLocalData);
aboutUsButton.addEventListener('mouseover', aboutUsOn);
aboutUsButton.addEventListener('mouseout', aboutUsOff);


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

function obtainLocalData() {                                   //Obtains all local data, such as log in status and the current username
    console.log('obtained log in info.');
    loggedIn = JSON.parse(localStorage.getItem('loginStatus'));
    /*currentUser = JSON.parse(localStorage.getItem('currentUser'));*/
    checkForLoginStatus();
}

function checkForLoginStatus() {                               //Checks if user is logged in
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
            currentUserInfo = user;
        }
    });
}

function applyCurrentUserInfoToLocalData() {
    localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
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

function aboutUsOn() {
    aboutUsButtonText.style.color = 'burlywood';
}

function aboutUsOff() {
    aboutUsButtonText.style.color = 'darkslategrey';
}
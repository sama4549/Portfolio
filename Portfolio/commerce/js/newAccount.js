//SELECTORS//
const navShoppingCart = document.querySelector('.fa-shopping-cart');
const navShoppingCartLink = document.getElementById('shopping-cart-link');
const pleaseLogInMessage = document.querySelector('.please-log-in');
const newAccountButton = document.querySelector('.new-account-button');
const navLink = document.querySelectorAll('.nav-link');
const navLoginItem = document.querySelector('.nav-log-in-item');
const cartSize = document.querySelector('.cart-size');

//ARRAY//

let loginInfo = [];

//VARIABLES//
const loggedIn = false;
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let loginUsers = JSON.parse(localStorage.getItem('savedLogInInfo'));
let numberOfCartItems = JSON.parse(localStorage.getItem('numberOfCartItems'));
let currentUserInfo;

//EVENT LISTENERS//
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
navShoppingCart.addEventListener('click', goToCart);
newAccountButton.addEventListener('click', createNewAccount);
document.addEventListener('DOMContentLoaded', checkForLocalData);
document.addEventListener('DOMContentLoaded', loadAccounts);
document.addEventListener('DOMContentLoaded', checkIfArrayExists);
navLoginItem.addEventListener('click', accountRedirect);
document.addEventListener('DOMContentLoaded', obtainUserInfo);

//CLASS CONSTRUCTOR//
class Account{
    constructor(firstName, lastName, email, username, password, items, cart, loginStatus) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.items = items;
        this.cart = cart;
        this.loginStatus = loginStatus;
    }
}

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

function createNewAccount() {                                             //Adds the new information into the localfiles and creates a new account
    let newFirstName = document.getElementById('first-name').value;
    let newLastName = document.getElementById('last-name').value;
    let newEmail = document.getElementById('email').value;
    let newUsername = document.getElementById('username').value;
    let newPassword = document.getElementById('password').value;
    let confirmNewPassword = document.getElementById('confirm-password').value;
    let newItems = [];
    let newCart = 0;
    let newAccount = new Account(newFirstName, newLastName, newEmail, newUsername, newPassword, newItems, newCart);
    if (newFirstName === '' || newLastName === '' || newEmail === '' || newUsername === '' || newPassword === '' || confirmNewPassword === '') {
        alert('You left some information blank!');
        return;
    }
    if (newPassword != confirmNewPassword) {
        alert('Passwords do not match!');
        return;
    } 
    let UsernameAlreadyExists = loginInfo.every(function(account) {
        return account.username != newUsername;
    })
    if (UsernameAlreadyExists) {
        loginInfo.push(newAccount);
        localStorage.setItem('savedLogInInfo', JSON.stringify(loginInfo));
        location.replace('./login.html');
    } else {
        alert('This username already exists!');
        return;
    }
}

function loadAccounts() {                                               //Loads all of the saved data onto the array.                                                        
    loginInfo = JSON.parse(localStorage.getItem('savedLogInInfo'));
    cartSize.innerHTML = `(${numberOfCartItems})`;
}

function checkIfArrayExists() {                                        //Checks if the account array already exists. If not, then it will create a John Doe account to start off.
    localStorage.setItem('savedLogInInfo', JSON.stringify(loginInfo));
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

    if (numberOfCartItems == null) {
        numberOfCartItems = 0;
        localStorage.setItem('numberOfCartItems', JSON.stringify(numberOfCartItems));
    }
}
}
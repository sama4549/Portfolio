//SELECTORS//
const navShoppingCart = document.querySelector('.fa-shopping-cart');
const navShoppingCartLink = document.getElementById('shopping-cart-link');
const pleaseLogInMessage = document.querySelector('.please-log-in');
const navLink = document.querySelectorAll('.nav-link');
const navLoginItem = document.querySelector('.nav-log-in-item');
const gridItems = document.querySelector('.grid-items');
let gridTotal = document.querySelector('.grid-total');

//VARIABLES//
let loggedIn;
let inventoryTransportation = [];
let cartCost;
let itemsInCart = [];
let itemCounter = 0;
let cartItemArray = [];                                  //These variables may be obsolete. Delete once finished.
let cartItemCostArray = [];
let tempCart = [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let loginUsers = JSON.parse(localStorage.getItem('savedLogInInfo'));
let currentUserInfo = JSON.parse(localStorage.getItem('Current User Info'));
let counter;
let finalCount;

//EVENT LISTENERS//
navShoppingCart.addEventListener('click', goToCart); 
navLoginItem.addEventListener('click', accountRedirect);
document.addEventListener('DOMContentLoaded', obtainLocalData);
document.addEventListener('DOMContentLoaded', loadCartData);
document.addEventListener('DOMContentLoaded', obtainUserInfo);
document.addEventListener('DOMContentLoaded', checkForLocalData);

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

    inventoryTransportation = JSON.parse(localStorage.getItem('Inventory-Transportation'));
    cartCost = JSON.parse(localStorage.getItem('Cart Cost'));
    itemsInCart = JSON.parse(localStorage.getItem('itemsInCart'));
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

function loadCartData() {
    for (i = 0; i < currentUserInfo.items.length; i++) {
        /////////CREATE CLASSES//////////////////////////
        let itemEelement = document.createElement('p');
        let costElement = document.createElement('p');
        let removeSymbolElement = document.createElement('p');
        ///////CREATE CLASSES FOR CART INFO////////////////
        itemEelement.classList.add('cart-item');
        cartItemArray.push(itemEelement);                                   //Delete once finished
        costElement.classList.add('cart-item-cost');
        cartItemCostArray.push(costElement);                                  //Delete once finished
        removeSymbolElement.classList.add('remove-symbol');
        //////////////////////////////////////////////////////////
        let item = document.createTextNode(`${currentUserInfo.items[i].item}`);
        let cost = document.createTextNode(`${Math.round((Number(currentUserInfo.items[i].cost) + Number.EPSILON) * 100) / 100}`);
        let removeSymbol = document.createTextNode(`-`);
        /////////////APPEND CHILDREN//////////////////////////////////
        itemEelement.appendChild(item);
        costElement.appendChild(cost);
        removeSymbolElement.appendChild(removeSymbol);
        gridItems.appendChild(itemEelement);
        gridItems.appendChild(costElement);
        gridItems.appendChild(removeSymbolElement);
        itemCounter ++;
        console.log(itemCounter);
        //////////////EVENT LISTENER////////////////////////////////
        removeSymbolElement.addEventListener('click', (ev) => {
            ////////////SET UP//////////////////////////
            gridItems.removeChild(removeSymbolElement);
            gridItems.removeChild(itemEelement);
            gridItems.removeChild(costElement);
            itemCounter--;
            console.log(`Item #${itemCounter}`);
            cartItemArray = [];
            cartItemCostArray = [];
            //////////////////////////////////////////////////////////
            for (i = 0; i < itemCounter; i++) {
                let cartItem = document.querySelectorAll('.cart-item');
                let cartItemCost = document.querySelectorAll('.cart-item-cost');
                cartItemArray.push(cartItem[i].innerHTML);
                cartItemCostArray.push(Number(cartItemCost[i].innerHTML));
                /*console.log(`${cartItemArray[i]}: ${cartItemCostArray[i]}`);*/
                let newCartItem = {
                    item: `${cartItemArray[i]}`,
                    cost: `${cartItemCostArray[i]}`
                };
                tempCart.push(newCartItem);
                console.log(`Temp Cart: Item: ${tempCart[i].item}, Cost: ${tempCart[i].cost}`);
                localStorage.setItem('itemsInCart', JSON.stringify(tempCart));
                let newCartCost = cartItemCostArray.reduce((a, b) => a + b, 0);
                localStorage.setItem('Cart Cost', JSON.stringify(newCartCost));


                loginUsers[finalCount].items = tempCart;
                loginUsers[finalCount].cart = newCartCost;
                console.log(`New Login Users after update: ${loginUsers}`);
                localStorage.setItem('savedLogInInfo', JSON.stringify(loginUsers));
                localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
                location.replace('./cart.html');
            }
            if (itemCounter == 0) {
                let tempCart = [];
                localStorage.setItem('itemsInCart', JSON.stringify(tempCart));
                let newCartCost = 0;
                localStorage.setItem('Cart Cost', JSON.stringify(newCartCost));
                loginUsers[finalCount].items = tempCart;
                loginUsers[finalCount].cart = newCartCost;
                localStorage.setItem('savedLogInInfo', JSON.stringify(loginUsers));
                localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
                location.replace('./cart.html');
            }
            
        });
    }


    /*console.log(cartItemArray);
    console.log(cartItemCostArray);*/
    let totalCostElement = document.createElement('p');
    let totalCostNode = document.createTextNode(`${Math.round((Number(currentUserInfo.cart) + Number.EPSILON) * 100) / 100}`);
    totalCostElement.appendChild(totalCostNode);
    gridTotal.appendChild(totalCostElement);
}

function obtainUserInfo() {
    counter = -1;
    loginUsers.forEach(user => {
        counter ++;
        if (user.username === currentUser) {
            finalCount = counter;
            currentUserInfo = user;
            console.log(`the array number is ${finalCount}`);
            console.log(`The current user is ${currentUserInfo.username}`);
            return;
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

    if (currentUserInfo == null) {
        currentUserInfo = [];
        localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
    }

    if (loggedIn == null) {
        loggedIn = false;
        localStorage.setItem('loginStatus', JSON.stringify(loggedIn));
    }
}
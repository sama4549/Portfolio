//SELECTORS//
const navShoppingCart = document.querySelector('.fa-shopping-cart');
const navShoppingCartLink = document.getElementById('shopping-cart-link');
const pleaseLogInMessage = document.querySelector('.please-log-in');
const navLink = document.querySelectorAll('.nav-link');
const navLoginItem = document.querySelector('.nav-log-in-item');
const addToCart = document.querySelectorAll('.add-to-cart');
const quantityToAdd = document.querySelectorAll('.quantity');
const productTitle = document.querySelector('.product-title');
const overlay = document.querySelector('.overlay');
const overlaySuccess = document.querySelector('.overlay-success');
const overlayButtonYes = document.querySelector('.overlay-button-yes');
const overlayButtonNo = document.querySelector('.overlay-button-no');
const overlayButtonOk = document.querySelector('.overlay-button-ok');
const main = document.querySelector('.main');

//VARIABLES//
let counter;
let finalCount;
let loggedIn;
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let inventoryTransportation = [];
let inventoryElectronics = [];
let inventoryClothing = [];
let inventoryLanguage = [];
let inventoryOutdoors = [];
let inventoryLuggage = [];
let loginUsers = JSON.parse(localStorage.getItem('savedLogInInfo'));
let currentUserInfo = JSON.parse(localStorage.getItem('Current User Info'));

//EVENT LISTENERS//
navShoppingCart.addEventListener('click', goToCart); 
navLoginItem.addEventListener('click', accountRedirect);
document.addEventListener('DOMContentLoaded', obtainLocalData);
document.addEventListener('DOMContentLoaded', obtainUserInfo);
document.addEventListener('DOMContentLoaded', checkForLocalData);

addToCart.forEach(button => {
    button.addEventListener('click', addItemsToCart);
})

navLink.forEach(item => {
    item.addEventListener('mouseover', () => {              //Adds color to navigation buttons when you hover over them
        item.style.transitionDuration = '0.5s';
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
    inventoryElectronics = JSON.parse(localStorage.getItem('Inventory-Electronics'));
    inventoryClothing = JSON.parse(localStorage.getItem('Inventory-Clothing'));
    inventoryLanguage = JSON.parse(localStorage.getItem('Inventory-Language'));
    inventoryLuggage = JSON.parse(localStorage.getItem('Inventory-Luggage'));
    inventoryOutdoors = JSON.parse(localStorage.getItem('Inventory-Outdoors'));
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

function addItemsToCart(ev) {
    if (loggedIn == false) {
        pleaseLogInMessage.style.transform = 'scale(1)';

        setTimeout(() => {
            pleaseLogInMessage.style.transform = 'scale(0)';
        }, 3000);
        return;
    }
    overlay.style.transform = 'scale(1)';
    main.style.opacity = '0.3';

    overlayButtonNo.addEventListener('click', () => {
        overlay.style.transform = 'scale(0)';
        main.style.opacity = '1';
    })

    overlayButtonYes.addEventListener('click', () => {
        if (productTitle.innerHTML == 'Transportation') {
            transportation(ev);
        }
        if (productTitle.innerHTML == 'Electronics') {
            electronics(ev);
        }
        if (productTitle.innerHTML == 'Clothing') {
            clothing(ev);
        }
        if (productTitle.innerHTML == 'Luggage') {
            luggage(ev);
        }
        if (productTitle.innerHTML == 'Language') {
            language(ev);
        }
        if (productTitle.innerHTML == 'Outdoors') {
            outdoors(ev);
        }
    })
}

function transportation(ev) {
    for (i = 0; i < inventoryTransportation.length; i++) {
        if (ev.target == addToCart[i]) {
            console.log(`Name of Item: ${inventoryTransportation[i].item}`);
            console.log(`Cost of Item: ${inventoryTransportation[i].cost}`);
            if (inventoryTransportation[i].quantity <= 0) {
                alert ('We are all out of this item!');
                location.replace('./productsTransportation.html');
                return;
            }
            inventoryTransportation[i].quantity = inventoryTransportation[i].quantity - Number(quantityToAdd[i].value);
            console.log(`Remaining in Inventory: ${inventoryTransportation[i].quantity}`);
            console.log(`Quantity to add: ${quantityToAdd[i].value}`);
            currentUserInfo.cart = Number(currentUserInfo.cart) + Number(inventoryTransportation[i].cost * quantityToAdd[i].value);
            let newCartItem = {
                item: `${inventoryTransportation[i].item} x ${quantityToAdd[i].value}`,
                cost: `${Number(inventoryTransportation[i].cost * quantityToAdd[i].value)}`
            };
            currentUserInfo.items.push(newCartItem);
            overlay.style.transform = 'scale(0)';
            main.style.opacity = '1';
            ///////////////////////////APPLY TO LOCAL STORAGE///////////////////////////////
            localStorage.setItem('Inventory-Transportation', JSON.stringify(inventoryTransportation));

            ///////////////////////////RESET PAGE////////////////////////////////////////////
            overlaySuccess.style.transform = 'scale(1)';
            overlayButtonOk.addEventListener('click', () => {
                loginUsers[finalCount].items = currentUserInfo.items;
                loginUsers[finalCount].cart = currentUserInfo.cart;
                localStorage.setItem('savedLogInInfo', JSON.stringify(loginUsers));
                localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
                location.replace('./productsTransportation.html');
            })

        }
    }
}

function electronics(ev) {
    for (i = 0; i < inventoryElectronics.length; i++) {
        if (ev.target == addToCart[i]) {
            console.log(`Name of Item: ${inventoryElectronics[i].item}`);
            console.log(`Cost of Item: ${inventoryElectronics[i].cost}`);
            if (inventoryElectronics[i].quantity <= 0) {
                alert ('We are all out of this item!');
                location.replace('./productsElectronics.html');
                return;
            }
            inventoryElectronics[i].quantity = inventoryElectronics[i].quantity - Number(quantityToAdd[i].value);
            console.log(`Remaining in Inventory: ${inventoryElectronics[i].quantity}`);
            console.log(`Quantity to add: ${quantityToAdd[i].value}`);
            currentUserInfo.cart = Number(currentUserInfo.cart) + Number(inventoryElectronics[i].cost * quantityToAdd[i].value);
            let newCartItem = {
                item: `${inventoryElectronics[i].item} x ${quantityToAdd[i].value}`,
                cost: `${Number(inventoryElectronics[i].cost * quantityToAdd[i].value)}`
            };
            currentUserInfo.items.push(newCartItem);
            overlay.style.transform = 'scale(0)';
            main.style.opacity = '1';
            ///////////////////////////APPLY TO LOCAL STORAGE///////////////////////////////
            localStorage.setItem('Inventory-Electronics', JSON.stringify(inventoryElectronics));

            ///////////////////////////RESET PAGE////////////////////////////////////////////
            overlaySuccess.style.transform = 'scale(1)';
            overlayButtonOk.addEventListener('click', () => {
                loginUsers[finalCount].items = currentUserInfo.items;
                loginUsers[finalCount].cart = currentUserInfo.cart;
                localStorage.setItem('savedLogInInfo', JSON.stringify(loginUsers));
                localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
                location.replace('./productsElectronics.html');
            })

        }
    }
}

function clothing(ev) {
    for (i = 0; i < inventoryClothing.length; i++) {
        if (ev.target == addToCart[i]) {
            console.log(`Name of Item: ${inventoryClothing[i].item}`);
            console.log(`Cost of Item: ${inventoryClothing[i].cost}`);
            if (inventoryClothing[i].quantity <= 0) {
                alert ('We are all out of this item!');
                location.replace('./productsClothing.html');
                return;
            }
            inventoryClothing[i].quantity = inventoryClothing[i].quantity - Number(quantityToAdd[i].value);
            console.log(`Remaining in Inventory: ${inventoryClothing[i].quantity}`);
            console.log(`Quantity to add: ${quantityToAdd[i].value}`);
            currentUserInfo.cart = Number(currentUserInfo.cart) + Number(inventoryClothing[i].cost * quantityToAdd[i].value);
            let newCartItem = {
                item: `${inventoryClothing[i].item} x ${quantityToAdd[i].value}`,
                cost: `${Number(inventoryClothing[i].cost * quantityToAdd[i].value)}`
            };
            currentUserInfo.items.push(newCartItem);
            overlay.style.transform = 'scale(0)';
            main.style.opacity = '1';
            ///////////////////////////APPLY TO LOCAL STORAGE///////////////////////////////
            localStorage.setItem('Inventory-Clothing', JSON.stringify(inventoryClothing));

            ///////////////////////////RESET PAGE////////////////////////////////////////////
            overlaySuccess.style.transform = 'scale(1)';
            overlayButtonOk.addEventListener('click', () => {
                loginUsers[finalCount].items = currentUserInfo.items;
                loginUsers[finalCount].cart = currentUserInfo.cart;
                localStorage.setItem('savedLogInInfo', JSON.stringify(loginUsers));
                localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
                location.replace('./productsClothing.html');
            })

        }
    }
}

function language(ev) {
    for (i = 0; i < inventoryLanguage.length; i++) {
        if (ev.target == addToCart[i]) {
            console.log(`Name of Item: ${inventoryLanguage[i].item}`);
            console.log(`Cost of Item: ${inventoryLanguage[i].cost}`);
            if (inventoryLanguage[i].quantity <= 0) {
                alert ('We are all out of this item!');
                location.replace('./productsLanguage.html');
                return;
            }
            inventoryLanguage[i].quantity = inventoryLanguage[i].quantity - Number(quantityToAdd[i].value);
            console.log(`Remaining in Inventory: ${inventoryLanguage[i].quantity}`);
            console.log(`Quantity to add: ${quantityToAdd[i].value}`);
            currentUserInfo.cart = Number(currentUserInfo.cart) + Number(inventoryLanguage[i].cost * quantityToAdd[i].value);
            let newCartItem = {
                item: `${inventoryLanguage[i].item} x ${quantityToAdd[i].value}`,
                cost: `${Number(inventoryLanguage[i].cost * quantityToAdd[i].value)}`
            };
            currentUserInfo.items.push(newCartItem);
            overlay.style.transform = 'scale(0)';
            main.style.opacity = '1';
            ///////////////////////////APPLY TO LOCAL STORAGE///////////////////////////////
            localStorage.setItem('Inventory-Language', JSON.stringify(inventoryLanguage));

            ///////////////////////////RESET PAGE////////////////////////////////////////////
            overlaySuccess.style.transform = 'scale(1)';
            overlayButtonOk.addEventListener('click', () => {
                loginUsers[finalCount].items = currentUserInfo.items;
                loginUsers[finalCount].cart = currentUserInfo.cart;
                localStorage.setItem('savedLogInInfo', JSON.stringify(loginUsers));
                localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
                location.replace('./productsLanguage.html');
            })

        }
    }
}

function outdoors(ev) {
    for (i = 0; i < inventoryOutdoors.length; i++) {
        if (ev.target == addToCart[i]) {
            console.log(`Name of Item: ${inventoryOutdoors[i].item}`);
            console.log(`Cost of Item: ${inventoryOutdoors[i].cost}`);
            if (inventoryOutdoors[i].quantity <= 0) {
                alert ('We are all out of this item!');
                location.replace('./productsOutdoors.html');
                return;
            }
            inventoryOutdoors[i].quantity = inventoryOutdoors[i].quantity - Number(quantityToAdd[i].value);
            console.log(`Remaining in Inventory: ${inventoryOutdoors[i].quantity}`);
            console.log(`Quantity to add: ${quantityToAdd[i].value}`);
            currentUserInfo.cart = Number(currentUserInfo.cart) + Number(inventoryOutdoors[i].cost * quantityToAdd[i].value);
            let newCartItem = {
                item: `${inventoryOutdoors[i].item} x ${quantityToAdd[i].value}`,
                cost: `${Number(inventoryOutdoors[i].cost * quantityToAdd[i].value)}`
            };
            currentUserInfo.items.push(newCartItem);
            overlay.style.transform = 'scale(0)';
            main.style.opacity = '1';
            ///////////////////////////APPLY TO LOCAL STORAGE///////////////////////////////
            localStorage.setItem('Inventory-Outdoors', JSON.stringify(inventoryOutdoors));

            ///////////////////////////RESET PAGE////////////////////////////////////////////
            overlaySuccess.style.transform = 'scale(1)';
            overlayButtonOk.addEventListener('click', () => {
                loginUsers[finalCount].items = currentUserInfo.items;
                loginUsers[finalCount].cart = currentUserInfo.cart;
                localStorage.setItem('savedLogInInfo', JSON.stringify(loginUsers));
                localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
                location.replace('./productsOutdoors.html');
            })

        }
    }
}

function luggage(ev) {
    for (i = 0; i < inventoryLuggage.length; i++) {
        if (ev.target == addToCart[i]) {
            console.log(`Name of Item: ${inventoryLuggage[i].item}`);
            console.log(`Cost of Item: ${inventoryLuggage[i].cost}`);
            if (inventoryLuggage[i].quantity <= 0) {
                alert ('We are all out of this item!');
                location.replace('./productsLuggage.html');
                return;
            }
            inventoryLuggage[i].quantity = inventoryLuggage[i].quantity - Number(quantityToAdd[i].value);
            console.log(`Remaining in Inventory: ${inventoryLuggage[i].quantity}`);
            console.log(`Quantity to add: ${quantityToAdd[i].value}`);
            currentUserInfo.cart = Number(currentUserInfo.cart) + Number(inventoryLuggage[i].cost * quantityToAdd[i].value);
            let newCartItem = {
                item: `${inventoryLuggage[i].item} x ${quantityToAdd[i].value}`,
                cost: `${Number(inventoryLuggage[i].cost * quantityToAdd[i].value)}`
            };
            currentUserInfo.items.push(newCartItem);
            overlay.style.transform = 'scale(0)';
            main.style.opacity = '1';
            ///////////////////////////APPLY TO LOCAL STORAGE///////////////////////////////
            localStorage.setItem('Inventory-Luggage', JSON.stringify(inventoryLuggage));

            ///////////////////////////RESET PAGE////////////////////////////////////////////
            overlaySuccess.style.transform = 'scale(1)';
            overlayButtonOk.addEventListener('click', () => {
                loginUsers[finalCount].items = currentUserInfo.items;
                loginUsers[finalCount].cart = currentUserInfo.cart;
                localStorage.setItem('savedLogInInfo', JSON.stringify(loginUsers));
                localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
                location.replace('./productsLuggage.html');
            })

        }
    }
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
    if (inventoryClothing == null) {
        inventoryClothing = [
            {
                item: 'Winter Jacket',
                cost: 49.99,
                quantity: 100
            },
            {
                item: 'Scarf',
                cost: 19.99,
                quantity: 100
            },
            {
                item: 'Flip Flops',
                cost: 19.99,
                quantity: 100
            },
            {
                item: 'Cowboy Boots',
                cost: 79.99,
                quantity: 100
            },
            {
                item: 'Jungle Jacket',
                cost: 69.99,
                quantity: 100
            }
        ]
        localStorage.setItem('Inventory-Clothing', JSON.stringify(inventoryClothing));
    }

    if (inventoryElectronics == null) {
        inventoryElectronics = [
            {
                item: 'Portable Charger',
                cost: 39.99,
                quantity: 100
            },
            {
                item: 'USB Adapter',
                cost: 19.99,
                quantity: 100
            },
            {
                item: 'Outlet Adapter',
                cost: 19.99,
                quantity: 100
            }
        ]
        localStorage.setItem('Inventory-Electronics', JSON.stringify(inventoryElectronics));
    }

    if (inventoryTransportation == null) {
        inventoryTransportation = [
            {
                item: 'Neck Rest',
                cost: 9.99,
                quantity: 100
            },
            {
                item: 'Sleep Mask',
                cost: 9.99,
                quantity: 100
            },
            {
                item: 'Ear Plugs',
                cost: 4.99,
                quantity: 100
            }
        ]
        localStorage.setItem('Inventory-Transportation', JSON.stringify(inventoryTransportation));
    }

    if (inventoryLanguage == null) {
        inventoryLanguage = [
            {
                item: 'Dictionary',
                cost: 4.99,
                quantity: 100
            },
            {
                item: 'Common Words',
                cost: 14.99,
                quantity: 100
            },
            {
                item: 'Language Learning',
                cost: 29.99,
                quantity: 100
            },
            {
                item: 'Survival Guide',
                cost: 19.99,
                quantity: 100
            },
            {
                item: 'Travel Tips',
                cost: 19.99,
                quantity: 100
            }
        ]
        localStorage.setItem('Inventory-Language', JSON.stringify(inventoryLanguage));
    }

    if (inventoryOutdoors == null) {
        inventoryOutdoors = [
            {
                item: 'Tent',
                cost: 49.99,
                quantity: 100
            },
            {
                item: 'Hiking Sticks',
                cost: 14.99,
                quantity: 100
            },
            {
                item: 'Hiking Boots',
                cost: 59.99,
                quantity: 100
            },
            {
                item: 'Water Bottle',
                cost: 19.99,
                quantity: 100
            },
            {
                item: 'Bug Spray',
                cost: 4.99,
                quantity: 100
            }
        ]
        localStorage.setItem('Inventory-Outdoors', JSON.stringify(inventoryOutdoors));
    }

    if (inventoryLuggage == null) {
        inventoryLuggage = [
            {
                item: 'Carry-on Suitcase',
                cost: 44.99,
                quantity: 100
            },
            {
                item: 'Carry-on Backpack',
                cost: 29.99,
                quantity: 100
            },
            {
                item: 'Travel Satchel',
                cost: 9.99,
                quantity: 100
            },
            {
                item: 'Suitcase',
                cost: 49.99,
                quantity: 100
            },
            {
                item: 'Briefcase',
                cost: 35.99,
                quantity: 100
            }
        ]
        localStorage.setItem('Inventory-Luggage', JSON.stringify(inventoryLuggage));
    }

    if (currentUserInfo == null) {
        currentUserInfo = [];
        localStorage.setItem('Current User Info', JSON.stringify(currentUserInfo));
    }

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
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    if (loggedIn == null) {
        loggedIn = false;
        localStorage.setItem('loginStatus', JSON.stringify(loggedIn));
    }
}
import './style.scss';
import { pizza_app } from './pizza';
import { data } from './data';

// document.getElementById('pizza').innerHTML = pizza_app;

document.getElementById('meat').addEventListener('change', selectOptions);
document.getElementById('veg').addEventListener('change', selectOptions);

let list = document.getElementsByClassName('orderbtn');
for (let i = 1; i < list.length; i++) {
    const element = list[i];
    
    element.addEventListener('click', addSpecialtyPizza);
}

function addSpecialtyPizza(evt) {
    let toppings_list = evt.target.parentElement.parentElement.children[1].children[1].children;

    for (let i = 0; i < toppings_list.length; i++) {
        const element = toppings_list[i];
        
        let img = document.createElement('img');
        img.className = 'overlayImage';
        img.src = element.src;

        document.getElementById('mainPizzaToppings').appendChild(img);
    }

    updateToppingList();
}

function selectOptions(evt) {
    var selected_item = document.getElementById(evt.target.id).value;

    if (selected_item != 'default') {
        document.getElementById(`selected_${evt.target.id}`).innerHTML = `What you want for <strong>${selected_item}</strong> ?`
        document.getElementById(`${evt.target.id}_selection`).style.display = 'block';

        // Sets the Buttons to how the picture looks
        let e1 = document.getElementById(`${evt.target.id}_right`);
        let e2 = document.getElementById(`${evt.target.id}_left`);
        let e3 = document.getElementById(`${evt.target.id}_whole`);
        if (comparesSelectedItemWithPizza(selected_item) == 1) {

            // Defaults the Right button to be active
            if (!(/right_active.png/.test(e1.src))) {
                e1.src = e1.src.replace('right', 'right_active');
            }

            e2.src = e2.src.replace("_active", "");
            e3.src = e3.src.replace("_active", "");

        } else if (comparesSelectedItemWithPizza(selected_item) == 2) {

            // Defaults the Left button ot be active
            if (!(/left_active.png/.test(e2.src))) {
                e2.src = e2.src.replace('left', 'left_active');
            }

            e1.src = e1.src.replace("_active", "");
            e3.src = e3.src.replace("_active", "");

        } else if (comparesSelectedItemWithPizza(selected_item) == 3) {
            
            // Defaults the Whole button to be active
            if (!(/whole_active.png/.test(e3.src))) {
                e3.src = e3.src.replace('whole', 'whole_active');
            }

            e1.src = e1.src.replace("_active", "");
            e2.src = e2.src.replace("_active", "");
            
        } else {

            e1.src = e1.src.replace("_active", "");
            e2.src = e2.src.replace("_active", "");
            e3.src = e3.src.replace("_active", "");
        }

        // Adds HOVER and CLICK events for images
        document.getElementById(`${evt.target.id}_whole`).addEventListener('click', changeSelectionImage);
        document.getElementById(`${evt.target.id}_right`).addEventListener('click', changeSelectionImage);
        document.getElementById(`${evt.target.id}_left`).addEventListener('click', changeSelectionImage);
    } else {
        document.getElementById(`${evt.target.id}_selection`).style.display = 'none';
    }
}

function comparesSelectedItemWithPizza(item) {
    let element_list = loopsThroughOverlayImages();

    let isOnPizza = 0;

    element_list.forEach(element => {
        if (new RegExp(item.replace(" ", "_")).test(element.src)) {
            if (new RegExp('Right').test(element.src)) {
                isOnPizza += 1;
            } else if (new RegExp('Left').test(element.src)) {
                isOnPizza += 2;
            } 
        }
    });

    return isOnPizza
}

function loopsThroughOverlayImages() {
    // Loops through the overlay image
    let images = document.getElementById('mainPizzaToppings');

    let elements_list = [];

    for (let i = 0; i < images.children.length; i++) {
        const element = images.children[i];
        elements_list.push(element);
    }

    return elements_list;
}

function checkPizzaIfToppingIsThere(src) {
    let list = loopsThroughOverlayImages();
    let isOnPizza = false;

    for (let i = list.length - 1; i >= 1; i--) {
        let element = list[i];

        if (new RegExp(src).test(element.src)) {
            isOnPizza = true;
            break;
        }
    }

    return isOnPizza;
}

function updatePizza(target, side_of_pizza, isClicked) {  
    // Containter that holds all the pizza topping images
    let toppings_container = document.getElementById('mainPizzaToppings');

    // Gets the topping name  
    let regex = /<strong>(.*)<\/strong>/;
    let arr = regex.exec(target.parentElement.children[0].innerHTML);
    let topping_name = arr[1].replace(" ", "_");

    // Creates the img tag to be added or deleted
    let img = document.createElement('img');
    img.className = 'mainPizzaImage';

    if (side_of_pizza == 'whole') {

        // Checks if the button is ACTIVE or NOT ACTIVE
        if (isClicked) {
            // Because of a WHOLE pizza, this adds another img tag
            let img2 = document.createElement('img');
            img2.className = 'mainPizzaImage';

            let src1 = `./IMAGES/${topping_name}-Left.webp`;
            let src2 = `./IMAGES/${topping_name}-Right.webp`;

            img.src = src1;
            img2.src = src2;

            if (!checkPizzaIfToppingIsThere(src1)) {
                // Adds img tags to the MAIN TOPPING PIZZA div
                toppings_container.appendChild(img);
                if (!checkPizzaIfToppingIsThere(src2)) {
                    toppings_container.appendChild(img2);
                }
            } else {
                if (!checkPizzaIfToppingIsThere(src2)) {
                    toppings_container.appendChild(img2);
                }
            }

        } else {
            // Deletes the img tag
            deletesToppingFromPizza(topping_name, toppings_container,side_of_pizza);
        }

    } else if ( side_of_pizza == 'right') {

        // Checks if the button is ACTIVE or NOT ACTIVE
        if (isClicked) {
            // Checks if the image is already on the pizza and returns false if not
            img.src = `./IMAGES/${topping_name}-${side_of_pizza.charAt(0).toUpperCase()}${side_of_pizza.slice(1)}.webp`;
            
            toppings_container.appendChild(img);

        } else {
            // Deletes the img tag
            deletesToppingFromPizza(topping_name, toppings_container,side_of_pizza);
        }

    } else {

        // Checks if the button is ACTIVE or NOT ACTIVE
        if (isClicked) {
            img.src = `./IMAGES/${topping_name}-${side_of_pizza.charAt(0).toUpperCase()}${side_of_pizza.slice(1)}.webp`;

            toppings_container.appendChild(img);
        } else {
            // Deletes the img tag
            deletesToppingFromPizza(topping_name, toppings_container,side_of_pizza);
        }
        
    }
}

function updateToppingList() {
    // Gets all the images that create the pizza
    let all_toppings_on_pizza = loopsThroughOverlayImages();

    let checkIfWhole = 0;
    let regex = /IMAGES\/(.*).webp/;

    let string = "";

    let topping_list_div = document.getElementById('allToppings');
    
    // Clears the topping list's content
    while (topping_list_div.firstChild) {
        topping_list_div.removeChild(topping_list_div.lastChild);
    }
    
    // Iterates over all the toppings on the pizza image
    for (let i = all_toppings_on_pizza.length - 1; i >= 0; i--) {
        let p = document.createElement('p');

        const element = all_toppings_on_pizza[i];
        
        // Adds the INNERHTML for the P tag and adds it to the toppings list
        let arr = regex.exec(element.src);
        string = `<strong>${arr[1].replace("_", " ").replace("-Right", "").replace("-Left", "")}</strong>`;

        if (!checkIfDuplicateInList(string)) {
            p.innerHTML = "- " + string;

            topping_list_div.appendChild(p);
        } else {
            p.remove();
        }

    }

    // Jeff method
    updatePricing();
}

function deletesToppingFromPizza(topping_name, toppings_container, side_of_pizza) {
    // Loops through the TOPPINGS div
    for (let i = toppings_container.children.length - 1; i >= 0; i--) {
        let element = toppings_container.children[i];

        // Finds the tag with the correct topping
        if (new RegExp(`${topping_name}`).test(element.src)) {

            // Deletes tag with the correct topping
            if (side_of_pizza == 'whole') {
                
                element.remove();

            } else if (side_of_pizza == 'right') {
                
                if (/Right/.test(element.src)) {
                    element.remove();
                }

            } else {

                if (/Left/.test(element.src)) {
                    element.remove();
                }

            }

        }
    }
}

function changeSelectionImage(evt) {
    // Gets the topping name  
    let regex = /<strong>(.*)<\/strong>/;
    let arr = regex.exec(evt.target.parentElement.children[0].innerHTML);
    let topping_name = arr[1].replace(" ", "_");

    let toppings_container = document.getElementById('mainPizzaToppings');

    if (/whole/.test(evt.target.src)) {
        
        if (/whole_active.png/.test(evt.target.src)) {
            evt.target.src = evt.target.src.replace('whole_active', 'whole');
            updatePizza(evt.target, 'whole',false);
        } else {
            evt.target.src = evt.target.src.replace('whole', 'whole_active');
            console.log(evt.target.src);
            updatePizza(evt.target, 'whole',true);

            // Deselects the LEFT and RIGHT select buttons
            for (let i = 3; i < evt.target.parentElement.children.length; i++) {

                const element = evt.target.parentElement.children[i];
                element.src = element.src.replace("_active", "");

            }
        }

    } else if (/right/.test(evt.target.src)) {

        if (/right_active.png/.test(evt.target.src)) {
            evt.target.src = evt.target.src.replace('right_active', 'right');
            updatePizza(evt.target, 'right', false);
        } else {
            
            // Checks if the WHOLE select option is selected
            if (/_active/.test(evt.target.parentElement.children[2].src)) {

                evt.target.parentElement.children[2].src = evt.target.parentElement.children[2].src.replace("_active", "");
                
                for (let i = toppings_container.children.length -1; i >= 0; i--) {
                    let element = toppings_container.children[i];
                    
                    // Checks if the left LEFT image exist and deletes it
                    if (new RegExp(`${topping_name}-Left`).test(element.src)) {
                        element.remove();
                    }
                }

                evt.target.src = evt.target.src.replace('right', 'right_active');

            } else {
                // If it does not see that WHOLE is selected then it will just add the right side
                evt.target.src = evt.target.src.replace('right', 'right_active');
                updatePizza(evt.target, 'right', true);
            }

        }

    } else {

        if (/left_active.png/.test(evt.target.src)) {
            evt.target.src = evt.target.src.replace('left_active', 'left');
            updatePizza(evt.target, 'left', false);
        } else {
            
            // Checks if the WHOLE select option is selected
            if (/_active/.test(evt.target.parentElement.children[2].src)) {
                
                evt.target.parentElement.children[2].src = evt.target.parentElement.children[2].src.replace("_active", "");
                
                for (let i = toppings_container.children.length -1; i >= 0; i--) {
                    let element = toppings_container.children[i];
                    
                    // Checks if the left LEFT image exist and deletes it
                    if (new RegExp(`${topping_name}-Right`).test(element.src)) {
                        element.remove();
                    }
                }
                
                evt.target.src = evt.target.src.replace('left', 'left_active');
                
            } else {
                // If it does not see that WHOLE is selected then it will just add the right side
                evt.target.src = evt.target.src.replace('left', 'left_active');
                updatePizza(evt.target, 'left', true);
            }
        }

    }

    updateToppingList();
}

function checkIfDuplicateInList(string) {
    let isDuplicate = false;
    let regex = /<strong>(.*)<\/strong>/;
    let topping_name = regex.exec(string);

    // Checks if topping is a duplicate
    let list = document.getElementById('allToppings');

    for (let i = list.children.length - 1; i >= 0; i--) {
        const element = list.children[i];
        
        let l = regex.exec(element.innerHTML);

        if (topping_name[1] == l[1]) {
            isDuplicate = true;
        }
    }

    return isDuplicate;
}

// JEFF CODE

let cart = {
    pizzas: [],
    total: 0.0
};

let updateCart = () => {
    console.log(cart);
}

let addPizzaToCart = pizza => {
    cart.pizzas.push(pizza);
    updateCart();
}

let cartBtn = document.getElementById('add-to-cart-btn');
cartBtn.onclick = evt => {
    let pizza = gatherPizza();
    
    calculatePizzaPrice(pizza);
    addPizzaToCart(pizza);
    
    clearBuild();
}

let gatherPizza = () => {
    let pizza = {};
    
    let size = document.getElementById('size');
    size = size.options[size.selectedIndex].value;
    pizza.size = size;
    
    pizza.toppings = []
    let toppings = document.getElementById('allToppings').getElementsByTagName('p');
    Array.prototype.forEach.call(toppings, topping => {
        topping = topping.innerText;
        pizza.toppings.push(topping);
    });

    return pizza;
}

let calculatePizzaPrice = pizza => {
    // Price of selected size
    let prices = data.prices;
    Array.prototype.forEach.call(prices, price => {
        for (let k of Object.keys(price)) {
            if (k === pizza.size) {
                pizza.sizePrice = price[k];
            }
        }
    });

    // Is a 5+ topping deal?
    pizza.deal = pizza.toppings.length == 5;

    // Price of each topping (first and fifth are free)
    let toppings = {};
    for (let i = 0; i < pizza.toppings.length; i++) {
        let price = (i == 0 || i == 4)? 0 : 1;
        toppings[pizza.toppings[i]] = price;
    }
    pizza.toppings = toppings;

    // Total Price (size + each topping)
    pizza.totalPrice = pizza.sizePrice;
    for (let [k,v] of Object.entries(pizza.toppings)) {
        pizza.totalPrice += v;
    }
}

// Resets the pizza building form
let clearBuild = () => {
    document.getElementById('buildSize').innerText = "";
    document.getElementById('allToppings').innerHTML = "";
    document.getElementById('buildPrice').innerText = "";

    document.getElementById('size').value = 'sm';
    document.getElementById('meat').value = 'default';
    document.getElementById('veg').value = 'default';

    document.getElementById('meat_selection').style.display = 'none';
    document.getElementById('veg_selection').style.display = 'none';

    document.getElementById('mainPizzaToppings').innerHTML = "";
}

let updateSizing = () => {
    let sizeSelect = document.getElementById('size');
    document.getElementById('buildSize').innerText = sizeSelect[sizeSelect.selectedIndex].innerText;
    updatePricing();
}

let updatePricing = () => {
    // Get price from generated pizza
    let pizza = gatherPizza();
    calculatePizzaPrice(pizza);
    
    document.getElementById('buildPrice').innerText = generateDollarAmount(pizza.totalPrice);
}

let generateDollarAmount = val => {
    return `$${val.toFixed(2)}`;
}

document.getElementById('size').onchange = updateSizing;
updateSizing();
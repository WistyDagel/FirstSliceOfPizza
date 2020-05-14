import './style.scss';
import { pizza_app } from './pizza';
import { data } from './data';

// document.getElementById('pizza').innerHTML = pizza_app;

document.getElementById('meat').addEventListener('change', selectOptions);
document.getElementById('veg').addEventListener('change', selectOptions);

const default_color = '#008764';
const active_color = '#da102e';

let list = document.getElementsByClassName('orderbtn');
for (let i = 1; i < list.length; i++) {
    const element = list[i];
    
    element.addEventListener('click', addSpecialtyPizza);
}

function addSpecialtyPizza(evt) {
    let toppings_list = evt.target.parentElement.parentElement.children[1].children[1].children;

    // Clears the topping list's content
    let x = document.getElementById('mainPizzaToppings');
    while (x.firstChild) {
        x.removeChild(x.lastChild);
    }

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

        // Defaults the color of the ADD EXTRA button
        defaultExtraButton(evt.target.id, selected_item);

        // Adds event listener to the ADD EXTRAS button
        document.getElementById(`${evt.target.id}_button`).addEventListener('click', addExtraToppings);
    } else {
        document.getElementById(`${evt.target.id}_selection`).style.display = 'none';
    }
}

function defaultExtraButton(name, selected_item) {
    let toppings = getsToppingList();

    let regex = /EXTRA/;

    let button = document.getElementById(`${name}_button`);

    if (toppings.length != 0) {
        for (let i = 0; i < toppings.length; i++) {
            const element = toppings[i];
            
            if (element.innerHTML.replace("- <strong>", "").replace("</strong>", "").replace("EXTRA ", "") == selected_item) {
                if (regex.test(element.innerHTML)) {
                    button.style.backgroundColor = active_color;
                    break;
                } else {
                    button.style.backgroundColor = default_color;
                    break;
                }
            } else {
                button.style.backgroundColor = default_color;
            }
        }
    }
}

function getsToppingList() {
    let list = document.getElementById('allToppings');

    let list2 = [];

    for (let i = 0; i < list.children.length; i++) {
        const element = list.children[i];
    
        list2.push(element);
    }

    return list2;
}

function addExtraToppings(evt) {
    let topping_list = getsToppingList();

    let regex = /<strong>(.*)<\/strong>/;
    let find_extra = /EXTRA/;

    // If the user clicks ADD EXTRA, it will add "EXTRA" to the string.
    for (let i = 0; i < topping_list.length; i++) {
        const element = topping_list[i];
        
        let arr = regex.exec(evt.target.parentElement.parentElement.children[0].innerHTML);

        // Checks if there is already EXTRA in the list with that specific topping
        if (element.innerHTML.replace("- <strong>", "").replace("</strong>", "") == arr[1]) {
            element.innerHTML = `- <strong>EXTRA ${arr[1]}</strong>`;

            // Changes the buttons colors
            evt.target.parentElement.style.backgroundColor = active_color;
        } else if (find_extra.test(element.innerHTML)) {
            // Gets rid of the EXTRA tag and changes the button's color
            element.innerHTML = `- <strong>${arr[1]}</strong>`;
            evt.target.parentElement.style.backgroundColor = default_color;
        }
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

    let regex = /IMAGES\/(.*).webp/;
    let regex_extra = /EXTRA/;

    let string = "";

    let topping_list_div = document.getElementById('allToppings');

    let extra_list = [];
    
    // Clears the topping list's content
    while (topping_list_div.firstChild) {
        if (regex_extra.test(topping_list_div.lastChild.innerHTML)) {
            extra_list.push(topping_list_div.lastChild.innerHTML);
        }
        topping_list_div.removeChild(topping_list_div.lastChild);
    }
    
    // Iterates over all the toppings on the pizza image
    for (let i = all_toppings_on_pizza.length - 1; i >= 0; i--) {
        let p = document.createElement('p');

        const element = all_toppings_on_pizza[i];
        
        let arr = regex.exec(element.src);
        // Adds the INNERHTML for the P tag and adds it to the toppings list
        // Checks if the topping has extra stuff added
        if (extra_list.length > 0) {
            for (let x = 0; x < extra_list.length; x++) {
                const element = extra_list[x];
                
                if (arr[1].replace("_", " ").replace("-Right", "").replace("-Left", "") == element.replace("- <strong>", "").replace("</strong>", "").replace("EXTRA ", "")) {
                    string = element.replace("- ", "");
                    break;
                } else {
                    string = `<strong>${arr[1].replace("_", " ").replace("-Right", "").replace("-Left", "")}</strong>`;
                }
            }
        } else {
            string = `<strong>${arr[1].replace("_", " ").replace("-Right", "").replace("-Left", "")}</strong>`;
        }

        if (!checkIfDuplicateInList(string)) {
            p.innerHTML = `- ${string}`;

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

            evt.target.parentElement.children[1].style.backgroundColor = default_color;

            updatePizza(evt.target, 'whole',false);
        } else {
            evt.target.src = evt.target.src.replace('whole', 'whole_active');
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

            evt.target.parentElement.children[1].style.backgroundColor = default_color;

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

            evt.target.parentElement.children[1].style.backgroundColor = default_color;
            
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
    cart.total = 0;
    // if (cart.pizzas.length > 0) {
    // }
    cart.pizzas.forEach(pizza => {
        cart.total += pizza.totalPrice;
    });

    let cartPrice = document.getElementById('cart-total');
    cartPrice.innerText = generateDollarAmount(cart.total);
    
    showCart();
}

let showCart = () => {
    let cartDiv = document.getElementById("pizzas");
    cartDiv.innerHTML = "";

    cart.pizzas.forEach((pizza, i) => {
        // Create HTML for pizza info
        let pizzaDiv = document.createElement('div');
        pizzaDiv.setAttribute('class', 'pizza');
        cartDiv.appendChild(pizzaDiv);
        
        let pizzaLeft = document.createElement('div');
        pizzaLeft.setAttribute('class', 'pizza-left');
        pizzaDiv.appendChild(pizzaLeft);
        
        let pizzaRight = document.createElement('div');
        pizzaRight.setAttribute('class', 'pizza-right');
        pizzaDiv.appendChild(pizzaRight);

        // Populate HTML with pizza info
        // Left
        let toppingStr = "";
        
        for (let [k,v] of Object.entries(pizza.toppings)) {
            toppingStr += `${k}, `;
        }
        toppingStr = toppingStr.substr(0, toppingStr.length - 2);
        
        let leftP = document.createElement('p');
        pizzaLeft.appendChild(leftP);
        leftP.innerText = toppingStr;

        // Right
        let rightP = document.createElement('p');
        pizzaRight.appendChild(rightP);
        rightP.innerText = generateDollarAmount(pizza.totalPrice);

        let span = document.createElement('span');
        pizzaRight.appendChild(span);
        span.setAttribute('id', i);
        pizza.id = i;
        span.innerHTML = '&times;';

        span.onclick = evt => {
            cart.pizzas.forEach((pizza, i) => {
                if (i == evt.target.id) {
                    cart.pizzas = cart.pizzas.slice(0, i).concat(cart.pizzas.slice(i + 1, cart.pizzas.length));
                }
            });
            updateCart();
        };
    });
}

let addPizzaToCart = pizza => {
    cart.pizzas.push(pizza);
    updateCart();
}

let cartBtn = document.getElementById('add-to-cart-btn');
cartBtn.removeEventListener('click', addSpecialtyPizza);
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
    let toppings = document.getElementById('allToppings').querySelectorAll('p strong');

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
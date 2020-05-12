import './style.scss';
import { pizza_app } from './pizza';
import { data } from './data';

// document.getElementById('pizza').innerHTML = pizza_app;

document.getElementById('meat').addEventListener('change', selectOptions);
document.getElementById('veg').addEventListener('change', selectOptions);

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
        document.getElementById(`${evt.target.id}_whole`).addEventListener('click', changeImage);
        document.getElementById(`${evt.target.id}_right`).addEventListener('click', changeImage);
        document.getElementById(`${evt.target.id}_left`).addEventListener('click', changeImage);
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
    let images = document.getElementsByClassName('mainPizzaImage');

    let elements_list = [];

    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        elements_list.push(element);
    }

    return elements_list;
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

            img.src = `./IMAGES/${topping_name}-Left.webp`;
            img2.src = `./IMAGES/${topping_name}-Right.webp`;

            // Adds img tags to the MAIN TOPPING PIZZA div
            toppings_container.appendChild(img);
            toppings_container.appendChild(img2);
        } else {
            // Deletes the img tag
            deletesToppingFromPizza(topping_name, toppings_container,side_of_pizza);
        }

    } else if ( side_of_pizza == 'right') {

        // Checks if the button is ACTIVE or NOT ACTIVE
        if (isClicked) {
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

function changeImage(evt) {
    if (/whole/.test(evt.target.src)) {
        
        if (/whole_active.png/.test(evt.target.src)) {
            evt.target.src = evt.target.src.replace('whole_active', 'whole');
            updatePizza(evt.target, 'whole',false);
        } else {
            evt.target.src = evt.target.src.replace('whole', 'whole_active');
            updatePizza(evt.target, 'whole',true);
        }

    } else if (/right/.test(evt.target.src)) {

        if (/right_active.png/.test(evt.target.src)) {
            evt.target.src = evt.target.src.replace('right_active', 'right');
            updatePizza(evt.target, 'right', false);
        } else {
            evt.target.src = evt.target.src.replace('right', 'right_active');
            updatePizza(evt.target, 'right', true);
        }

    } else {

        if (/left_active.png/.test(evt.target.src)) {
            evt.target.src = evt.target.src.replace('left_active', 'left');
            updatePizza(evt.target, 'left', false);
        } else {
            evt.target.src = evt.target.src.replace('left', 'left_active');
            updatePizza(evt.target, 'left', true);
        }

    }
}

// JEFF CODE

let cart = {
    pizzas: [],
    total: 0.0
};

// DEPRECATED
// TODO: populate select, create json map

// Code for dynamically constructing elements
const anchor = (_innerHTML, _href = "#") => {
    let a = document.createElement('a');
    a.innerHTML = _innerHTML;
    a.href = _href;
    return a;
}
// insert anchors for each key in JSON
const populateDropdown = (dropdown, pairs) => {
    Array.prototype.forEach.call(pairs, pair => {
        for (let k of Object.keys(pair)) {
            dropdown.appendChild(anchor(k));
        }
    });
}
// End

// Code for pulling pre-built pizzas from data.js
let dropdown = document.getElementById('prebuilt-dropdown');
let prebuilt = data.prebuiltPizzas;
// populateDropdown(dropdown, prebuilt);
// ... sizes from data.js
dropdown = document.getElementById('size-dropdown');
let sizes = data.sizes;
// populateDropdown(dropdown, sizes);
// End

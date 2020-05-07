import './style.scss';
import { pizza_app } from './pizza';
import { data } from './data';

// document.getElementById('pizza').innerHTML = pizza_app;

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
populateDropdown(dropdown, prebuilt);
// ... sizes from data.js
dropdown = document.getElementById('size-dropdown');
let sizes = data.sizes;
populateDropdown(dropdown, sizes);
// End
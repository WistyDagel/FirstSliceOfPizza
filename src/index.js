import './style.scss';
import { pizza_app } from './pizza';

// document.getElementById('pizza').innerHTML = pizza_app;

document.getElementById('meat').addEventListener('change', selectOptions);
document.getElementById('veg').addEventListener('change', selectOptions);

function selectOptions(evt) {
    let selected_item = document.getElementById(evt.target.id).value;
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
    let images = document.getElementsByClassName('overlayImage');

    let elements_list = [];

    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        elements_list.push(element);
    }

    return elements_list;
}

function updatePizza(evt, item_name) {
    // Gets the button image
    // console.log(document.getElementById(`${evt.target.id}_whole`).src);

}

function changeImage(evt) {
    if (/whole/.test(evt.target.src)) {
        
        if (/whole_active.png/.test(evt.target.src)) {
            evt.target.src = evt.target.src.replace('whole_active', 'whole');
        } else {
            evt.target.src = evt.target.src.replace('whole', 'whole_active');
        }

    } else if (/right/.test(evt.target.src)) {

        if (/right_active.png/.test(evt.target.src)) {
            evt.target.src = evt.target.src.replace('right_active', 'right');
        } else {
            evt.target.src = evt.target.src.replace('right', 'right_active');
        }

    } else {

        if (/left_active.png/.test(evt.target.src)) {
            evt.target.src = evt.target.src.replace('left_active', 'left');
        } else {
            evt.target.src = evt.target.src.replace('left', 'left_active');
        }

    }
}

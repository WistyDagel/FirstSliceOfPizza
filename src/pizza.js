export const pizza_app =  `
    
<div class="navbar" id="dropdown">
<a class="navbar-title" href="index.html">Home</a>
<a href="#prebuild-pizza">House Specialties</a>
<a href="#pizza-builder">Build your Own</a>
<a href="javascript:void(0);" class="icon" onclick="dropDownFunction()">
  <i class="fa fa-bars"></i>
</a>
</div>
<div class="container">
<h2>Crescent Pizzas</h2>
<h4>Home of the signature crescent-shape cheese on every pizza!</h4>
<h3 id="thanks"></h3>
<div class="flex-container" id="cart">
    <div id="pizzas"></div>
</div>
<div class="flex-container" id="cart-checkout">
    <h5 id="cart-total"><i class="fas fa-shopping-cart"></i></h5>
    <button class="orderbtn" id="order">Order Now</button>
</div>
<h2 id="prebuild-pizza">House Specialties</h2>
    <div class="scrolling-wrapper">
        <div class="card small">
            <h5>Pepperoni</h5>
            <div class="imageWrapper">
                <img  class="overlayImage" src="./IMAGES/BasePizza.webp" />
                <div id="pizzaToppings">
                    <img class="overlayImage" src="./IMAGES/Pepperoni-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Pepperoni-Right.webp" />
                </div>
            </div>
            <div id="cardButton">
                <button class="orderbtn">Select Pizza</button>
            </div>
        </div>    
        <div class="card small">
            <h5>ThreeMeat</h5>
            <div class="imageWrapper">
                <img  class="overlayImage" src="./IMAGES/BasePizza.webp" />
                <div id="pizzaToppings">
                    <img class="overlayImage" src="./IMAGES/Pepperoni-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Pepperoni-Right.webp" />
                    <img class="overlayImage" src="./IMAGES/Canadian_Bacon-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Canadian_Bacon-Right.webp" />
                    <img class="overlayImage" src="./IMAGES/Sausage-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Sausage-Right.webp" />
                </div>
            </div>
            <div id="cardButton">
                <button class="orderbtn">Select Pizza</button>
            </div>
        </div>
        <div class="card small">
            <h5>Combination</h5>
            <div class="imageWrapper">
                <img class="overlayImage" src="./IMAGES/BasePizza.webp" />
                <div id="pizzaToppings">
                    <img class="overlayImage" src="./IMAGES/Sausage-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Sausage-Right.webp" />
                    <img class="overlayImage" src="./IMAGES/Mushrooms-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Mushrooms-Right.webp" />
                    <img class="overlayImage" src="./IMAGES/Green_Peppers-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Green_Peppers-Right.webp" />
                    <img class="overlayImage" src="./IMAGES/Black_Olives-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Black_Olives-Right.webp" />
                </div>
            </div>
            <div id="cardButton">
                <button class="orderbtn">Select Pizza</button>
            </div>
        </div>
        <div class="card small">
            <h5>BBQChicken</h5>
            <div class="imageWrapper">
                <img  class="overlayImage" src="./IMAGES/BasePizza.webp" />
                <div id="pizzaToppings">
                    <img class="overlayImage" src="./IMAGES/Grilled_Chicken-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Grilled_Chicken-Right.webp" />
                    <img class="overlayImage" src="./IMAGES/Onions-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Onions-Right.webp" />
                </div>
            </div>
            <div id="cardButton">
                <button class="orderbtn">Select Pizza</button>
            </div>
        </div>  
        <div class="card small">
            <h5>Hawaiian</h5>
            <div class="imageWrapper">
                <img  class="overlayImage" src="./IMAGES/BasePizza.webp" />
                <div id="pizzaToppings">
                    <img class="overlayImage" src="./IMAGES/Canadian_Bacon-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Canadian_Bacon-Right.webp" />
                    <img class="overlayImage" src="./IMAGES/Pineapple-Left.webp" />
                    <img class="overlayImage" src="./IMAGES/Pineapple-Right.webp" />
                </div>
            </div>
            <div id="cardButton">
                <button class="orderbtn">Select Pizza</button>
            </div>
        </div> 
    </div>
<h2 id="pizza-builder">Build Your Own</h2>
<div id="flex-container">
    <div id="currentToppings">
        <div class="row">
            <h4>Current Pizza:</h4>
            <h4 id="buildSize"></h4>
        </div>
        <div id='allToppings'></div>
    </div>
    <div id="price" class="row">
        <h4 >Price: </h4>
        <h4 id="buildPrice"></h4>
    </div>
</div>
<div class='flex-container'>
    <div id="pizzaImage">
        <div class="imageWrapper">
            <img  class="mainPizzaImage" src="./IMAGES/BasePizza.webp" />
            <div id="mainPizzaToppings"></div>
        </div>
    </div>
    <div id='sidebar'>
        <h3>Sizes</h3>
        <select id='size'>
            <option value="sm" selected>Small (12") - $7.00</option>
            <option value="md">Medium (14") - $9.00</option>
            <option value="lg">Large (16") - $12.00</option>
            <option value="xl">X-Large (18") - $15.00</option>
        </select>
        <h3>Meats</h3>
        <select id='meat'>
            <option value="default" selected>Select a Meats</option>
            <option value="Canadian Bacon">Canadian Bacon</option>
            <option value="Grilled Chicken">Grilled Chicken</option>
            <option value="Sausage">Sausage</option>
            <option value="Pepperoni">Pepperoni</option>
        </select>
        <div class="selection_option" id='meat_selection'>
            <p id='selected_meat'></p>
            <div id='meat_button' class='selection_extra'>
                <p>Add Extra?</p>
            </div>
            <img class='selection_image' id='meat_whole' src='./IMAGES/assets/whole.png' />
            <img class='selection_image' id='meat_right' src='./IMAGES/assets/right.png' />
            <img class='selection_image' id='meat_left' src='./IMAGES/assets/left.png' />
        </div>
        <h3>Veggies</h3>
        <select id='veg'>
            <option value="default" selected>Select a Veggies</option>
            <option value="Black Olives">Black Olives</option>
            <option value="Green Peppers">Green Peppers</option>
            <option value="Mushrooms">Mushrooms</option>
            <option value="Onions">Onions</option>
            <option value="Pineapple">Pineapple</option>
            <option value="Roma Tomatoes">Roma Tomatoes</option>
        </select>
        <div class="selection_option" id='veg_selection'>
            <p id='selected_veg'></p>
            <div class='selection_extra' id='veg_button'>
                <p>Add Extra?</p>
            </div>
            <img class='selection_image' id='veg_whole' src='./IMAGES/assets/whole.png' />
            <img class='selection_image' id='veg_right' src='./IMAGES/assets/right.png' />
            <img class='selection_image' id='veg_left' src='./IMAGES/assets/left.png' />
        </div>
        <button class="orderbtn" id="add-to-cart-btn">Add to Cart</button>
    </div>
</div>
<br />
<br />
<br />
</div>
<div class="flex-container footer">
<h6>First Slice of Pizza - &copy; Thing No Video</h6>
</div>

`;
export let data = {
    sizes: [
        {"Small": "sm"},
        {"Medium": "md"},
        {"Large": "lg"},
        {"Extra Large": "xl"}
    ],
    prices: [
        {"sm": "$7.00"},
        {"md": "$9.00"},
        {"lg": "$12.00"},
        {"xl": "$15.00"}
    ],
    prebuiltPizzas: [
        {"Pepperoni": {
            toppings: [
                {"Meat":[
                    "Pepperoni"
                ]}
            ]
        }},
        {"Three Meat": {
            toppings: [
                {"Meat":[
                    "Pepperoni",
                    "Canadian Bacon",
                    "Sausage"
                ]}
            ]
        }},
        {"Combination": {
            toppings: [
                {"Meat":[
                    "Sausage",
                ]},
                {"Veggies":[
                    "Mushroom",
                    "Green Peppers",
                    "Olives"
                ]}
            ]
        }},
        {"BBQ Chicken": {
            toppings: [
                {"Meat":[
                    "Grilled Chicken",
                ]},
                {"Veggies":[
                    "Onions"
                ]}
            ]
        }},
        {"Hawaiian": {
            toppings: [
                {"Meat":[
                    "Canadian Bacon"
                ]},
                {"Veggies":[
                    "Pineapple"
                ]}
            ]
        }}
    ],
    toppings: [
        {"Meat":[
            "Pepperoni",
            "Canadian Bacon",
            "Grilled Chicken",
            "Sausage"
        ]},
        {"Veggies":[
            "Black Olives",
            "Green Peppers",
            "Mushrooms",
            "Onions",
            "Pineapple",
            "Roma Tomatoes",
        ]}
    ]
}
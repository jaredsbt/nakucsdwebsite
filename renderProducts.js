// Elements
const productsE1 = document.querySelector(".products");
const cartItemsE1 = document.querySelector(".cart-items");
const subtotalE1 = document.querySelector(".subtotal");
const totalItemsInCartE1 = document.querySelector(".total-items-in-cart");

// Render Products
function renderProducts() {
    products.forEach( (product) => {
        productsE1.innerHTML += `
            <div class = "item">
                <div class = "item-container">
                    <div class = "item-img"></div>
                    <div class = "desc">
                        <h2>${product.name}</h2>
                        <h3><small>$</small>${product.price}</h3>
                        <p>${product.description}</p>
                    </div>
                    <div class = "add-to-wishlist">
                        <img src = "">
                    </div>
                    <div class = "add-to-cart" onclick = "addToCart(${product.id})">
                       <div class = "btn"><img src = "icons/cart.png" style = "width: 25px; height: 25px"></div>
                    </div>
                </div>
            </div>
        `;
    });
}
renderProducts();

// Cart Array

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// Add to Cart

function addToCart(id) {
    if(cart.some((item) => item.id == id)) {
        changeQuantity("plus", id);
    } else {

        const item = products.find((product) => product.id == id);

        cart.push({
            ...item,
            quantity: 1,
        });
    }
    
    updateCart();
}

// update cart
function updateCart() {
    renderCartItems();
    renderSubTotal();

    // Save cart to local Storage
    localStorage.setItem("CART", JSON.stringify(cart));
}


// Render SubTotal
function renderSubtotal(){ 
    let totalPrice = 0,
      totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
    });

    subtotalE1.innerHTML = `Subtotal (${totalItems} items): $$(totalPrice.toFixed(2))`;
    totalItemsInCartE1.innerHTML = totalItems;
 }


// Render Cart Items
function renderCartItems() {
    cartItemsE1.innerHTML = "";
    cart.forEach((item) => {
        cartItems.innerHTML = `
            <div class="cart-item">
                <div class="item-info" onclick="removeItemFromCart(${item.id})">
                    // <img src="${item.imgSrc}" alt="${item.name}">
                    <h4>${item.name}</h4>
                </div>
                <div class="unit-price">
                    <small>$</small>${item.price}
                </div>
                <div class="units">
                    <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                    <div class="number">${item.quantity}</div>
                    <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
                </div>
            </div>
        `;
    });
    
}

// Change quantity
function changeQuantity(action, id) {
    cart = cart.map((item) => {

        let quantity = item.quantity;

        if(item === id){
            if(action === "minus" && quantity > 1) {
                quantity--;
            } else if(action === "plus"){
                quantity++;
            }

        }

        return {
            ...item,
            quantity,
        };
    });

    updateCart();
}
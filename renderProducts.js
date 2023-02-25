// Elements
const productsE1 = document.querySelector(".products");

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
                        <img src = "icons/cart.png" style = "width: 25px; height: 25px">
                    </div>
                </div>
            </div>
        `;
    });
}
renderProducts();

// Cart Array

let cart = [];

// Add to Cart

function addToCart(id) {
    if(cart.some((item) => item.id == id)) {
        alert("Product already added!");
    } else {

    const item = products.find((product) => product.id == id);

    cart.push({
        ...item,
        quantity: 1,
    });
    }
    
    updateCart();
}

// Render Cart

function renderCartItems() {
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
}
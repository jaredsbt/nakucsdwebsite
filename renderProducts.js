// Elements
const productsE1 = document.querySelector(".products");
const cartItemsE1 = document.querySelector(".cart-items");
const subtotalE1 = document.querySelector(".subtotal");
const totalItemsInCartE1 = document.querySelector(".total-items-in-cart");

// Render Products
function renderProducts() {
    products.forEach((product) => {
        productsE1.innerHTML += `
            <div class = "item">
                <div class = "item-container">
                    <div class = "desc">
                        <h2>${product.name}</h2>
                            <div class = "flex-container-row">
                                <h2><small>$</small>${product.price}</h2>
                                <div class = "add-to-cart" onclick = "addToCart(${product.id})">
                                    <img src = "icons/cart.png" style = "width: 25px; height: 25px">
                                </div>
                            </div>
                        <div class = "product-Images"><img src = ${product.imageSrc} style = "width: 100px; height: 100px"></div>
                        <p>${product.description}</p>
                    </div>
                    <div class = "add-to-wishlist">
                        <img src = "">
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
    if(cart.some((item) => item.id === id)) {
        changeQuantity("plus", id);
    } else {

        const item = products.find((product) => product.id === id);

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

    subtotalE1.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
    totalItemsInCartE1.innerHTML = totalItems;
 }


// Render Cart Items
function renderCartItems() {
    cartItemsE1.innerHTML = "";
    cart.forEach((item) => {
        cartItemsE1.innerHTML += `
            <div class="cart-item">
                <div class = "flex-container-row">
                    <div class="item-info" onclick="removeItemFromCart(${item.id})">
                        <img src="${item.imageSrc}" alt="${item.name}" style = "width: 50px; height: 50px">
                        <h4>CLICK TO REMOVE</h4>
                    </div>
                    <div class="unit-price">
                        <small>$</small>${item.price}
                    </div>
                    <div class="units">
                        <div class = "flex-container-row">
                            <div class="btn minus" onclick="changeQuantity('minus', ${item.id})">-</div>
                            <div class="number">${item.quantity}</div>
                            <div class="btn plus" onclick="changeQuantity('plus', ${item.id})">+</div>
                        </div>           
                    </div>
                </div>
            </div>
        `;
    });
    
}

// Remove item from cart

function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
  
    updateCart();
  }

// Change quantity
function changeQuantity(action, id) {
    cart = cart.map((item) => {

        let quantity = item.quantity;

        if(item.id === id){
            if(action === "minus" && quantity > 1) {
                quantity--;
            } else if(action === "plus" && quantity < item.inStock){
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
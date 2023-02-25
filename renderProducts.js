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
                    <div class = "add-to-cart">
                        <img src = "">
                    </div>
                </div>
            </div>
        `;
    });
}
renderProducts();
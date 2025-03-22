// Sample product data (you can replace this with an API or JSON file)
const products = [
    { id: 1, name: 'Product 1', price: 20.00, image: 'images/product1.jpg', description: 'Description of product 1' },
    { id: 2, name: 'Product 2', price: 30.00, image: 'images/product2.jpg', description: 'Description of product 2' },
    { id: 3, name: 'Product 3', price: 40.00, image: 'images/product3.jpg', description: 'Description of product 3' },
    // Add more products
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('div-product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to update cart display
function updateCartDisplay() {
    const cartItemCount = document.getElementById('cart-item-count');
    cartItemCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Event listeners
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.dataset.id);
        addToCart(productId);
    }
});

// Initial rendering
renderProducts();
updateCartDisplay();

// ... (Previous JavaScript code) ...

const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Function to open the cart modal
function openCartModal() {
    cartModal.style.display = 'block';
    renderCartItems();
}

// Function to close the cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
}

// Function to render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `
            <p>${item.name} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
                <button class="quantity-change" data-id="${item.id}" data-action="decrease">-</button>
                <button class="quantity-change" data-id="${item.id}" data-action="increase">+</button>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </p>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
        total += item.price * item.quantity;
    });

    cartTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to update item quantity
function updateQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity--;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartDisplay();
}

// Function to remove item from cart
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartDisplay();
}

// Event listeners for cart modal
document.getElementById('cart-icon').addEventListener('click', openCartModal);
document.querySelector('#cart-modal .close').addEventListener('click', closeCartModal);

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('quantity-change')) {
        const productId = parseInt(event.target.dataset.id);
        const action = event.target.dataset.action;
        updateQuantity(productId, action);
    } else if (event.target.classList.contains('remove-item')) {
        const productId = parseInt(event.target.dataset.id);
        removeItem(productId);
    }
});

// ... (Previous JavaScript code) ...


let inventory = [
        { id: 1, name: 'CyberSwift', category: 'Heavy Editing', quantity: 10, price: 1227 },
        { id: 2, name: 'AeroBook', category: 'Office', quantity: 10, price: 415 },
        { id: 3, name: 'NovaEdge', category: 'Gaming', quantity: 10, price: 1520 }
    ];
    
    // Function to render the inventory list dynamically
function renderInventory() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear the list before re-rendering

    inventory.forEach(product => {
        const productItem = document.createElement('li');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <span class="product-name">${product.name}</span> 
            <span class="product-category">Category: ${product.category}</span> 
            <span class="product-quantity">Quantity: ${product.quantity}</span> 
            <span class="product-price">$${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <div class="button-container">
            <button class="increase-quantity" data-product-id="${product.id}">+</button>
            <button class="decrease-quantity" data-product-id="${product.id}">-</button>
            </div>
            <button class="remove-product" data-product-id="${product.id}">Remove</button>
        `;
        productList.appendChild(productItem);
    });
    updateTotal();
}

function updateTotal() {
    let total = 0;
    let productTotal = 0;
    // Calculate the total price by summing the quantity * price of each product
    inventory.forEach(product => {
        total += product.quantity * product.price;
        productTotal += product.quantity;
    });

    // Update the total in the HTML
    document.getElementById('inventory-total').innerText = total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('product-number').innerText = inventory.length;
    document.getElementById('product-total').innerText = productTotal;
}

// adding or updating products in the inventory
document.getElementById('add-product-button').addEventListener('click', () => {
    const name = document.getElementById('product-name').value;
    const quantity = parseInt(document.getElementById('product-quantity').value);
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value; 

    if (name && quantity > 0 && price > 0 && category) {
        const existingProduct = inventory.find(product => product.name === name && product.category === category);
        
        if (existingProduct) {
            // If product exists, update its quantity
            existingProduct.quantity += quantity;
        } else {
            // Otherwise, add new product to inventory
            const newProduct = {
                id: Date.now(), // Generate a unique ID
                name,
                quantity,
                price,
                category
            };
            inventory.push(newProduct);
        }

        // Clear input fields
        document.getElementById('product-name').value = '';
        document.getElementById('product-quantity').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-category').value = ''; 
        

        renderInventory();
    } else {
        alert('Please provide valid product details');
    }
});

// increase product quantity
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('increase-quantity')) {
        const productId = event.target.getAttribute('data-product-id');
        const product = inventory.find(p => p.id === parseInt(productId));
        if (product) {
            product.quantity++; // Increase the quantity
            renderInventory(); 
        }
    }
});

// decrease product quantity
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('decrease-quantity')) {
        const productId = event.target.getAttribute('data-product-id');
        const product = inventory.find(p => p.id === parseInt(productId));
        if (product && product.quantity > 0) {
            product.quantity--; // Decrease the quantity
            renderInventory();
        }
    }
});

// Event listener to remove a product from the inventory
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-product')) {
        const productId = event.target.getAttribute('data-product-id');
        const productIndex = inventory.findIndex(p => p.id === parseInt(productId));
        if (productIndex > -1) {
            inventory.splice(productIndex, 1); // Remove the product from inventory
            renderInventory();
        }
    }
});

// Initial render of the inventory when the page loads
renderInventory();

let toggler = document.querySelector('#togglerMode');

// Check the saved theme state from localStorage when the page loads
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('active');
    toggler.classList.replace('fa-sun', 'fa-moon');
} else {
    document.body.classList.remove('active');
    toggler.classList.replace('fa-moon', 'fa-sun');
}

// Toggle the theme when the user clicks the icon
toggler.onclick = () => {
    if (toggler.classList.contains('fa-sun')) {
        // Switch to dark mode
        toggler.classList.replace('fa-sun', 'fa-moon');
        document.body.classList.add('active');
        localStorage.setItem('theme', 'dark'); // Save the theme state to localStorage
    } else {
        // Switch to light mode
        toggler.classList.replace('fa-moon', 'fa-sun');
        document.body.classList.remove('active');
        localStorage.setItem('theme', 'light'); // Save the theme state to localStorage
    }
}
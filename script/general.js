let cart = JSON.parse(localStorage.getItem("cart")) || [];
let like = JSON.parse(localStorage.getItem("like")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

const cartButtons = document.querySelectorAll(".cart-btn");

if (cart.length === 0){
    document.getElementById('cart-count').innerText = '';
}
else{
    document.getElementById('cart-count').innerText = cart.length ? cart.length : '';
}

if (like.length === 0){
    document.getElementById('like-count').innerText = '';
}
else{
    document.getElementById('like-count').innerText = like.length ? like.length : '';
}

function viewCart() {
    closeLike();
    // Display the cart section
    let cartSection = document.getElementById('cart-section');
    let cartItems = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');
    let cartMsg = document.getElementById('msg');
    let cartTotalText = document.getElementById('total');

    // Clear current cart items
    cartItems.innerHTML = '';

    if(cart.length > 0){
        cartMsg.style.display = 'none';
        cartTotalText.style.display = 'block';
    }
    else{
        cartMsg.style.display = 'block';
        cartTotalText.style.display = 'none';
    }

    // Add all items in the cart
    cart.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
    });

    // Update total price

    cartTotal.innerText = total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Show cart section
    cartSection.style.display = 'block';

    // Prevent default behavior if this is triggered by a link or button
    event?.preventDefault?.(); 
}

function removeFromCart(index) {
    // Remove the selected item from the cart
    total -= cart[index].price;
    cart.splice(index, 1);

    // Save updated cart and total to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total);

    // Update cart count and total
    if (cart.length === 0){
        document.getElementById('cart-count').innerText = '';
    }
    else{
        document.getElementById('cart-count').innerText = cart.length;
    }

    viewCart();  // Refresh cart view
}

function checkout() {
    const cartSection = document.querySelector('.cart-section');
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Thank you for your purchase!');
        cart = [];
        total = 0;

         // Save empty cart to localStorage
         localStorage.setItem("cart", JSON.stringify(cart));
         localStorage.setItem("total", total);

        document.getElementById('cart-count').innerText = '';
        document.getElementById('cart-total').innerText = '0.00';
        viewCart();
    }
    cartSection.style.display = 'none';
}

function closeCart() {
    const cartSection = document.querySelector('.cart-section');
    cartSection.style.display = 'none';
}

const likeButtons = document.querySelectorAll("#like-btn");

function viewLike() {
    closeCart();

    // Display the like section
    let likeSection = document.getElementById('like-section');
    let likeItems = document.getElementById('like-items');
    let likeMsg = document.getElementById('likemsg');

    // Clear current like items
    likeItems.innerHTML = '';

    if(like.length > 0){
        likeMsg.style.display = 'none';
    }
    else{
        likeMsg.style.display = 'block';
    }
    // Add all items in the like
    like.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `${item.name} <button onclick="removeFromLike(${index})">Remove</button>`;
        likeItems.appendChild(li);
    });

    // Show like section
    likeSection.style.display = 'block';

    // Prevent default behavior if this is triggered by a link or button
    event?.preventDefault?.(); 
}

function removeAll() {
    const likeSection = document.querySelector('.like-section');
    if (like.length === 0) {
        alert('Your likes is empty!');
    } else {
        alert('Successfully removed all items');
        like = [];
        localStorage.setItem("like", JSON.stringify(like));
        document.getElementById('like-count').innerText = '';
        viewLike();
    }
    likeSection.style.display = 'none';
}

function removeFromLike(index) {
    like.splice(index, 1);

    localStorage.setItem("like", JSON.stringify(like));

    // Update like count and total
    if (like.length === 0){
        document.getElementById('like-count').innerText = '';
    }
    else{
        document.getElementById('like-count').innerText = like.length ? like.length : '';
    }

    viewLike();  // Refresh like view
}

function closeLike() {
    const likeSection = document.querySelector('.like-section');
    likeSection.style.display = 'none';
}


// Select the dropdown toggle and menu
const isLoggedIn = localStorage.getItem("isLoggedIn");
const userDropdown = document.querySelector('.user-dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItem = document.querySelector(".dropdown-item");

// Check login status and update dropdown text
if (isLoggedIn) {
    // If the user is logged in, show "Logout"
    dropdownItem.textContent = "Logout";
    dropdownItem.href = "#"; // Set link to trigger logout action
} else {
    // If the user is not logged in, show "Login"
    dropdownItem.textContent = "Login";
    dropdownItem.href = "login.html"; // Redirect to login page
}

// Add event listener for logout
dropdownItem.addEventListener("click", function (e) {
    if (isLoggedIn) {
        e.preventDefault(); // Prevent default behavior (if logout)
        // Remove the login data from localStorage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");

        // Redirect to login page
        window.location.href = "login.html"; // Redirect to login page
    }
});

// Toggle the dropdown menu on click of the user icon
userDropdown.addEventListener('click', function (event) {
    // Prevent page refresh for the user icon click only
    const target = event.target;
    if (target.tagName === 'A' && target.classList.contains('fa-user')) {
        event.preventDefault();
    }

    event.stopPropagation(); 
    this.classList.toggle('active'); 
});

// Close the dropdown when clicking outside of it
document.addEventListener('click', function () {
    userDropdown.classList.remove('active'); 
    
});

function viewMore() {
    closeCart();
    closeLike();

    const aboutPopup = document.querySelector('.about-popup');

    // Show like section
    aboutPopup.style.display = 'block';

    // Prevent default behavior if this is triggered by a link or button
    event.preventDefault(); 
}

function closeMore() {
    const aboutPopup = document.querySelector('.about-popup');
    aboutPopup.style.display = 'none';
}



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

window.onload = function() {
    const username = localStorage.getItem("username");
    if (username) { // Check if username is not null or empty
        document.getElementById('profile').innerHTML = `User: ${username}`;
    }
    else{
        cart = [];
        like=[];
        total = 0;
        document.getElementById('like-count').innerText = '';
        document.getElementById('cart-count').innerText = '';
    }
 }
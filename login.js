const users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = localStorage.getItem("username");

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

const adminUsername = "admin";
const adminPassword = "admin";

document.querySelector("#loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); 
    // Get the username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");
    const errorMessage = document.getElementById("errorMessage");

    // Clear previous messages
    loginMessage.textContent = "";
    errorMessage.textContent = "";

    // Check if the username and password match any user in the array
    const user = users.find(user => user.username === username && user.password === password);

    if (username === adminUsername && password === adminPassword) {
        // Successful login
        loginMessage.textContent = "Login successful! Redirecting to Admin Panel...";

        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = "admin.html"; // Simulate redirection
        }, 2000);
    }
    
    else if (user) {
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', username);

        // Successful login
        loginMessage.textContent = "Login successful! Redirecting to Home Page...";
        
        loadUserData();

        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = "index.html"; // Simulate redirection
        }, 2000);
    }

    else{
        // Invalid username or password
        errorMessage.textContent = "Invalid username or password.";
    }
});

// Function to show the "Add New User" form
// Add event listener to the Sign Up link
document.querySelector(".sign-up").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    // Hide the login form
    document.getElementById("loginForm").style.display = "none";
    // Show the add user form
    document.getElementById("addUserForm").style.display = "block";
});

// Function to hide the "Add New User" form and return to login form
document.querySelector(".sign-in").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    // Hide the add user form
    document.getElementById("addUserForm").style.display = "none";
    // Show the login form
    document.getElementById("loginForm").style.display = "block";
});

// Function to add a new user
document.querySelector("#addUserForm Form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const addUserErrorMessage = document.getElementById("addUserErrorMessage");
    const addUserSuccessMessage = document.getElementById("addUserSuccessMessage");

    // Clear previous messages
    addUserErrorMessage.textContent = "";
    addUserSuccessMessage.textContent = "";

    // Check if the new username already exists
    if (users.some((user) => user.username === newUsername)) {
        addUserErrorMessage.textContent = "Username already exists. Please choose another one.";
        setTimeout(() => {
            addUserErrorMessage.textContent = "";
        }, 2000);
        return;
    }
    else if(newUsername === adminUsername) {
        addUserErrorMessage.textContent = "Username already exists. Please choose another one.";
        return;
    }

    // Add the new user to the array
    users.push({ username: newUsername, password: newPassword });
     saveUsers(users);


    // Display success message
    addUserSuccessMessage.textContent = "New user added successfully!";

    setTimeout(() => {
        document.getElementById("newUsername").value = "";
        document.getElementById("newPassword").value = "";
        addUserSuccessMessage.textContent = "";
    }, 2000);
});

// Initialize user data on page load
if (currentUser) {
    loadUserData();
}

function loadUserData() {
    if (currentUser) {
        cart = JSON.parse(localStorage.getItem(`${currentUser}_cart`)) || [];
        like = JSON.parse(localStorage.getItem(`${currentUser}_like`)) || [];
        total = parseFloat(localStorage.getItem(`${currentUser}_total`)) || 0;

        // Update UI counts
        document.getElementById('cart-count').innerText = cart.length ? cart.length : '';
        document.getElementById('like-count').innerText = like.length ? like.length : '';
    }
}


///////////////

let cart = [];
let like = [];

const cartButtons = document.querySelectorAll(".cart-btn");

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
        document.getElementById('like-count').innerText = '';
        viewLike();
    }
    likeSection.style.display = 'none';
}

function closeLike() {
    const likeSection = document.querySelector('.like-section');
    likeSection.style.display = 'none';
}

////////////////////////////////

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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
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
        cart = [];
        like=[];
        total = 0;

        // Redirect to login page
        window.location.href = "login.html"; // Redirect to login page
    }
});

////////////////////////////////////////////////////

function saveCart() {
    if (currentUser) {
        localStorage.setItem(`${currentUser}_cart`, JSON.stringify(cart));
        localStorage.setItem(`${currentUser}_total`, total);
        
    }
}

function saveLike() {
    if (currentUser) {
        localStorage.setItem(`${currentUser}_like`, JSON.stringify(like));
    }
}

/////////////////////////////////////////////////

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

//////////////////////

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
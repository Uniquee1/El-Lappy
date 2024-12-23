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


// Select the dropdown toggle and menu
const userDropdown = document.querySelector('.user-dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');

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
    
toggler.onclick = () =>{

    if(toggler.classList.contains('fa-sun')){
        toggler.classList.replace('fa-sun', 'fa-moon');
        document.body.classList.add('active');
    }else{
        toggler.classList.replace('fa-moon', 'fa-sun');
        document.body.classList.remove('active');
    }
}
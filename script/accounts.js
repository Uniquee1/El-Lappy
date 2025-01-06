//admin page starts
// Utility functions for LocalStorage
function loadUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Initialize users if not present in LocalStorage
if (!localStorage.getItem("users")) {
    saveUsers([
        { username: "boniel", password: "joel" },
        { username: "admin", password: "admin" }
    ]);
}
////////////////////////////////////////////////////////////////////////////

// Render the list of users in the HTML
function renderUsers() {
    const users = loadUsers();
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; // Clear the list before re-rendering

    // Loop through each user and create an HTML list item
    users.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="user-name">UN: ${user.username}</span><span class="user-pass">PW: ${user.password}</span>`;

        // Create Modify and Delete buttons for each user
        const modifyButton = document.createElement("button");
        modifyButton.textContent = "Modify";
        modifyButton.classList.add("action-button");
        modifyButton.onclick = () => openModifyForm(user.username);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("action-button");
        deleteButton.onclick = () => deleteUser(user.username);

        li.appendChild(modifyButton);
        li.appendChild(deleteButton);

        userList.appendChild(li);
    });
}

// Function to add a new user
function addUser() {
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    if (!newUsername || !newPassword) {
        alert("Please provide both username and password.");
        return;
    }

    const users = loadUsers();

    // Check if the username already exists
    if (users.some((user) => user.username === newUsername)) {
        alert("Username already exists. Please choose another.");
        return;
    }

     // Add the new user
     users.push({ username: newUsername, password: newPassword });
     saveUsers(users);

    // Clear input fields
    document.getElementById("newUsername").value = "";
    document.getElementById("newPassword").value = "";

    // Re-render the user list
    renderUsers();
}

// Function to delete a user
function deleteUser(username) {
    const users = loadUsers();
    const updatedUsers = users.filter((user) => user.username !== username);
    saveUsers(updatedUsers);
    renderUsers();
}

// Function to open the modify form with the user details
function openModifyForm(username) {
    document.getElementById("modify-user-section").style.display = "block";
    const user = loadUsers().find((user) => user.username === username);
    if (user) {
        document.getElementById("modifyUsername").value = user.username;
        document.getElementById("modifiedPassword").value = user.password;
        document.getElementById("modifyUserBtn").onclick = () => modifyUser(user.username);
    } else {
        console.log(`User not found for modify: ${username}`);
    }
}

// Function to modify user details
function modifyUser(originalUsername) {
    const newUsername = document.getElementById("modifyUsername").value;
    const newPassword = document.getElementById("modifiedPassword").value;

    if (!newUsername || !newPassword) {
        alert("Please provide both username and password.");
        return;
    }

    const users = loadUsers();
    const user = users.find((user) => user.username === originalUsername);
    if (user) {
        user.username = newUsername;
        user.password = newPassword;
        saveUsers(users);
        // Clear input fields
        document.getElementById("modifyUsername").value = "";
        document.getElementById("modifiedPassword").value = "";

        // Re-render the user list
        renderUsers();
    } else {
        console.log(`User not found for modify: ${originalUsername}`);
    }
    
    setTimeout(() => {
        document.getElementById("modify-user-section").style.display = "none";
    }, 1000);
}

// Add event listener for the Add User button
document.getElementById("add-user-btn").addEventListener('click', addUser);

// Call renderUsers to initially populate the list
document.addEventListener('DOMContentLoaded', renderUsers);
//adminpage ends

////////////////////////////////////////////////////////////////////////////////////////////


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
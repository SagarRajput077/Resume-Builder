// console.log("hello");

function signup() {
    var email = document.getElementById('signupEmail').value.trim();
    var password = document.getElementById('signupPassword').value.trim();

    // Validate email and password
    if (email === '' || password === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Retrieve existing user data from local storage or initialize an empty array
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email is already registered
    var existingUser = users.find(function (user) {
        return user.email === email;
    });

    // If the email is already registered, show an error message
    if (existingUser) {
        alert('This email is already registered. Please use a different email.');
        return;
    }

    // Add the new user to the array
    var newUser = {
        email: email,
        password: password
    };
    users.push(newUser);

    // Store the updated array of users in local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Optionally, redirect to the home page or show a success message
    alert('Sign up successful!');
    window.location.href = 'index.html'; // Redirect to the home page
}



function logIn() {
    var email = document.getElementById('loginEmail').value.trim();
    var password = document.getElementById('loginPassword').value.trim();

    // Validate email and password
    if (email === '' || password === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Retrieve the list of users from local storage
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with the matching email and password
    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    // If user is found, login successful
    if (user) {
        alert('Login successful! Now you can create your resume..');
        // Optionally, redirect to a new page or handle login success
        window.location.href = 'resume.html'; // Redirect to resume page
    } else {
        // If user is not found, show error message
        alert('Incorrect email or password. Please enter valid email and password.');
    }
}
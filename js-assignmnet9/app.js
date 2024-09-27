const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

let users = {};

// Fetching user data from dummyjson API
fetch('https://dummyjson.com/users')
  .then(response => response.json())
  .then(data => {
    data.users.forEach(user => {
      users[user.username] = user.password;
    });
  })
  .catch(error => console.error('Error fetching user data:', error));

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validate if username or password is missing
  if (username === '' || password === '') {
    errorMessage.textContent = 'Please enter both username and password';
    return;
  }

  // Validate if credentials are correct
  if (users[username] === password) {
    console.log('Login successful!');

    // Redirecting to the desired page after successful login
    window.location.href = './ecommerce/index.html'; // Update this URL as per your project structure
  } else {
    errorMessage.textContent = 'Invalid username or password';
  }
});

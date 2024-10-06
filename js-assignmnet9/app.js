const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();  // Prevent the default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: email,  // Assuming you're using email as username
                password: password,
                expiresInMins: 30,  // Optional, defaults to 60
            }),
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store the access token in localStorage
            localStorage.setItem('accessToken', data.token);
            console.log("Login successful! Token stored.");

            // Redirect or perform other actions after successful login
            window.location.href = "./ecommerce-store/index.html"; // Redirect to the dashboard page (example)
        } else {
            console.error("Login failed", data);
            alert("Login failed: " + data.message);  // Show error message
        }
    } catch (error) {
        console.error("Error during login", error);
        alert("An error occurred during login.");
    }
});
const formContainer2 = document.getElementById("formContainer");

// Handle registration form toggle
document.getElementById("register_btn").addEventListener("click", function () {
    formContainer.innerHTML = `
        <!-- Registration form starts here -->
        <form id="registerForm" class="md:max-w-md w-full mx-auto">
            <div class="mb-12">
                <h3 class="text-4xl font-extrabold text-yellow-500">Register</h3>
            </div>

            <div>
                <div class="relative flex items-center">
                    <input name="fullName" id="fullName" type="text" required class="w-full text-sm border-b border-gray-300 focus:border-yellow-500 px-2 py-3 outline-none" placeholder="Enter full name" />
                </div>
            </div>

            <div class="mt-8">
                <div class="relative flex items-center">
                    <input name="email" id="registerEmail" type="email" required class="w-full text-sm border-b border-gray-300 focus:border-yellow-500 px-2 py-3 outline-none" placeholder="Enter email" />
                </div>
            </div>

            <div class="mt-8">
                <div class="relative flex items-center">
                    <input name="password" type="password" id="registerPassword" required class="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
                </div>
            </div>

            <div class="mt-12">
                <button type="submit" id="register_submit" class="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-amber-500 hover:bg-amber-700 focus:outline-none">
                    Register
                </button>
                <p class="text-gray-800 text-sm text-center mt-6">Already have an account? <a href="javascript:void(0);" class="text-amber-500 font-semibold hover:underline ml-1" id="login_btn">Sign in here</a></p>
            </div>
        </form>
        <!-- Registration form ends here -->
    `;

    // Add event listener for the "Sign in here" link to switch back to login
    document.getElementById("login_btn").addEventListener("click", function () {
        window.location.reload(); // Reload the page to return to the login form
    });
});

            // Handle registration submit
            document.getElementById("register_submit").addEventListener("click", function (e) {
                e.preventDefault();
                const fullName = document.getElementById("fullName").value;
                const email = document.getElementById("registerEmail").value;
                const password = document.getElementById("registerPassword").value;

                // Store user info in localStorage
                const user = {
                    fullName,
                    email,
                    password
                };
                localStorage.setItem("user", JSON.stringify(user));

                // Redirect to e-commerce page after registration
                window.location.href = "./ecommerce-store/index.html";
            });
    
            const loginForm2 = document.getElementById("loginForm");
            const formContainer = document.getElementById("formContainer");
            
            // Handle login form submission
            loginForm.addEventListener("submit", async (event) => {
                event.preventDefault(); // Prevent the default form submission
            
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;
            
                try {
                    const response = await fetch('https://dummyjson.com/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: email, // Assuming you're using email as username
                            password: password,
                            expiresInMins: 30, // Optional, defaults to 60
                        }),
                    });
            
                    const data = await response.json();
            
                    if (response.ok) {
                        // Store the access token in localStorage
                        localStorage.setItem('accessToken', data.token);
                        console.log("Login successful! Token stored.");
            
                        // Redirect to the e-commerce page after successful login
                        window.location.href = "./ecommerce-store/index.html";
                    } else {
                        console.error("Login failed", data);
                        alert("Login failed: " + data.message); // Show error message
                    }
                } catch (error) {
                    console.error("Error during login", error);
                    alert("An error occurred during login.");
                }
            });
            
            // Handle registration form toggle
            document.getElementById("register_btn").addEventListener("click", function () {
                formContainer.innerHTML = `
                    <!-- Registration form starts here -->
                    <form id="registerForm" class="md:max-w-md w-full mx-auto">
                        <div class="mb-12">
                            <h3 class="text-4xl font-extrabold text-yellow-500">Register</h3>
                        </div>
            
                        <div>
                            <div class="relative flex items-center">
                                <input name="fullName" id="fullName" type="text" required class="w-full text-sm border-b border-gray-300 focus:border-yellow-500 px-2 py-3 outline-none" placeholder="Enter full name" />
                            </div>
                        </div>
            
                        <div class="mt-8">
                            <div class="relative flex items-center">
                                <input name="email" id="registerEmail" type="email" required class="w-full text-sm border-b border-gray-300 focus:border-yellow-500 px-2 py-3 outline-none" placeholder="Enter email" />
                            </div>
                        </div>
            
                        <div class="mt-8">
                            <div class="relative flex items-center">
                                <input name="password" type="password" id="registerPassword" required class="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
                            </div>
                        </div>
            
                        <div class="mt-12">
                            <button type="submit" id="register_submit" class="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-amber-500 hover:bg-amber-700 focus:outline-none">
                                Register
                            </button>
                            <p class="text-gray-800 text-sm text-center mt-6">Already have an account? <a href="javascript:void(0);" class="text-amber-500 font-semibold hover:underline ml-1" id="login_btn">Sign in here</a></p>
                        </div>
                    </form>
                    <!-- Registration form ends here -->
                `;
            
                // Add event listener for the "Sign in here" link to switch back to login
                document.getElementById("login_btn").addEventListener("click", function () {
                    window.location.reload(); // Reload the page to return to the login form
                });
            
                // Handle registration submit
                document.getElementById("registerForm").addEventListener("submit", function (e) {
                    e.preventDefault();
                    const fullName = document.getElementById("fullName").value;
                    const email = document.getElementById("registerEmail").value;
                    const password = document.getElementById("registerPassword").value;
            
                    // Store user info in localStorage
                    const user = {
                        fullName,
                        email,
                        password,
                    };
                    localStorage.setItem("user", JSON.stringify(user));
            
                    // Redirect to e-commerce page after registration
                    window.location.href = "./ecommerce-store/index.html";
                });
            });
            
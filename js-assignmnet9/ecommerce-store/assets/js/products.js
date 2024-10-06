// Fetch products from the DummyJSON API
const loadProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=200');
    const data = await response.json();
    const products = data.products;

    // Group products by categories
    const groupedProducts = groupProductsByCategory(products);

    // Display products grouped by categories
    displayProductsByGroup(groupedProducts);

    // Attach event listeners after products are displayed
    attachEventListeners();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Group products by categories
const groupProductsByCategory = (products) => {
  const grouped = {};

  products.forEach((product) => {
    if (!grouped[product.category]) {
      grouped[product.category] = [];
    }
    grouped[product.category].push(product);
  });

  return grouped;
};

// Display products grouped by categories
const displayProductsByGroup = (groupedProducts) => {
  const productGrid = document.querySelector('#product-grid');
  productGrid.innerHTML = ''; // Clear the previous grid content

  for (const category in groupedProducts) {
    // Create category section
    const categorySection = document.createElement('div');
    categorySection.classList.add('mb-8');

    // Category title
    const categoryTitle = document.createElement('h2');
    categoryTitle.classList.add('text-4xl', 'text-center', 'font-bold', 'mb-4');
    categoryTitle.textContent = category;
    categorySection.appendChild(categoryTitle);

    // Product grid for the category
    const categoryGrid = document.createElement('div');
    categoryGrid.classList.add(
      'grid',
      'grid-cols-2',
      'sm:grid-cols-2',
      'md:grid-cols-3',
      'lg:grid-cols-4',
      'gap-6'
    );

    groupedProducts[category].forEach((product) => {
      const productCard = `
        <div class="product-card group relative border p-4">
          <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-64 object-cover"/>
          <div class="mt-4">
            <h3 class="text-lg font-medium">${product.title}</h3>
            <p class="text-gray-600">$${product.price}</p>
          </div>
          <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center space-x-4 transition duration-300 ease-in-out">
            <button class="add-to-cart p-2 bg-white rounded-full shadow-lg" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-thumbnail="${product.thumbnail}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </button>
            <button class="wishlist p-2 bg-white rounded-full shadow-lg" data-id="${product.id}" data-title="${product.title}" data-thumbnail="${product.thumbnail}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
          </div>
        </div>
      `;
      categoryGrid.innerHTML += productCard;
    });

    categorySection.appendChild(categoryGrid);
    productGrid.appendChild(categorySection);
  }
};

// Function to handle the "Add to Cart" button click
const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter();
  alert(`${product.title} has been added to your cart.`);
};

// Function to handle the "Wishlist" button click
const addToWishlist = (product) => {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist.push(product);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistCounter();
  alert(`${product.title} has been added to your wishlist.`);
};

// Attach event listeners for "Add to Cart" and "Wishlist" buttons
const attachEventListeners = () => {
  const cartButtons = document.querySelectorAll('.add-to-cart');
  const wishlistButtons = document.querySelectorAll('.wishlist');

  cartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');
      const productTitle = button.getAttribute('data-title');
      const productPrice = button.getAttribute('data-price');
      const productThumbnail = button.getAttribute('data-thumbnail');

      const product = {
        id: productId,
        title: productTitle,
        price: productPrice,
        thumbnail: productThumbnail,
      };

      addToCart(product);
    });
  });

  wishlistButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');
      const productTitle = button.getAttribute('data-title');
      const productThumbnail = button.getAttribute('data-thumbnail');

      const product = {
        id: productId,
        title: productTitle,
        thumbnail: productThumbnail,
      };

      addToWishlist(product);
    });
  });
};

// Function to update the cart counter
const updateCartCounter = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  cartCountElement.textContent = cartItems.length;
};

// Function to update the wishlist counter
const updateWishlistCounter = () => {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistCountElement = document.getElementById('wishlist-count');
  wishlistCountElement.textContent = wishlistItems.length;
};

// Load products when the page loads
window.onload = loadProducts;

document.addEventListener('DOMContentLoaded', () => {
  // Fetch cart and wishlist counts from localStorage
  updateCartCounter();
  updateWishlistCounter();
});
//view cart
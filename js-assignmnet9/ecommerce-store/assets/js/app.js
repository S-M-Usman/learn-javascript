// Fetch products from DummyJSON API
async function fetchTrendingProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=6'); // Fetch 6 products
      const data = await response.json();
      renderTrendingProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  
  // Function to render Trending Products
  fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => renderTrendingProducts(data.products));

function renderTrendingProducts(products) {
  const productsGrid = document.getElementById('products-grid');
  products.slice(0, 6).forEach(product => {
    const productHTML = `
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div class="w-full h-60">
          <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-full object-cover">
        </div>
        <div class="p-4">
          <h3 class="text-md font-semibold text-gray-800 mb-1">${product.title}</h3>
          <p class="text-lg font-bold text-gray-900">$${product.price.toFixed(2)}</p>
          <div class="flex items-center mt-1 text-sm">
            <span class="text-yellow-500">${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span class="ml-2 text-gray-500">${product.rating} Reviews</span>
          </div>
        </div>
      </div>
    `;
    productsGrid.innerHTML += productHTML;
  });
}


  
  
  // Fetch users and their posts from DummyJSON API
  async function fetchBlogPosts() {
    try {
      const response = await fetch('https://dummyjson.com/posts?limit=6'); // Fetch 6 posts
      const data = await response.json();
      renderBlogPosts(data.posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  }
  
  // Function to render Blog Posts
  function renderBlogPosts(posts) {
    const blogGrid = document.getElementById('blog-grid');
    posts.forEach(post => {
      const postHTML = `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer" onclick="redirectToProduct(${post.id})">
          <div class="p-4">
            <h3 class="text-xl font-semibold text-gray-800">${post.title}</h3>
            <p class="text-gray-600">${post.body.substring(0, 100)}...</p>
            <a href="#" class="inline-block mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">Read More</a>
          </div>
        </div>
      `;
      blogGrid.innerHTML += postHTML;
    });
  }
  
  // Fetch categories
  function fetchCategories() {
    const categories = [
      { id: 1, name: 'Smartphones', image: 'https://via.placeholder.com/200x200', link: 'products.html?id=1' },
      { id: 2, name: 'Laptops', image: 'https://via.placeholder.com/200x200', link: 'product.html?id=2' },
      { id: 3, name: 'Fragrances', image: 'https://via.placeholder.com/200x200', link: 'products.html?id=3' },
      { id: 4, name: 'Skincare', image: 'https://via.placeholder.com/200x200', link: 'products.html?id=4' },
    ];
    renderCategories(categories);
  }
  
  // Function to render Categories
  function renderCategories(categories) {
    const categoriesGrid = document.getElementById('categories-grid');
    categories.forEach(category => {
      const categoryHTML = `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer" onclick="redirectToProduct(${category.id})">
          <img src="${category.image}" alt="${category.name}" class="w-full h-48 object-cover">
          <div class="p-4 text-center">
            <h3 class="text-xl font-semibold text-gray-800">${category.name}</h3>
            <a href="${category.link}" class="inline-block mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">Explore</a>
          </div>
        </div>
      `;
      categoriesGrid.innerHTML += categoryHTML;
    });
  }
  
  // Redirect to product.html with the product ID
  function redirectToProduct(id) {
    window.location.href = `products.html?id=${id}`;
  }
  
  // Call the functions to fetch data and render content when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    fetchTrendingProducts();
    fetchCategories();
    fetchBlogPosts();
  });
  // JavaScript for toggling mobile menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  let products = [];
const productsPerPage = 200;

// Fetch products from the DummyJSON API
const loadProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=200');
    const data = await response.json();
    products = data.products;

    // Group products by categories
    const groupedProducts = groupProductsByCategory(products);

    // Display products grouped by categories
    displayProductsByGroup(groupedProducts);
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
    categoryTitle.classList.add('text-4xl','text-center', 'font-bold', 'mb-4');
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
            <button class="add-to-cart p-2 bg-white rounded-full shadow-lg">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
            </button>
            <button class="wishlist p-2 bg-white rounded-full shadow-lg">
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

// Load products when the page loads
window.onload = loadProducts;

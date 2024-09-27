let productsByCategory = {};
let topRatedProducts = [];

const fetchProducts = async () => {
  const productApi = await fetch("https://dummyjson.com/products?limit=200");
  const data = await productApi.json();
  return data;
};

const renderProducts = (products, containerId) => {
  const productContainer = document.getElementById(containerId);
  productContainer.innerHTML = ""; // Clear the container

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = product.thumbnail || "https://via.placeholder.com/250"; // Fallback image

    const title = document.createElement("h3");
    title.textContent = product.title;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    price.classList.add("price");

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityInput.style.width = "50px";
    quantityInput.style.margin = "10px 0";

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.onclick = () => addToCart(product, parseInt(quantityInput.value));

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(quantityInput);
    card.appendChild(button);

    productContainer.appendChild(card);
  });
};

const addToCart = (product, quantity) => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === product.id
  );

  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    cartItems.push({ ...product, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  alert(`${quantity} ${product.title}(s) added to cart`);
};

const renderCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((category) => {
    const section = document.createElement("div");
    section.innerHTML = `<h2 class="section-title">${category}</h2>
                                     <div id="category-${category}" class="container"></div>`;
    categoriesContainer.appendChild(section);

    renderProducts(productsByCategory[category], `category-${category}`);
  });
};

const init = async () => {
  const productsData = await fetchProducts();
  const products = productsData.products;

  products.forEach((product) => {
    // Group products by category
    const category = product.category;
    if (!productsByCategory[category]) {
      productsByCategory[category] = [];
    }
    productsByCategory[category].push(product);

    // Filter top-rated products (rating > 4.5)
    if (product.rating > 4.5) {
      topRatedProducts.push(product);
    }
  });

  // Render categories and top-rated products
  renderCategories(Object.keys(productsByCategory));
  renderProducts(topRatedProducts, "top-rated-container");
};

init();
const cartContainer = document.getElementById("cart-container");
const totalElement = document.getElementById("total");

const renderCart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  let total = 0;

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");

    const title = document.createElement("h3");
    title.textContent = item.title;

    const price = document.createElement("p");
    price.textContent = `$${item.price} x ${item.quantity}`;

    itemInfo.appendChild(title);
    itemInfo.appendChild(price);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(item.id);

    cartItem.appendChild(itemInfo);
    cartItem.appendChild(removeButton);

    cartContainer.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
};

const removeFromCart = (id) => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems = cartItems.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
};

renderCart();


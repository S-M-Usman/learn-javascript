// Fetch API resources function
const fetchApiResource = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch response");
  return response.json();
};

// Function to get and combine user data from API
const getUserData = async () => {
  try {
    const [users, posts, albums, comments, photos, todos] = await Promise.all([
      fetchApiResource("https://jsonplaceholder.typicode.com/users"),
      fetchApiResource("https://jsonplaceholder.typicode.com/posts"),
      fetchApiResource("https://jsonplaceholder.typicode.com/albums"),
      fetchApiResource("https://jsonplaceholder.typicode.com/comments"),
      fetchApiResource("https://jsonplaceholder.typicode.com/photos"),
      fetchApiResource("https://jsonplaceholder.typicode.com/todos"),
    ]);

    return users.map((user) => {
      const userPosts = posts.filter((post) => post.userId === user.id);
      const userComments = comments.filter((comment) =>
        userPosts.some((post) => comment.postId === post.id)
      );
      const userAlbums = albums.filter((album) => album.userId === user.id);
      const userPhotos = photos.filter((photo) =>
        userAlbums.some((album) => photo.albumId === album.id)
      );
      const userTodos = todos.filter((todo) => todo.userId === user.id);

      return {
        ...user,
        posts: userPosts,
        comments: userComments,
        albums: userAlbums,
        photos: userPhotos,
        todos: userTodos,
      };
    });
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

// Function to load full profile details
const viewFullProfile = (userId) => {
  const userProfilePage = document.getElementById("user-profile-page");
  const userBoard = document.getElementById("user-cards-board");

  const selectedUser = window.userData.find((user) => user.id === userId);

  // Display first 6 photos and the "View All Photos" button if there are more than 6 photos
  const firstSixPhotos = selectedUser.photos.slice(0, 6);
  const remainingPhotos = selectedUser.photos.slice(6);

  userProfilePage.innerHTML = `
    <div class="bg-gradient-to-r from-slate-900 to-slate-700 p-6 shadow-md rounded-lg max-w-2xl mx-auto text-white">
      <h2 class="text-2xl font-bold mb-4">${selectedUser.name} (@${
    selectedUser.username
  })</h2>
      <p class="mb-2"><strong>Email:</strong> ${selectedUser.email}</p>
      <p class="mb-2"><strong>Phone:</strong> ${selectedUser.phone}</p>
      <p class="mb-2"><strong>Website:</strong> <a href="http://${
        selectedUser.website
      }" target="_blank" class="text-blue-500">${selectedUser.website}</a></p>
      <p class="mb-4"><strong>Company:</strong> ${selectedUser.company.name}</p>
      <p class="mb-4"><strong>Address:</strong> ${
        selectedUser.address.street
      }, ${selectedUser.address.city}</p>

      <h3 class="text-lg font-semibold mt-6">Posts (${
        selectedUser.posts.length
      }):</h3>
      <ul class="list-disc pl-5 mb-4">
        ${selectedUser.posts.map((post) => `<li>${post.title}</li>`).join("")}
      </ul>

      <h3 class="text-lg font-semibold mt-6">Albums (${
        selectedUser.albums.length
      }):</h3>
      <ul class="list-disc pl-5 mb-4">
        ${selectedUser.albums
          .map((album) => `<li>${album.title}</li>`)
          .join("")}
      </ul>

      <h3 class="text-lg font-semibold mt-6">Photos (${
        selectedUser.photos.length
      }):</h3>
      <div id="photo-gallery" class="grid grid-cols-3 gap-4 mb-4">
        ${firstSixPhotos
          .map(
            (photo) => `
          <div class="photo">
            <img src="${photo.thumbnailUrl}" alt="${photo.title}" class="w-full h-auto rounded">
            <p class="text-sm mt-2">${photo.title}</p>
          </div>
        `
          )
          .join("")}
      </div>

      ${
        remainingPhotos.length > 0
          ? `
      <button id="view-all-photos-btn" onclick="viewAllPhotos(${userId})" class="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 via-rose-500 to-violet-600 text-white rounded">
        View All Photos
      </button>`
          : ""
      }

      <h3 class="text-lg font-semibold mt-6">Todos (${
        selectedUser.todos.length
      }):</h3>
      <ul class="list-disc pl-5 mb-4">
        ${selectedUser.todos
          .map(
            (todo) => `
          <li ${todo.completed ? 'class="line-through text-gray-500"' : ""}>
            ${todo.title}
          </li>
        `
          )
          .join("")}
      </ul>

      <button onclick="closeProfile()" class="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 via-rose-500 to-violet-600 text-white rounded">Back to Profiles</button>
    </div>
  `;

  userProfilePage.classList.remove("hidden");
  userBoard.classList.add("hidden");
};

// Function to display all photos when "View All Photos" is clicked
const viewAllPhotos = (userId) => {
  const selectedUser = window.userData.find((user) => user.id === userId);

  const remainingPhotos = selectedUser.photos.slice(6);
  const photoGallery = document.getElementById("photo-gallery");

  // Append remaining photos to the gallery
  remainingPhotos.forEach((photo) => {
    const photoElement = document.createElement("div");
    photoElement.classList.add("photo");
    photoElement.innerHTML = `
      <img src="${photo.thumbnailUrl}" alt="${photo.title}" class="w-full h-auto rounded">
      <p class="text-sm mt-2">${photo.title}</p>
    `;
    photoGallery.appendChild(photoElement);
  });

  // Hide the "View All Photos" button
  const viewAllPhotosBtn = document.getElementById("view-all-photos-btn");
  if (viewAllPhotosBtn) {
    viewAllPhotosBtn.style.display = "none";
  }
};

// Close the detailed profile and return to the list
const closeProfile = () => {
  const userProfilePage = document.getElementById("user-profile-page");
  const userBoard = document.getElementById("user-cards-board");

  userProfilePage.classList.add("hidden");
  userBoard.classList.remove("hidden");
};

// Initialize the dashboard
getUserData().then((userData) => {
  window.userData = userData;
  const userBoard = document.getElementById("user-cards-board");

  userData.forEach((user) => {
    const card = `
      <div class="card bg-gray-400 text-white p-4 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <div class="name text-lg font-semibold">${user.username}</div>
        <div class="name">${user.name}</div>
        <div class="about">${user.email}</div>
        <div class="about">${user.phone}</div>
        <div class="about">${user.website}</div>
        <div class="social-share mt-4">
          <div class="row flex items-center">
            <i class="fas fa-image"></i>
            <span class="ml-2">${user.photos.length} Photos</span>
          </div>
          <div class="row flex items-center mt-2">
            <i class="far fa-comment"></i>
            <span class="ml-2">${user.comments.length} Comments</span>
          </div>
        </div>
        <div class="buttons mt-4">
          <button onclick="viewFullProfile(${user.id})" class="px-4 py-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded">View More</button>
        </div>
      </div>
    `;
    userBoard.innerHTML += card;
  });
});

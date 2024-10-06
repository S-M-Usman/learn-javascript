document.addEventListener('DOMContentLoaded', function () {
    const postList = document.getElementById('posts');

    // Fetch users and posts simultaneously
    Promise.all([
        fetch('https://dummyjson.com/users?limit=100').then(response => response.json()),
        fetch('https://dummyjson.com/posts?limit=100').then(response => response.json())
    ])
    .then(([usersData, postsData]) => {
        const users = usersData.users;
        const posts = postsData.posts;

        posts.forEach(post => {
            // Find the post's author using the userId; if not found, show fallback data
            const user = users.find(user => user.id === post.userId);
            
            // Use fallback data if no user is found
            const userName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";
            const userEmail = user ? user.email : "No email available";
            const userImage = user && user.image ? user.image : 'https://via.placeholder.com/150'; // Placeholder image
            
            const postElement = document.createElement('div');
            postElement.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-6');

            postElement.innerHTML = `
                <div class="flex items-center space-x-4 mb-4">
                    <img class="w-12 h-12 rounded-full" src="${userImage}" alt="${userName}">
                    <div>
                        <h2 class="text-lg font-semibold">${userName}</h2>
                        <p class="text-sm text-gray-500">${userEmail}</p>
                    </div>
                </div>
                <h3 class="text-xl font-bold mb-2">${post.title}</h3>
                <p class="text-gray-700 mb-4">${post.body}</p>
                <div class="flex items-center space-x-2 mb-4">
                    ${post.tags.map(tag => `<span class="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded">${tag}</span>`).join('')}
                </div>
                <div id="comments-${post.id}" class="comments space-y-2"></div>
            `;

            postList.appendChild(postElement);

            // Fetch comments for the post
            fetch(`https://dummyjson.com/posts/${post.id}/comments`)
                .then(response => response.json())
                .then(commentData => {
                    const commentsDiv = document.getElementById(`comments-${post.id}`);
                    commentData.comments.forEach(comment => {
                        const commentElement = document.createElement('div');
                        commentElement.classList.add('flex', 'space-x-2', 'items-center', 'border-t', 'pt-2');
                        commentElement.innerHTML = `
                            <p class="text-gray-700"><strong>${comment.user.username}</strong>: ${comment.body}</p>
                        `;
                        commentsDiv.appendChild(commentElement);
                    });
                })
                .catch(error => {
                    console.error('Error fetching comments:', error);
                    const commentsDiv = document.getElementById(`comments-${post.id}`);
                    commentsDiv.innerHTML = `<p class="text-gray-500">No comments available.</p>`;
                });
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});

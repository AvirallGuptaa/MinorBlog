// script.js

document.addEventListener('DOMContentLoaded', loadPosts);

let posts = JSON.parse(localStorage.getItem('posts')) || [];

function addPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title === '' || content === '') {
        alert('Please enter both a title and content');
        return;
    }

    const newPost = {
        id: Date.now(),
        title,
        content
    };

    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    loadPosts();
}

function loadPosts() {
    const blogPostsContainer = document.getElementById('blogPosts');
    blogPostsContainer.innerHTML = ''; // Clear previous posts

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
            <h3><a href="post-details.html?id=${post.id}">${post.title}</a></h3>
            <p>${post.content}</p>
            <div class="edit" onclick="editPost(${post.id})">Edit</div>
            <div class="delete" onclick="deletePost(${post.id})">Delete</div>
        `;
        blogPostsContainer.appendChild(postElement);
    });
}

function editPost(id) {
    const post = posts.find(post => post.id === id);
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;

    deletePost(id); // Remove post so we can edit and re-add it
}

function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}

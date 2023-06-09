const postContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 3;
let page = 1;

// Fetch the post from API
async function getPosts() {
    // Await fetch request
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}_page=${page}`
    );

    // Get data back
    // Use await since res.json() returns a promise with the data
    const data = await res.json();

    // This will return as a promise, so when we'll use it we have to use async/await
    return data;
}

// Show posts in DOM
async function showPosts() {
    // getPosts returns a promise so we need to await on that
    const posts = await getPosts();

    // For each post, create a new element
    posts.forEach((post) => {});
}

//Show initial posts
showPosts();

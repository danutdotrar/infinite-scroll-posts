const postContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// Fetch the post from API
async function getPosts() {
    // Await fetch request
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
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
    posts.forEach((post) => {
        // Create a post div
        const postEl = document.createElement("div");
        postEl.classList.add("post");

        // Create HTML structure
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
                <div class="post-info">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-body">
                        ${post.body}
                    </p>
                </div>
        `;
        postContainer.appendChild(postEl);
    });
}

// Filter posts by input
function filterPosts(e) {
    // Get whats typed
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll(".post");

    // posts will return a NodeList which is basically an array, so loop trough
    posts.forEach((post) => {
        const title = post.querySelector(".post-title").innerText.toUpperCase();
        const body = post.querySelector(".post-body").innerText.toUpperCase();

        // indexOf will search for anything that's passed in input
        // If it doesn't match, it returns -1
        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = "flex";
        } else {
            post.style.display = "none";
        }
    });
}

// Show initial posts
showPosts();

// Show loader and fetch more posts
function showLoading() {
    loading.classList.add("show");

    setTimeout(() => {
        loading.classList.remove("show");

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
}

window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

filter.addEventListener("input", filterPosts);

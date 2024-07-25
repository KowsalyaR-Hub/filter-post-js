async function fetchAndFilterPosts(keyword) {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const resultsDiv = document.getElementById('results');

    // Clear previous results
    resultsDiv.innerHTML = '';

    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);

        // Check if the response status is OK (200-299)
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
        }

        // Parse the JSON data
        const posts = await response.json();

        // Filter posts where the title contains the keyword
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(keyword.toLowerCase())
        );

        // Check if there are any filtered posts
        if (filteredPosts.length > 0) {
            // Display filtered posts
            filteredPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
                resultsDiv.appendChild(postElement);
            });
        } else {
            // Display a message if no posts are found
            resultsDiv.innerHTML = `<p>No posts found with the keyword "${keyword}" in the title.</p>`;
        }

    } catch (error) {
        // Display error message
        resultsDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`;
    }
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', () => {
    const keyword = document.getElementById('search-input').value.trim();
    if (keyword) {
        fetchAndFilterPosts(keyword);
    } else {
        // Display a message if the input is empty
        document.getElementById('results').innerHTML = '<p>Please enter a keyword to search.</p>';
    }
});

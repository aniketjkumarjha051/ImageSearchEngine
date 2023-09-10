const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const imageResults = document.getElementById("image-results");

const API_KEY = "YOUR_BING_API_KEY"; // Replace with your Bing Image Search API key

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
        searchImages(searchTerm);
    }
});

function searchImages(query) {
    const apiUrl = `https://api.bing.microsoft.com/v7.0/images/search?q=${query}&count=10`;

    fetch(apiUrl, {
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY
        }
    })
    .then(response => response.json())
    .then(data => {
        const imageUrls = data.value.map(item => item.contentUrl);
        displayResults(imageUrls);
    })
    .catch(error => {
        console.error("Error fetching image results:", error);
    });
}

function displayResults(imageUrls) {
    imageResults.innerHTML = "";
    imageUrls.forEach(url => {
        const imageElement = document.createElement("img");
        imageElement.src = url;
        imageResults.appendChild(imageElement);
    });
}

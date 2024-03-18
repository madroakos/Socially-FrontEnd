const searchBar = document.getElementById("searchBar");
const dropDown = document.getElementById("dropDown");
const postsContainer = document.getElementById('posts-container');

function toggleDropdown(show) {
    dropDown.classList[show ? 'add' : 'remove']("show");
    if (!show) {
        searchBar.value = null;
        removeAllChildNodes(dropDown);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function loadPostsFromSelectedUser(user) {
    removeAllChildNodes(postsContainer);
    const newPostButton = document.getElementById('newPostButton');
    if (newPostButton) {
        newPostButton.remove();
    }
    loadPostsByUser(user);
}

function handleSearch() {
    removeAllChildNodes(dropDown);

    if (searchBar.value.length === 0) {
        removeAllChildNodes(dropDown);
    } else {
        fetch(`http://localhost:8080/searchForUser?username=${searchBar.value}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.length !== 0) {
                    data.forEach(user => {
                        let currentResult = document.createElement('a');
                        currentResult.innerText = user.username;
                        currentResult.setAttribute('href', `javascript:void(0);`);
                        currentResult.addEventListener('click', () => loadPostsFromSelectedUser(user.username));
                        dropDown.appendChild(currentResult);
                    })
                }
            })
    }
}

document.addEventListener("DOMContentLoaded", function() {
    searchBar.addEventListener('input', handleSearch);
    searchBar.addEventListener('focus', () => toggleDropdown(true));
    searchBar.addEventListener('focusout', () => setTimeout(() => toggleDropdown(false), 100));
});
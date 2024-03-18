const newPost = document.getElementById("newPost");
const newPostButton = document.getElementById("newPostButton");
const newPostComment = document.getElementById("newPostComment");
const remainingCounter = document.getElementById('remainingCounter');
const submitButton = document.getElementById('submitButton');

function toggleNewPostDropDown() {
    newPost.classList.toggle('hidden');
    newPostButton.classList.toggle('rotateNewPostButton');
    newPostComment.value = '';
}

function updateRemainingCounter() {
    remainingCounter.innerText = (200 - newPostComment.value.length).toString();
}

function sendPostRequest() {
    fetch('http://localhost:8080/submitPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`},
        body: JSON.stringify({ postContent: newPostComment.value })
    })
        .then(response => {
            if (response.ok) {
                console.log('Post saved successfully');
                toggleNewPostDropDown();
                location.reload();
            } else {
                throw new Error('Error saving post');
            }
        });
}

newPostButton.addEventListener('click', () => {toggleNewPostDropDown()});
newPostComment.addEventListener('input', updateRemainingCounter);
submitButton.addEventListener('click', sendPostRequest);
async function initLikes() {
    if (!tokenExists()) return;

    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/likes", { 
        headers: { "Authorization": `Bearer ${token}` } 
    });
    if (!response.ok) return;

    const likes = await response.json();
    const tbody = document.getElementById("data");
    likes.forEach(like => {
        let row = `<tr>`;
        row += `<td>${like.userId}</td>`;
        row += `<td>${like.postId}</td>`;
        row += `<td>${like.createdAt}</td>`;
        row += `<td>${like.updatedAt}</td>`;
        row += `<td><button type="button" class="btn-danger" onclick="deleteLike(${like.userId}, ${like.postId})">&#x1f5d1;</button></td>`;
        row += `</tr>`;
        tbody.innerHTML += row;
    });
}

async function resetLikes() {
    const tbody = document.getElementById("data");
    tbody.innerHTML = "";
    await initLikes();
}

async function addNewLike() {
    const userIdInput = document.getElementById("newUserIdInput");
    const postIdInput = document.getElementById("newPostIdInput");

    const data = { userId: userIdInput.value, postId: postIdInput.value };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/likes", { 
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    $("#addLikeModal").modal("hide");
    userIdInput.value = "";
    postIdInput.value = "";
    await resetLikes();
}

async function deleteLike(userId, postId) {
    const token = getCookie("token");
    const data = { userId: userId, postId: postId };
    const response = await fetch("http://localhost:8000/api/likes", {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    await resetLikes();
}
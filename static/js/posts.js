async function initPosts() {
    if (!tokenExists()) return;

    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/posts", { 
        headers: { "Authorization": `Bearer ${token}` } 
    });
    if (!response.ok) return;

    const posts = await response.json();
    const tbody = document.getElementById("data");
    posts.forEach(post => {
        let row = `<tr>`;
        row += `<td>${post.id}</td>`;
        row += `<td>${post.text}</td>`;
        row += `<td>${post.userId}</td>`;
        row += `<td>${post.groupId}</td>`;
        row += `<td>${post.parentId}</td>`;
        row += `<td>${post.createdAt}</td>`;
        row += `<td>${post.updatedAt}</td>`;
        row += `<td><button type="button" class="btn-warning" onclick="initEditModal(${post.id})">&#9998;</button>`;
        row += `<button type="button" class="btn-danger" onclick="deletePost(${post.id})">&#x1f5d1;</button></td>`;
        row += `</tr>`;
        tbody.innerHTML += row;
    });
}

async function resetPosts() {
    const tbody = document.getElementById("data");
    tbody.innerHTML = "";
    await initPosts();
}

async function addNewPost() {
    const textInput = document.getElementById("newTextInput");
    const userIdInput = document.getElementById("newUserIdInput");
    const groupIdInput = document.getElementById("newGroupIdInput");
    const parentIdInput = document.getElementById("newParentIdInput");

    const data = { text: textInput.value, userId: userIdInput.value, groupId: groupIdInput.value, parentId: parentIdInput.value };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/posts", { 
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    $("#addPostModal").modal("hide");
    textInput.value = "";
    userIdInput.value = "";
    groupIdInput.value = "";
    parentIdInput.value = "";
    await resetPosts();
}

async function initEditModal(id) {
    const token = getCookie("token");
    const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) return;
    const post = await response.json();
    document.getElementById("editIdInput").value = post.id;
    document.getElementById("editTextInput").value = post.text;
    document.getElementById("editUserIdInput").value = post.userId;
    document.getElementById("editGroupIdInput").value = post.groupId;
    document.getElementById("editParentIdInput").value = post.parentId;
    $("#editPostModal").modal("show");
}

async function editPost() {
    const idInput = document.getElementById("editIdInput");
    const textInput = document.getElementById("editTextInput");
    const userIdInput = document.getElementById("editUserIdInput");
    const groupIdInput = document.getElementById("editGroupIdInput");
    const parentIdInput = document.getElementById("editParentIdInput");

    const data = { id: idInput.value, text: textInput.value, userId: userIdInput.value, groupId: groupIdInput.value, parentId: parentIdInput.value };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/posts", { 
        method: "PUT",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    await resetPosts();
    $("#editPostModal").modal("hide");
}

async function deletePost(id) {
    const token = getCookie("token");
    const data = { id: id };
    const response = await fetch("http://localhost:8000/api/posts", {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    await resetPosts();
}
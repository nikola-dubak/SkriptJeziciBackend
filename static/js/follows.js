async function initFollows() {
    if (!tokenExists()) return;

    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/follows", { 
        headers: { "Authorization": `Bearer ${token}` } 
    });
    if (!response.ok) return;

    const follows = await response.json();
    const tbody = document.getElementById("data");
    follows.forEach(follow => {
        let row = `<tr>`;
        row += `<td>${follow.followerId}</td>`;
        row += `<td>${follow.followedId}</td>`;
        row += `<td>${follow.createdAt}</td>`;
        row += `<td>${follow.updatedAt}</td>`;
        row += `<td><button type="button" class="btn-danger" onclick="deleteFollow(${follow.followerId}, ${follow.followedId})">&#x1f5d1;</button></td>`;
        row += `</tr>`;
        tbody.innerHTML += row;
    });
}

async function resetFollows() {
    const tbody = document.getElementById("data");
    tbody.innerHTML = "";
    await initFollows();
}

async function addNewFollow() {
    const followerIdInput = document.getElementById("newFollowerIdInput");
    const followedIdInput = document.getElementById("newFollowedIdInput");

    const data = { followerId: followerIdInput.value, followedId: followedIdInput.value };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/follows", { 
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    $("#addFollowModal").modal("hide");
    followerIdInput.value = "";
    followedIdInput.value = "";
    await resetFollows();
}

async function deleteFollow(followerId, followedId) {
    const token = getCookie("token");
    const data = { followerId: followerId, followedId: followedId };
    const response = await fetch("http://localhost:8000/api/follows", {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    await resetFollows();
}
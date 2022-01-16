async function initGroupMembers() {
    if (!tokenExists()) return;

    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/groupMembers", { 
        headers: { "Authorization": `Bearer ${token}` } 
    });
    if (!response.ok) return;

    const groupMembers = await response.json();
    const tbody = document.getElementById("data");
    groupMembers.forEach(groupMember => {
        let row = `<tr>`;
        row += `<td>${groupMember.userId}</td>`;
        row += `<td>${groupMember.groupId}</td>`;
        row += `<td>${groupMember.createdAt}</td>`;
        row += `<td>${groupMember.updatedAt}</td>`;
        row += `<td><button type="button" class="btn-danger" onclick="deleteGroupMember(${groupMember.userId}, ${groupMember.groupId})">&#x1f5d1;</button></td>`;
        row += `</tr>`;
        tbody.innerHTML += row;
    });
}

async function resetGroupMembers() {
    const tbody = document.getElementById("data");
    tbody.innerHTML = "";
    await initGroupMembers();
}

async function addNewGroupMember() {
    const userIdInput = document.getElementById("newUserIdInput");
    const groupIdInput = document.getElementById("newGroupIdInput");

    const data = { userId: userIdInput.value, groupId: groupIdInput.value };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/groupMembers", { 
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    $("#addGroupMemberModal").modal("hide");
    userIdInput.value = "";
    groupIdInput.value = "";
    await resetGroupMembers();
}

async function deleteGroupMember(userId, groupId) {
    const token = getCookie("token");
    const data = { userId: userId, groupId: groupId };
    const response = await fetch("http://localhost:8000/api/groupMembers", {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    await resetGroupMembers();
}
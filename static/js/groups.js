async function initGroups() {
    if (!tokenExists()) return;

    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/groups", { 
        headers: { "Authorization": `Bearer ${token}` } 
    });
    if (!response.ok) return;

    const groups = await response.json();
    const tbody = document.getElementById("data");
    groups.forEach(group => {
        let row = `<tr>`;
        row += `<td>${group.id}</td>`;
        row += `<td>${group.name}</td>`;
        row += `<td>${group.description}</td>`;
        row += `<td>${group.ownerId}</td>`;
        row += `<td>${group.createdAt}</td>`;
        row += `<td>${group.updatedAt}</td>`;
        row += `<td><button type="button" class="btn-warning" onclick="initEditModal(${group.id})">&#9998;</button>`;
        row += `<button type="button" class="btn-danger" onclick="deleteGroup(${group.id})">&#x1f5d1;</button></td>`;
        row += `</tr>`;
        tbody.innerHTML += row;
    });
}

async function resetGroups() {
    const tbody = document.getElementById("data");
    tbody.innerHTML = "";
    await initGroups();
}

async function addNewGroup() {
    const nameInput = document.getElementById("newNameInput");
    const descriptionInput = document.getElementById("newDescriptionInput");
    const ownerIdInput = document.getElementById("newOwnerIdInput");

    const data = { name: nameInput.value, description: descriptionInput.value, ownerId: ownerIdInput.value };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/groups", { 
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    $("#addGroupModal").modal("hide");
    nameInput.value = "";
    descriptionInput.value = "";
    ownerIdInput.value = "";
    await resetGroups();
}

async function initEditModal(id) {
    const token = getCookie("token");
    const response = await fetch(`http://localhost:8000/api/groups/${id}`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) return;
    const group = await response.json();
    document.getElementById("editIdInput").value = group.id;
    document.getElementById("editNameInput").value = group.name;
    document.getElementById("editDescriptionInput").value = group.description;
    document.getElementById("editOwnerIdInput").value = group.ownerId;
    $("#editGroupModal").modal("show");
}

async function editGroup() {
    const idInput = document.getElementById("editIdInput");
    const nameInput = document.getElementById("editNameInput");
    const descriptionInput = document.getElementById("editDescriptionInput");
    const ownerIdInput = document.getElementById("editOwnerIdInput");

    const data = { id: editIdInput.value, name: nameInput.value, description: descriptionInput.value, ownerId: ownerIdInput.value };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/groups", { 
        method: "PUT",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    await resetGroups();
    $("#editGroupModal").modal("hide");
}

async function deleteGroup(id) {
    const token = getCookie("token");
    const data = { id: id };
    const response = await fetch("http://localhost:8000/api/groups", {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    await resetGroups();
}
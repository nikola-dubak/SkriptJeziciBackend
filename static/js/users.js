async function initUsers() {
    if (!tokenExists()) return;

    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/users", { 
        headers: { "Authorization": `Bearer ${token}` } 
    });
    if (!response.ok) return;

    const users = await response.json();
    const tbody = document.getElementById("data");
    users.forEach(user => {
        let row = `<tr id="${user.id}">`;
        row += `<td>${user.id}</td>`;
        row += `<td>${user.email}</td>`;
        row += `<td>${user.password}</td>`;
        row += `<td>${user.role}</td>`;
        row += `<td>${user.isBanned}</td>`;
        row += `<td>${user.createdAt}</td>`;
        row += `<td>${user.updatedAt}</td>`;
        row += `<td><button type="button" class="btn-warning" onclick="initEditModal(${user.id})">&#9998;</button>`;
        row += `<button type="button" class="btn-danger" onclick="deleteUser(${user.id})">&#x1f5d1;</button></td>`;
        row += `</tr>`;
        tbody.innerHTML += row;
    });
}

async function resetUsers() {
    const tbody = document.getElementById("data");
    tbody.innerHTML = "";
    await initUsers();
}

async function addNewUser() {
    const emailInput = document.getElementById("newEmailInput");
    const passwordInput = document.getElementById("newPasswordInput");
    const roleInput = document.getElementById("newRoleInput");

    const data = { email: emailInput.value, password: passwordInput.value, role: roleInput.value };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/users", { 
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    $("#addUserModal").modal("hide");
    emailInput.value = "";
    passwordInput.value = "";
    await resetUsers();
}

async function initEditModal(id) {
    const token = getCookie("token");
    const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) return;
    const user = await response.json();
    document.getElementById("editUserId").value = user.id;
    document.getElementById("editEmailInput").value = user.email;
    document.getElementById("editPasswordInput").value = user.password;
    document.getElementById("editRoleInput").value = user.role;
    document.getElementById("editIsBanned").value = user.isBanned;
    $("#editUserModal").modal("show");
}

async function editUser() {
    const userId = document.getElementById("editUserId").value;
    const email = document.getElementById("editEmailInput").value;
    const password = document.getElementById("editPasswordInput").value;
    const role = document.getElementById("editRoleInput").value;
    const isBanned = document.getElementById("editIsBanned").value;

    const data = { id: userId, email: email, password: password, role: role, isBanned: isBanned };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/users", { 
        method: "PUT",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    await resetUsers();
    $("#editUserModal").modal("hide");
}

async function deleteUser(id) {
    const token = getCookie("token");
    const data = { id: id };
    const response = await fetch("http://localhost:8000/api/users", {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    await resetUsers();
}
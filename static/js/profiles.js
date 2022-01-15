async function initProfiles() {
    if (!tokenExists()) return;
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/profiles", { 
        headers: { "Authorization": `Bearer ${token}` } 
    });
    if (!response.ok) return;

    const profiles = await response.json();
    const tbody = document.getElementById("data");
    profiles.forEach(profile => {
        let row = `<tr>`;
        row += `<td>${profile.userId}</td>`;
        row += `<td>${profile.name}</td>`;
        row += `<td>${profile.profilePicturePath}</td>`;
        row += `<td>${profile.birthday}</td>`;
        row += `<td>${profile.education}</td>`;
        row += `<td>${profile.work}</td>`;
        row += `<td>${profile.city}</td>`;
        row += `<td>${profile.relationship}</td>`;
        row += `<td>${profile.createdAt}</td>`;
        row += `<td>${profile.updatedAt}</td>`;
        row += `<td><button type="button" class="btn-warning" onclick="initEditModal(${profile.userId})">&#9998;</button>`;
        row += `<button type="button" class="btn-danger" onclick="deleteProfile(${profile.userId})">&#x1f5d1;</button></td>`;
        row += `</tr>`;
        tbody.innerHTML += row;
    });
}

async function resetProfiles() {
    const tbody = document.getElementById("data");
    tbody.innerHTML = "";
    await initProfiles();
}

async function addNewProfile() {
    const userIdInput = document.getElementById("newUserIdInput");
    const nameInput = document.getElementById("newNameInput");
    const profilePicturePathInput = document.getElementById("newprofilePicturePathInput");
    const birthdayInput = document.getElementById("newBirthdayInput");
    const educationInput = document.getElementById("newEducationInput");
    const workInput = document.getElementById("newWorkInput");
    const cityInput = document.getElementById("newCityInput");
    const relationshipInput = document.getElementById("newRelationshipInput");

    const data = { 
        userId: userIdInput.value,
        name: nameInput.value,
        profilePicturePath: profilePicturePathInput.value,
        birthday: birthdayInput.value,
        education: educationInput.value,
        work: workInput.value,
        city: cityInput.value,
        relationship: relationshipInput.value
    };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/profiles", { 
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    $("#addProfileModal").modal("hide");
    userIdInput.value = "";
    nameInput.value = "";
    profilePicturePathInput.value = "";
    birthdayInput.value = "";
    educationInput.value = "";
    workInput.value = "";
    cityInput.value = "";
    await resetProfiles();
}

async function initEditModal(userId) {
    const token = getCookie("token");
    const response = await fetch(`http://localhost:8000/api/profiles/${userId}`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) return;
    const profile = await response.json();
    document.getElementById("editUserIdInput").value = profile.userId;
    document.getElementById("editNameInput").value = profile.name;
    document.getElementById("editprofilePicturePathInput").value = profile.profilePicturePath;
    document.getElementById("editBirthdayInput").value = profile.birthday;
    document.getElementById("editEducationInput").value = profile.education;
    document.getElementById("editWorkInput").value = profile.work;
    document.getElementById("editCityInput").value = profile.city;
    document.getElementById("editRelationshipInput").value = profile.relationship;
    $("#editProfileModal").modal("show");
}

async function editProfile() {
    const userIdInput = document.getElementById("editUserIdInput");
    const nameInput = document.getElementById("editNameInput");
    const profilePicturePathInput = document.getElementById("editprofilePicturePathInput");
    const birthdayInput = document.getElementById("editBirthdayInput");
    const educationInput = document.getElementById("editEducationInput");
    const workInput = document.getElementById("editWorkInput");
    const cityInput = document.getElementById("editCityInput");
    const relationshipInput = document.getElementById("editRelationshipInput");

    const data = { 
        userId: userIdInput.value,
        name: nameInput.value,
        profilePicturePath: profilePicturePathInput.value,
        birthday: birthdayInput.value,
        education: educationInput.value,
        work: workInput.value,
        city: cityInput.value,
        relationship: relationshipInput.value
    };

    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/profiles", { 
        method: "PUT",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    await resetProfiles();
    $("#editProfileModal").modal("hide");
}

async function deleteProfile(userId) {
    const token = getCookie("token");
    const data = { userId: userId };
    const response = await fetch("http://localhost:8000/api/profiles", {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    await resetProfiles();
}
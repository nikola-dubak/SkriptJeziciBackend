async function initReports() {
    if (!tokenExists()) return;

    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/reports", { 
        headers: { "Authorization": `Bearer ${token}` } 
    });
    if (!response.ok) return;

    const reports = await response.json();
    const tbody = document.getElementById("data");
    reports.forEach(report => {
        let row = `<tr>`;
        row += `<td>${report.id}</td>`;
        row += `<td>${report.type}</td>`;
        row += `<td>${report.isConfirmed}</td>`;
        row += `<td>${report.reporterId}</td>`;
        row += `<td>${report.postId}</td>`;
        row += `<td>${report.reviewerId}</td>`;
        row += `<td>${report.createdAt}</td>`;
        row += `<td>${report.updatedAt}</td>`;
        row += `<td><button type="button" class="btn-warning" onclick="initEditModal(${report.id})">&#9998;</button>`;
        row += `<button type="button" class="btn-danger" onclick="deleteReport(${report.id})">&#x1f5d1;</button></td>`;
        row += `</tr>`;
        tbody.innerHTML += row;
    });
}

async function resetReports() {
    const tbody = document.getElementById("data");
    tbody.innerHTML = "";
    await initReports();
}

async function addNewReport() {
    const typeInput = document.getElementById("newTypeInput");
    const reporterIdInput = document.getElementById("newReporterIdInput");
    const postIdInput = document.getElementById("newPostIdInput");

    const data = { type: typeInput.value, reporterId: reporterIdInput.value, postId: postIdInput.value };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/reports", {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    $("#addReportModal").modal("hide");
    reporterIdInput.value = "";
    postIdInput.value = "";
    await resetReports();
}

async function initEditModal(id) {
    const token = getCookie("token");
    const response = await fetch(`http://localhost:8000/api/reports/${id}`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) return;
    const report = await response.json();
    document.getElementById("editIdInput").value = report.id;
    document.getElementById("editReporterIdInput").value = report.reporterId;
    document.getElementById("editPostIdInput").value = report.postId;
    document.getElementById("editTypeInput").value = report.type;
    document.getElementById("editIsConfirmedInput").value = report.isConfirmed;
    document.getElementById("editReviewerIdInput").value = report.reviewerId;
    $("#editReportModal").modal("show");
}

async function editReport() {
    const idInput = document.getElementById("editIdInput");
    const reporterIdInput = document.getElementById("editReporterIdInput");
    const postIdInput = document.getElementById("editPostIdInput");
    const typeInput = document.getElementById("editTypeInput");
    const isConfirmedInput = document.getElementById("editIsConfirmedInput");
    const reviewerIdInput = document.getElementById("editReviewerIdInput");

    const data = {
        id: idInput.value,
        reporterId: reporterIdInput.value,
        postId: postIdInput.value,
        type: typeInput.value,
        isConfirmed: isConfirmedInput.value,
        reviewerId: reviewerIdInput.value        
    };
    const token = getCookie("token");
    const response = await fetch("http://localhost:8000/api/reports", { 
        method: "PUT",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) return;
    await resetReports();
    $("#editReportModal").modal("hide");
}

async function deleteReport(id) {
    const token = getCookie("token");
    const data = { id: id };
    const response = await fetch("http://localhost:8000/api/reports", {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    await resetReports();
}
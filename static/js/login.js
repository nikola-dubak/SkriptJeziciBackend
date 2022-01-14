function addButtonListener() {
    document.getElementById("loginButton").addEventListener("click", async event => {
        event.preventDefault();
        var errorAlert = document.getElementById("errorAlert");
        try {
            if (!document.getElementById("loginForm").checkValidity()) {
                throw "Form not valid";
            }
            errorAlert.innerText = "";
            errorAlert.hidden = true;
            const loginData = {
                email: document.getElementById("emailInput").value,
                password: document.getElementById("passwordInput").value
            };
            const result = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });
            const json = await result.json();
            if (!json.token) {
               throw json;
            }
            document.cookie = `token=${json.token}`;
            window.location.href = "/admin/";
        } catch (err) {
            errorAlert.innerText = err;
            errorAlert.hidden = false;
        }
    });
}
const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cookieParser());

function checkAuth(token, response, role) {  
    if (token == null) {
        response.redirect("/admin/login");
        return false;
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (user.role != role && user.role != "admin") {
            response.redirect("/admin/login");
            return false;
        }
    } catch (error) {
        response.redirect("/admin/login");
        return false;
    }   

    return true;
}

const router = express.Router();

router.get("/", (request, response) => {
    response.redirect("/admin/home");
});

router.get("/home", (request, response) => {
    if (!checkAuth(request.cookies.token, response, "moderator")) return;
    response.sendFile("home.html", { root: "./static" });
});

router.get("/users", (request, response) => {
    if (!checkAuth(request.cookies.token, response)) return;
    response.sendFile("users.html", { root: "./static" });
});

router.get("/profiles", (request, response) => {
    if (!checkAuth(request.cookies.token, response)) return;
    response.sendFile("profiles.html", { root: "./static" });
});

router.get("/groups", (request, response) => {
    if (!checkAuth(request.cookies.token, response)) return;
    response.sendFile("groups.html", { root: "./static" });
});

router.get("/posts", (request, response) => {
    if (!checkAuth(request.cookies.token, response)) return;
    response.sendFile("posts.html", { root: "./static" });
});

router.get("/follows", (request, response) => {
    if (!checkAuth(request.cookies.token, response)) return;
    response.sendFile("follows.html", { root: "./static" });
});

router.get("/likes", (request, response) => {
    if (!checkAuth(request.cookies.token, response)) return;
    response.sendFile("likes.html", { root: "./static" });
});

router.get("/reports", (request, response) => {
    if (!checkAuth(request.cookies.token, response, "moderator")) return;
    response.sendFile("reports.html", { root: "./static" });
});

router.get("/groupMembers", (request, response) => {
    if (!checkAuth(request.cookies.token, response)) return;
    response.sendFile("groupMembers.html", { root: "./static" });
});

app.use("/admin/", router);

app.get("/admin/login", (request, response) => {
    response.sendFile("login.html", { root: "./static" });
});

app.use("/admin/js", express.static(path.join(__dirname, "static/js")));

app.listen({ port: 7000 });
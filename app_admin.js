const express = require("express");
const path = require("path");

const app = express();

const router = express.Router();

router.get("/login", (request, response) => {
    response.sendFile("login.html", { root: "./static" });
});

router.get("/", (request, response) => {
    response.redirect("/admin/home");
});

router.get("/home", (request, response) => {
    response.sendFile("home.html", { root: "./static" });
});

router.get("/users", (request, response) => {
    response.sendFile("users.html", { root: "./static" });
});

router.get("/profiles", (request, response) => {
    response.sendFile("profiles.html", { root: "./static" });
});

router.get("/groups", (request, response) => {
    response.sendFile("groups.html", { root: "./static" });
});

router.get("/posts", (request, response) => {
    response.sendFile("posts.html", { root: "./static" });
});

router.get("/follows", (request, response) => {
    response.sendFile("follows.html", { root: "./static" });
});

router.get("/likes", (request, response) => {
    response.sendFile("likes.html", { root: "./static" });
});

app.use("/admin/", router);

app.use("/admin/js", express.static(path.join(__dirname, "static/js")));

app.listen({ port: 7000 });
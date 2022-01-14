const express = require("express");
const path = require("path");

const app = express();

const router = express.Router();

router.get("/login", async (request, response) => {
    response.sendFile("login.html", { root: "./static" });
});

router.get("/", async (request, response) => {
    response.sendFile("index.html", { root: "./static" });
});

router.get("/users", async (request, response) => {
    response.sendFile("users.html", { root: "./static" });
});

app.use("/admin", router);

app.use("/admin/js", express.static(path.join(__dirname, "static/js")));

app.listen({ port: 7000 });
const express = require("express");
const path = require("path");

const app = express();

const router = express.Router();

router.get("/login", async (request, response) => {
    response.sendFile("login.html", { root: "./static" });
});

app.use("/admin", router);

app.use("/admin", express.static(path.join(__dirname, "static")));

app.listen({ port: 7000 });
const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const followsRoute = require("./routes/follows");
const groupMembersRoute = require("./routes/groupMembers");
const groupsRoute = require("./routes/groups");
const likesRoute = require("./routes/likes");
const postsRoute = require("./routes/posts");
const profilesRoute = require("./routes/profiles");
const reportsRoute = require("./routes/reports");
const usersRoute = require("./routes/users");
require("dotenv").config();

const app = express();

var corsOptions = {
    origin: ["http://localhost:7000", "http://localhost:8080"],
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", followsRoute);
app.use("/api", groupMembersRoute);
app.use("/api", groupsRoute);
app.use("/api", likesRoute);
app.use("/api", postsRoute);
app.use("/api", profilesRoute);
app.use("/api", reportsRoute);
app.use("/api", usersRoute);

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});
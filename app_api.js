const express = require("express");
const { sequelize } = require("./models");
const followsRoute = require("./routes/follows");
const groupMembersRoute = require("./routes/groupMembers");
const groupsRoute = require("./routes/groups");
const likesRoute = require("./routes/likes");
const postsRoute = require("./routes/posts");
const profilesRoute = require("./routes/profiles");
const reportsRoute = require("./routes/reports");
const usersRoute = require("./routes/users");
const path = require("path");
require("dotenv").config();

const app = express();

app.use("/api", followsRoute);
app.use("/api", groupMembersRoute);
app.use("/api", groupsRoute);
app.use("/api", likesRoute);
app.use("/api", postsRoute);
app.use("/api", profilesRoute);
app.use("/api", reportsRoute);
app.use("/api", usersRoute);

app.use(express.static(path.join(__dirname, "static")));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});
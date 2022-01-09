const express = require("express");
const { sequelize, Users } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Joi = require("joi");
require("dotenv").config();

const app = express();

var corsOptions = {
    origin: "http://127.0.0.1:7000",
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

const schema = Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
});

app.post("/register", async (request, response) => {
    try {
        var { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const salt = bcrypt.genSaltSync(10);
        value.password = bcrypt.hashSync(value.password, salt);
        const user = await Users.create(value);
        response.json(user.withoutPassword());
    } catch (error) {
        response.status(500).json(error);
    }
});

app.post("/login", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const user = await Users.findOne({
            where: {
                email: value.email
            }
        });
        if (!bcrypt.compareSync(value.password, user.password)) {
            response.status(400).json("Invalid credentials");
            return;
        }
        const token = jwt.sign(user.withoutPassword(), process.env.ACCESS_TOKEN_SECRET);
        response.json({ token: token });
    } catch (error) {
        response.status(500).json(error);
    }
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});
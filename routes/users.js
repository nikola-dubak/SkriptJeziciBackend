const express = require("express");
const { Users } = require("../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
require("dotenv").config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get("/users", async (request, response) => {
    try {
        const users = await Users.findAll();
        response.json(users);
    } catch (error) {
        response.status(500).json(error);
    }
});

route.get("/users/:id", async (request, response) => {
    try {
        const user = await Users.findOne({
            where: {
                id: request.params.id
            }
        });
        if (!user) {
            throw "User not found";
        }
        response.json(user);
    } catch (error) {
        response.status(500).json(error);
    }
});

const schema = Joi.object({
    id: Joi.number().integer().min(1),
    email: Joi.string().email().max(255),
    password: Joi.string(),
    role: Joi.string().valid("admin", "moderator", "user"),
    isBanned: Joi.boolean()
});

route.post("/users", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
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

route.put("/users", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        if (!value.id) {
            throw "No user id provided";
        }
        const user = await Users.findOne({
            where: {
                id: value.id
            }
        });
        if (!user) {
            throw "User not found";
        }
        if (value.password != user.password) {
            const salt = bcrypt.genSaltSync(10);
            value.password = bcrypt.hashSync(value.password, salt);
        }
        await user.update(value);
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

route.delete("/users", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        if (!value.id) {
            throw "No user id provided";
        }
        const user = await Users.findOne({
            where: {
                id: value.id
            }
        });
        if (!user) {
            throw "User not found";
        }
        await user.destroy();
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = route;
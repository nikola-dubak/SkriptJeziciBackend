const express = require("express");
const { Groups } = require("../models");
const Joi = require("joi");
require("dotenv").config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get("/groups", async (request, response) => {
    try {
        const groups = await Groups.findAll();
        response.json(groups);
    } catch (error) {
        response.status(500).json(error);
    }
});

const schema = Joi.object({
    id: Joi.number().integer().min(1),
    name: Joi.string().alphanum().min(3).max(50),
    description: Joi.string().min(3).max(255),
    ownerId: Joi.number().integer().min(1)
});

route.post("/groups", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const group = await Groups.create(value);
        response.json(group);
    } catch (error) {
        response.status(500).json(error);
    }
});

route.put("/groups", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        if (!value.id) {
            throw "No group id provided";
        }
        const group = await Groups.findOne({
            where: {
                id: value.id
            }
        });
        if (!group) {
            throw "Group not found";
        }
        await group.update(value);
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

route.delete("/groups", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        if (!value.id) {
            throw "No group id provided";
        }
        const group = await Groups.findOne({
            where: {
                id: value.id
            }
        });
        if (!group) {
            throw "Group not found";
        }
        await group.destroy();
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = route;
const express = require("express");
const { Profiles } = require("../models");
const Joi = require("joi");
const authToken = require("./authToken");

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use(authToken);

route.get("/profiles", async (request, response) => {
    try {
        const profiles = await Profiles.findAll();
        response.json(profiles);
    } catch (error) {
        response.status(500).json(error);
    }
});

route.get("/profiles/:userId", async (request, response) => {
    try {
        const profile = await Profiles.findOne({
            where: {
                userId: request.params.userId
            }
        });
        if (!profile) {
            throw "No profile found";
        }
        response.json(profile);
    } catch (error) {
        response.status(500).json(error);
    }
});

const schema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
    name: Joi.string().empty("").default(null).max(50),
    birthday: Joi.date().empty("").default(null),
    education: Joi.string().empty("").default(null).max(255),
    work: Joi.string().empty("").default(null).max(255),
    city: Joi.string().empty("").default(null).max(255),
    relationship: Joi.string().empty("").default(null).valid("single", "taken")
});

route.post("/profiles", async (request, response) => {
    if (request.user.id != request.body.userId && request.user.role != "admin") {
        response.status(403).send();
        return;
    }
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const profile = await Profiles.create(value);
        response.json(profile);
    } catch (error) {
        response.status(500).json(error);
    }
});

route.put("/profiles", async (request, response) => {
    if (request.user.id != request.body.userId && request.user.role != "admin") {
        response.status(403).send();
        return;
    }
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        if (!value.userId) {
            throw "No profile userId provided";
        }
        const profile = await Profiles.findOne({
            where: {
                userId: value.userId
            }
        });
        if (!profile) {
            throw "No profile found";
        }
        await profile.update(value);
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

route.delete("/profiles", async (request, response) => {
    if (request.user.id != request.body.userId && request.user.role != "admin") {
        response.status(403).send();
        return;
    }
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        if (!value.userId) {
            throw "No profile userId provided";
        }
        const profile = await Profiles.findOne({
            where: {
                userId: value.userId
            }
        });
        if (!profile) {
            throw "No profile found";
        }
        await profile.destroy();
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = route;
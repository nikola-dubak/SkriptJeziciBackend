const express = require("express");
const { Profiles } = require("../models");
const Joi = require("joi");
require("dotenv").config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get("/profiles", async (request, response) => {
    try {
        const profiles = await Profiles.findAll();
        response.json(profiles);
    } catch (error) {
        response.status(500).json(error);
    }
});

const schema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
    name: Joi.string().alphanum().max(50),
    profilePicturePath: Joi.string().max(255),
    birthDate: Joi.date(),
    education: Joi.string().max(255),
    work: Joi.string().max(255),
    currentCity: Joi.string().max(255),
    relationship: Joi.string().valid("single", "taken")
});

route.post("/profiles", async (request, response) => {
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
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        if (!value.id) {
            throw "No profile id provided";
        }
        const profile = await Profiles.findOne({
            where: {
                id: value.id
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
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        if (!value.id) {
            throw "No profile id provided";
        }
        const profile = await Profiles.findOne({
            where: {
                id: value.id
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
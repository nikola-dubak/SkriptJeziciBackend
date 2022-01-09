const express = require("express");
const { GroupMembers } = require("../models");
const Joi = require("joi");
require("dotenv").config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get("/groupMembers", async (request, response) => {
    try {
        const groupMembers = await GroupMembers.findAll();
        response.json(groupMembers);
    } catch (error) {
        response.status(500).json(error);
    }
});

const schema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
    groupId: Joi.number().integer().min(1).required()
});

route.post("/groupMembers", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const groupMember = await Likes.create(value);
        response.json(groupMember);
    } catch (error) {
        response.status(500).json(error);
    }
});

route.get("/groupMembers", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const groupMember = await Likes.findOne({
            where: value
        });
        if (!groupMember) {
            throw "Group member not found";
        }
        await like.destroy();
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = route;
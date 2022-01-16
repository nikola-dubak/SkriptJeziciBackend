const express = require("express");
const { GroupMembers } = require("../models");
const Joi = require("joi");
const authToken = require("./authToken");

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use(authToken);

route.get("/groupMembers", async (request, response) => {
    if (request.user.role != "admin") {
        response.status(403).send();
        return;
    }
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
    if (request.user.role != "admin") {
        response.status(403).send();
        return;
    }
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const groupMember = await GroupMembers.create(value);
        response.json(groupMember);
    } catch (error) {
        response.status(500).json(error);
    }
});

route.delete("/groupMembers", async (request, response) => {
    if (request.user.role != "admin") {
        response.status(403).send();
        return;
    }
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const groupMember = await GroupMembers.findOne({
            where: value
        });
        if (!groupMember) {
            throw "Group member not found";
        }
        await groupMember.destroy();
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = route;
const express = require("express");
const { Likes } = require("../models");
const Joi = require("joi");
const authToken = require("./authToken");

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use(authToken);

route.get("/likes", async (request, response) => {
    try {
        const likes = await Likes.findAll();
        response.json(likes);
    } catch (error) {
        response.status(500).json(error);
    }
});

const schema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
    postId: Joi.number().integer().min(1).required()
});

route.post("/likes", async (request, response) => {
    if (request.user.id != request.body.userId && request.user.role != "admin") {
        response.status(403).send();
        return;
    }
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const like = await Likes.create(value);
        response.json(like);
    } catch (error) {
        response.status(500).json(error);
    }
});

route.delete("/likes", async (request, response) => {
    if (request.user.id != request.body.userId && request.user.role != "admin") {
        response.status(403).send();
        return;
    }
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const like = await Likes.findOne({
            where: value
        });
        if (!like) {
            throw "Like not found";
        }
        await like.destroy();
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = route;
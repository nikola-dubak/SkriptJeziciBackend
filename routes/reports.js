const express = require("express");
const { Reports } = require("../models");
const Joi = require("joi");
require("dotenv").config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get("/reports", async (request, response) => {
    try {
        const reports = await Reports.findAll();
        response.json(reports);
    } catch (error) {
        response.status(500).json(error);
    }
});

route.get("/reports/:id", async (request, response) => {
    try {
        const report = await Reports.findOne({
            where: {
                id: request.params.id
            }
        });
        if (!report) {
            throw "No report found";
        }
        response.json(report);
    } catch (error) {
        response.status(500).json(error);
    }
});

const schema = Joi.object({
    id: Joi.number().integer().min(1),
    type: Joi.string().valid("offensive", "spam"),
    isConfirmed: Joi.boolean().empty("").default(null),
    reporterId: Joi.number().integer().min(1),
    postId: Joi.number().integer().min(1),
    reviewerId: Joi.number().integer().min(1).empty("").default(null)
});

route.post("/reports", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        const report = await Reports.create(value);
        response.json(report);
    } catch (error) {
        response.status(500).json(error);
    }
});

route.put("/reports", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        if (!value.id) {
            throw "No report id provided";
        }
        const report = await Reports.findOne({
            where: {
                id: value.id
            }
        });
        if (!report) {
            throw "No report found";
        }
        await report.update(value);
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

route.delete("/reports", async (request, response) => {
    try {
        const { error, value } = schema.validate(request.body);
        if (error) {
            throw(error);
        }
        if (!value.id) {
            throw "No report id provided";
        }
        const report = await Reports.findOne({
            where: {
                id: value.id
            }
        });
        if (!report) {
            throw "No report found";
        }
        await report.destroy();
        response.status(200).send();
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = route;
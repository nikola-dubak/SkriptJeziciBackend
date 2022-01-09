"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        static associate({ Users, Posts }) {
            this.belongsTo(Users, { foreignKey: "userId", as: "user" });
            this.belongsTo(Posts, { foreignKey: "postId", as: "post" });
        }
    };
    Likes.init({ }, {
        sequelize,
        modelName: "Likes"
    });
    Likes.removeAttribute("id");
    return Likes;
};
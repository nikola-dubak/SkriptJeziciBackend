"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class GroupMembers extends Model {
        static associate({ Users, Groups }) {
            this.belongsTo(Users, { foreignKey: "userId", as: "user" });
            this.belongsTo(Groups, { foreignKey: "groupId", as: "group" });
        }
    }
    GroupMembers.init({ }, {
        sequelize,
        modelName: "GroupMembers"
    });
    GroupMembers.removeAttribute("id");
    return GroupMembers;
};
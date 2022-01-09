"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Groups extends Model {
        static associate({ Users, GroupMembers, Posts }) {
            this.belongsTo(Users, { foreignKey: "ownerId", as: "owner" });
            this.belongsToMany(Users, { through: GroupMembers, foreignKey: "groupId", as: "members" });
            this.hasMany(Posts, { foreignKey: "groupId", as: "posts", onDelete: "cascade", hooks: true });
        }
    }
    Groups.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Groups"
    });
    return Groups;
};
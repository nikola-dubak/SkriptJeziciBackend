"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        static associate({ Users, Groups, Likes }) {
            this.belongsTo(Users, { foreignKey: "userId", as: "user"});
            this.belongsTo(Groups, { foreignKey: "groupId", as: "group" });
            this.hasMany(Likes, { foreignKey: "postId", as: "likes" });
            this.belongsTo(this, { foreignKey: "parentId", as: "parent" });
            this.hasMany(this, { foreignKey: "parentId", as: "comments", onDelete: "cascade", hooks: true });
        }
    };
    Posts.init({
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isEdited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: "Posts"
    });
    return Posts;
};
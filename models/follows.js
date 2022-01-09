"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Follows extends Model {
        static associate({ Users }) {
            this.belongsTo(Users, { foreignKey: "followerId", as: "follower" });
            this.belongsTo(Users, { foreignKey: "followedId", as: "followed" });
        }
    }
    Follows.init({ }, {
        sequelize,
        modelName: "Follows",
        validate: {
            userShouldNotFollowSelf : function() {
                if (this.followerId === this.followedId) {
                    throw Error("User should not follow self");
                }
            }
        }
    });
    Follows.removeAttribute("id");
    return Follows;
};
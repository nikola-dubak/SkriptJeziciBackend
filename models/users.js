"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate({ Profiles, Posts, Groups, GroupMembers, Follows }) {
            this.hasOne(Profiles, { foreignKey: "userId", as: "profile" });
            this.hasMany(Posts, { foreignKey: "userId", as: "posts" });
            this.belongsToMany(Groups, { through: GroupMembers, foreignKey: "userId", as: "groups" });
            this.belongsToMany(this, { through: Follows, foreignKey: "followerId", as: "followers" });
            this.belongsToMany(this, { through: Follows, foreignKey: "followedId", as: "followed" });
        }
        withoutPassword() {
            return { id: this.id, email: this.email, role: this.role, isBanned: this.isBanned };
        }
    };
    Users.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Not a valid email"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [["admin", "moderator", "user"]],
                    msg: "Role needs to be admin, moderator or user"
                }
            },
            defaultValue: "user"
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: "Users"
    });
    return Users;
};
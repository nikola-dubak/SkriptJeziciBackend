"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Profiles extends Model {
        static associate({ Users }) {
            this.belongsTo(Users, { foreignKey: "profileId", as: "user" });
        }
    };
    Profiles.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    msg: "Only letters allowed in name"
                }
            }
        },
        profilePicturePath: {
            type: DataTypes.STRING
        },
        birthDate: {
            type: DataTypes.DATE
        },
        education: {
            type: DataTypes.STRING
        },
        work: {
            type: DataTypes.STRING
        },
        currentCity: {
            type: DataTypes.STRING
        },
        relationship: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [["single", "taken"]],
                    msg: "Relationship status needs to be single or taken"
                }
            }
        }
    }, {
        sequelize,
        modelName: "Profiles"
    });
    return Profiles;
};
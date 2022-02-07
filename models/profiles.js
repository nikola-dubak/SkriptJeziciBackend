"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Profiles extends Model {
        static associate({ Users }) {
            this.belongsTo(Users, { foreignKey: "userId", as: "user" });
        }
    };
    Profiles.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthday: {
            type: DataTypes.DATEONLY
        },
        education: {
            type: DataTypes.STRING
        },
        work: {
            type: DataTypes.STRING
        },
        city: {
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
    Profiles.removeAttribute("id");
    return Profiles;
};
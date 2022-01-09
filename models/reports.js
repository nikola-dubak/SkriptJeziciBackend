"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Reports extends Model {
        static associate({ Users, Posts }) {
            this.belongsTo(Users, { foreignKey: "reporterId", as: "reporter" });
            this.belongsTo(Posts, { foreignKey: "postId", as: "post" });
            this.belongsTo(Users, { foreignKey: "reviewerId", as: "reviewer" });
        }
    };
    Reports.init({
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [["offensive", "spam"]],
                    msg: "Report type needs to be offensive or spam"
                }
            }
        },
        isConfirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        }
    }, {
        sequelize,
        modelName: "Reports"
    });
    return Reports;
};
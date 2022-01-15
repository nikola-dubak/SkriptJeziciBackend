"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Profiles", {
        userId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id"
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePicturePath: {
            type: DataTypes.STRING
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
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Profiles");
  }
};
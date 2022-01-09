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
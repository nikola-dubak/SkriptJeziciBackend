"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("GroupMembers", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "Users",
              key: "id"
            }
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "Groups",
              key: "id"
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
    await queryInterface.dropTable("GroupMembers")
  }
};
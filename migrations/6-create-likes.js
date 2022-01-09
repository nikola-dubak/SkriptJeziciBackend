"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Likes", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "Users",
              key: "id"
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "Posts",
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
    await queryInterface.dropTable("Likes");
  }
};
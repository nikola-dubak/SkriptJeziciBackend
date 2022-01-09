"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Follows", {
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "Users",
              key: "id"
            }
        },
        followedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "Users",
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
    }, {
      uniqueKeys: {
        uniqueFollows: {
          fields: ["followerId", "followedId"]
        }
      }
  });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Follows")
  }
};
"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
    await queryInterface.dropTable("Users");
  }
};
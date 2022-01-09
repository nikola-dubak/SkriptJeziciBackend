"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Reports", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
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
        },
        reporterId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id"
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Posts",
                key: "id"
            }
        },
        reviewerId: {
            type: DataTypes.INTEGER,
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
    });
},
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reports");
  }
};

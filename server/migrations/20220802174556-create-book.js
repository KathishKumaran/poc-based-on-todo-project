module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      BookName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      BookAuthor: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      Description: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "userId",
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Books"),
};

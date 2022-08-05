module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    BookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BookAuthor: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    Description: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  });

  Book.associate = (models) => {
    Book.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Book;
};

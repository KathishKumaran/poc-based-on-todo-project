const usersController = require("../controllers").users;
const booksController = require("../controllers").bookItems;

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Users API!",
    })
  );

  app.post("/users/:id", usersController.create);
  app.get("/users", usersController.list);
  app.post("/books/:userId", booksController.create);
  app.get("/users/:id", usersController.retrieve);
  app.put("/users/:id", usersController.update);
  app.delete("/users/:userId/:bookId", usersController.destroy);
  app.put("/books/:userId/:bookId", booksController.update);
  app.delete("/books/:userId/:bookId", booksController.destroy);

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all("/api/users/:userId/items", (req, res) =>
    res.status(405).send({
      message: "Method Not Allowed",
    })
  );
};

const Book = require("../models").Book;
const User = require("../models").User;

async function findUserByid(id) {
  return User.findByPk(id);
}

module.exports = {
  async create(req, res) {
    const { userId } = req.params;
    const userData = await findUserByid(userId);
    console.log("userData------------", userData);
    if (userData && userData.role === "Admin") {
      return Book.create({
        BookName: req.body.BookName,
        BookAuthor: req.body.BookAuthor,
        Description: req.body.Description,
        userId: req.params.userId,
      })
        .then((userItem) => {
          //console.log(userItem);
          res.status(201).send(userItem);
        })
        .catch((error) => {
          //console.log(error);
          res.status(400).send(error);
        });
    } else {
      res
        .status(422)
        .send({ msg: ["You are not allowed to perform this action"] });
    }
  },
  async update(req, res) {
    const { userId, bookId } = req.params;
    const userData = await findUserByid(userId);
    //console.log("userData--------------", userData);
    console.log("Book---------------------",Book);
    if (userData && userData.role === "Admin") {
      return Book.update(
        {
          BookName: req.body.BookName,
          BookAuthor: req.body.BookAuthor,
          Description: req.body.Description,
        },
        { where: { id: bookId } }
      )
        .then(() => res.status(200).send({msg:["updated sucessfully"]}))
        .catch((error) => res.status(400).send(error));
    } else {
      res
        .status(422)
        .send({ msg: ["You are not allowed to perform this action"] });
    }
  },

  async destroy(req, res) {
    const { userId, bookId } = req.params;
    const userData = await findUserByid(userId);
    if (userData && userData.role === "Admin") {
      return Book.destroy({ where: { id: bookId } })
        .then(() => res.status(204).send({ msg: ["deleted successfully"] }))
        .catch((error) => res.status(400).send(error));
    } else {
      res
        .status(422)
        .send({ msg: ["You are not allowed to perform this action"] });
    }
  },
};

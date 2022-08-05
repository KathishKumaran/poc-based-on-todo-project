const User = require("../models").User;
const Book = require("../models").Book;

async function findUserByid(id) {
  return User.findByPk(id);
}

async function findAgentByid(id) {
  return User.findByPk(id);
}

module.exports = {
  async create(req, res) {
    const { id } = req.params;
    const userData = await findUserByid(id);
    //console.log("userData------------", userData);
    if (userData && userData.role === "Admin") {
      return User.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      })
        .then((user) => res.status(201).send(user))
        .catch((error) => res.status(400).send(error));
    } else {
      res
        .status(422)
        .send({ msg: ["You are not allowed to perform this action"] });
    }
  },

  list(req, res) {
    return User.findAll({
      include: [
        {
          model: Book,
          as: "bookItems",
        },
      ],
      order: ["id"],
    })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res) {
    return User.findByPk(req.params.id, {
      include: [
        {
          model: Book,
          as: "bookItems",
        },
      ],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found",
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },
  async update(req, res) {
    const { id } = req.params;
    const userData = await findUserByid(id);
    //console.log("userData------------", userData);
   // console.log("User--------------------",User);
    return userData
      .update({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },
  async destroy(req, res) {
    const { userId, agentId } = req.params;
    const userData = await findUserByid(userId);
    //console.log("userId------------", userId);
    //console.log("agentId------------", agentId);
   // console.log("agentData--------------------------------------",agentData)
   //console.log("userData--------------------",userData)
    const agentData = await findAgentByid(agentId);
    if (userData && userData.role === "Admin") {
      return agentData
        .destroy()
        .then(() =>
          res.status(200).send({ message: "User deleted successfully." })
        )
        .catch((error) => res.status(400).send(error));
    } else {
      res
        .status(422)
        .send({ msg: ["You are not allowed to perform this action"] });
    }
  },
};

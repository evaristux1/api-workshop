const { Router } = require("express");
const router = Router();

const UsersController = require("../controllers/usersController");

const MiddlewaresController = require("../middlewares/token");
router.get(
  "/users/:id",
  MiddlewaresController.middlewareToken,
  UsersController.getUser
);
router.post("/users", UsersController.createUser);

module.exports = router;

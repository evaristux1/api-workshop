const UsersController = require("../controllers/usersController");
const LoginController = require("../controllers/loginController");
const Middlewares = require("../middlewares/token");
const { Router } = require("express");
const router = Router();

//*auth
router.post("/auth/login", LoginController.loginUser);
//*users
router.post("/users", UsersController.createUser);
router.get(
  "/users/:id",
  Middlewares.tokenValidade,
  UsersController.getUser
);
router.patch(
  "/users/:id",
  Middlewares.tokenValidade,
  UsersController.updateAUser
);

module.exports = router;

const UsersController = require("../controllers/usersController");
const LoginController = require("../controllers/loginController");
const Middlewares = require("../middlewares/token");
const { Router } = require("express");
const router = Router();

//*auth
router.post("/api/workshop/auth/login", LoginController.loginUser);
//*users
router.post("/api/workshop/users", UsersController.createUser);
router.get(
  "/api/workshop/users/:id",
  Middlewares.tokenValidade,
  UsersController.getUser
);
router.patch(
  "/api/workshop/users/:id",
  Middlewares.tokenValidade,
  UsersController.updateAUser
);

module.exports = router;

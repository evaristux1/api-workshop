class UserWithoutPermission extends Error {
  constructor() {
    super("user without permission");
    this.name = "UserWithoutPermission";
    this.idError = 3;
  }
}

module.exports = UserWithoutPermission;

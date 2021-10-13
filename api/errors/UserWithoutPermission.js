class UserWithoutPermission extends Error {
  constructor() {
    super("user without permission");
    this.name = "UserWithoutPermission";
    this.idError = 3;
    this.errorStatus = 403;
  }
}

module.exports = UserWithoutPermission;

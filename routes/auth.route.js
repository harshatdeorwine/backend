const userController = require("../controllers/user.controller");

module.exports = [
  {
    method: "POST",
    url: "auth/login",
    handler: userController.login,
  },
];

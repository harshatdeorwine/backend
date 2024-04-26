const postRoutes = require("./post.route");
const webhookRoutes = require("./webhook.route");
const customerRoutes = require("./customer.route");
const authRoute = require("./auth.route");

//all routes
module.exports = [
  ...postRoutes,
  ...webhookRoutes,
  ...customerRoutes,
  ...authRoute,
];

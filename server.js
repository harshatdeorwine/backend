require("dotenv").config();
require("./config/global");
require("./database");
const { User } = require("./database/models");

const fastify = require("fastify")({ logger: true });

const corsOptions = {
  origin: "*",
  methods: ["PUT", "POST", "DELETE", "GET"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "authorization",
    "Accept-Encoding",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

fastify.register(require("fastify-cors"), {
  corsOptions,
});

fastify.register(require("fastify-helmet"), {
  hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "same-origin" },
});

fastify.register(require("fastify-formbody"));

// Declare routes
const routes = require("./routes");
routes.forEach((route) => {
  const base_path = "/api/";
  route.url = base_path + route.url;
  // console.log(route);
  fastify.route(route);
});

fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

// Run the server!
fastify.listen(4000, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

function handleAtLeastOneAdmin() {
  User.findOne({ role: "admin" }).then((admin) => {
    if (!admin) {
      User.create({
        role: "admin",
        email: "admin@liveload.com",
        firstName: "LiveLoad",
        lastName: "Admin",
        password:
          "$2b$10$RwT8HrbJ72VeWlYv8xSSJu079.YRN15nJOLJAk/oTRd/ZgiwVkt3u", //bcrypt hash of User@123
        isVerified: true,
        status: "active",
      }).then(() => {
        console.log("Admin document inserted.");
      });
    }
  });
}

handleAtLeastOneAdmin();

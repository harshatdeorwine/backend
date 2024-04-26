const jwt = require("jsonwebtoken");

function authenticateToken(request, reply, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "H@rsh123", (err, decoded) => {
    if (err) {
      return reply.status(401).send({ error: "Invalid token" });
    }

    next();
  });
}

module.exports = authenticateToken;

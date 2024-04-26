// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../database/models");

async function login(request, reply) {
  const { email, password } = request.body;
  // console.log(email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);
    if (password !== user.password) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, "H@rsh123", {
      expiresIn: "1h",
    });

    reply.status(200).send({
      message: "Login successful",
      token,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = { login };

const { Customers } = require("../database/models");

const jwt = require("jsonwebtoken");

async function addCustomer(request, reply) {
  try {
    // const authHeader = request.headers.authorization;
    // console.log("token is", token);
    // token = authHeader.split(" ")[1];
    // if (!token) {
    //   return reply.status(401).send({ error: "Unauthorized" });
    // }

    // jwt.verify(token, "H@rsh123", async (err, decoded) => {
    //   if (err) {
    //     return reply.status(401).send({ error: "Invalid token" });
    //   }

    const { firstName, lastName, email, address, businessName, phoneNumber } =
      request.body;
    // console.log(
    //   firstName,
    //   lastName,
    //   email,
    //   address,
    //   businessName,
    //   phoneNumber
    // );

    const customer = await Customers.create({
      firstName,
      lastName,
      email,
      address,
      businessName,
      phoneNumber,
    });

    reply.code(201).send(customer);
  } catch (error) {
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

async function editCustomer(request, reply) {
  try {
    // const authHeader = request.headers.authorization;

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   return reply.status(401).send({ error: "Unauthorized" });
    // }

    // const token = authHeader.split(" ")[1];

    const customerId = request.params.id;
    const { firstName, lastName, email, address, businessName, phoneNumber } =
      request.body;

    const customer = await Customers.findByIdAndUpdate(
      customerId,
      {
        firstName,
        lastName,
        email,
        address,
        businessName,
        phoneNumber,
      },
      { new: true }
    );

    if (!customer) {
      return reply.code(404).send({ error: "Customer not found" });
    }

    reply.code(200).send(customer);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

//
async function getAllCustomers(request, reply) {
  try {
    // const authHeader = request.headers.authorization;

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   return reply.status(401).send({ error: "Unauthorized" });
    // }

    // const token = authHeader.split(" ")[1];
    // console.log("token is ", token);

    // jwt.verify(token, "H@rsh123", async (err, decoded) => {
    //   if (err) {
    //     return reply.status(401).send({ error: "Invalid token" });
    //   }

    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    console.log(request.query.limit);

    const start = (page - 1) * limit;
    const end = start + limit;
    console.log("Range:", start, end);

    const customers = await Customers.find();
    const slicedCustomers = customers.slice(start, end);
    console.log(slicedCustomers);

    reply.code(200).send(customers);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

async function findCustomerById(request, reply) {
  try {
    // const authHeader = request.headers.authorization;

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   return reply.status(401).send({ error: "Unauthorized" });
    // }

    // const token = authHeader.split(" ")[1];

    // jwt.verify(token, "H@rsh123", async (err, decoded) => {
    //   if (err) {
    //     return reply.status(401).send({ error: "Invalid token" });
    //   }

    const customerId = request.params.id;
    const customer = await Customers.findById(customerId);

    if (!customer) {
      return reply.code(404).send({ error: "Customer not found" });
    }

    reply.code(200).send(customer);
    // });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

async function findCustomerByName(request, reply) {
  try {
    // const authHeader = request.headers.authorization;

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   return reply.status(401).send({ error: "Unauthorized" });
    // }

    // const token = authHeader.split(" ")[1];

    // jwt.verify(token, "H@rsh123", async (err, decoded) => {
    //   if (err) {
    //     return reply.status(401).send({ error: "Invalid token" });
    //   }

    const searchQuery = request.query.name;

    const customers = await Customers.find({
      firstName: { $regex: searchQuery, $options: "i" },
    });

    if (customers.length === 0) {
      return reply.code(404).send({ error: "No customers found" });
    }

    reply.code(200).send(customers);
    // });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

async function deleteCustomer(request, reply) {
  try {
    const customerId = request.params.id;

    const customer = await Customers.findByIdAndDelete(customerId);

    if (!customer) {
      return reply.code(404).send({ error: "Customer not found" });
    }

    reply.code(200).send({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

module.exports = {
  addCustomer,
  findCustomerById,
  deleteCustomer,
  editCustomer,
  getAllCustomers,
  findCustomerByName,
};

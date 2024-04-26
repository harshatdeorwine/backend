const CustomerController = require("../controllers/customer.controller");
const authenticateToken = require("../middlewares/verify_token");

module.exports = [
  {
    method: "GET",
    url: "get-customer/:id",
    handler: CustomerController.findCustomerById,
    preHandler: authenticateToken,
  },
  {
    method: "DELETE",
    url: "delete-customer/:id",
    handler: CustomerController.deleteCustomer,
    preHandler: authenticateToken,
  },
  {
    method: "POST",
    url: "add-customer",
    handler: CustomerController.addCustomer,
    preHandler: authenticateToken,
  },
  {
    method: "PUT",
    url: "edit-customer/:id",
    handler: CustomerController.editCustomer,
    preHandler: authenticateToken,
  },
  {
    method: "GET",
    url: "get-all-customers",
    handler: CustomerController.getAllCustomers,
    preHandler: authenticateToken,
  },

  {
    method: "GET",
    url: "get-customer-by-name",
    handler: CustomerController.findCustomerByName,
    // preHandler: authenticateToken,
  },
];

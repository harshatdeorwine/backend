require("dotenv").config();

global.MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;
console.log("string is", process.env.MONGO_DB_CONNECTION_STRING);

global.TEXT_KEY = process.env.TEXT_KEY;
global.TEXT_ENTITY_ID = process.env.TEXT_ENTITY_ID;
global.TEXT_TEMPLATE_ID = process.env.TEXT_TEMPLATE_ID;

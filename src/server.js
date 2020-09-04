import express from "express";
import { json, urlencoded } from "body-parser";
require("dotenv").config({ path: ".env" });

const server = express();

import { userRoute } from "./routes";

//Mongo Connection
require("./config/connection");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

//body parser
server.use(urlencoded({ extended: true }));
server.use(json());

//routes
server.use(userRoute);


server.listen(PORT, () => {
  console.log(`Server Running at http://${HOST}:${PORT}/`);
});

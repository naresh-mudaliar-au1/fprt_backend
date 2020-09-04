import { set, connect, connection } from "mongoose";

// We need to define the URL
const CONNECTION_URL = process.env.CONNECTION_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

set("useFindAndModify", false);
console.log('CONNECTION_URL', CONNECTION_URL)
//Connection establishment
connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = connection;

db.on("error", () => {
  console.error("Error occured in db connection");
});

db.on("open", () => {
  console.log(`DB Connection with ${DATABASE_NAME} established successfully`);
});

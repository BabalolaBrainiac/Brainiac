import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const port = process.env.APP_PORT;

app.listen(port || 8000, async () => {
  console.log("Brainiac is starting up.....");
});

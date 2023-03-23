import dotenv from "dotenv";
import app  from "./app.js";

import { ApplicationConfiguration } from "./config/appConfig.js";


dotenv.config();
const port = process.env.APP_PORT;

const server = app.listen(port || 8000, () => {
  console.log(`Brainiac Lives at  http://localhost:${port}!!!!!`);
  console.log("Press CTRL+C to stop\n");
})
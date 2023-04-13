import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import methodOverride from "method-override";
import routes from "./routes.js";

const app = express();
const isProduction: boolean = process.env.NODE_ENV === "production";

app.use(bodyParser.json());

app.use(helmet());
app.disable("x-powered-by");

app.use(methodOverride());

app.use(function (req, res, next) {
  if (req.headers["x-forwarded-proto"] !== "https" && isProduction) {
    const secureUrl = "https://" + req.hostname + req.originalUrl;
    res.redirect(302, secureUrl);
  }

  const router = express.Router();
  router.use("/api", routes);

  app.use(router);

  next();
});

export default app;

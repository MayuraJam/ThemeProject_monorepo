const express = require("express");
const starSystemRoute = require("./router/starSystem.route");
const authenRoute = require("./router/authen.route");
const themeRoute = require("./router/theme.route");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const limiter = require("./config/ratelimit");
const helmet = require("./config/helmet");
// const swaggerDocument = require('./swagger.json');
const allowedOrigin = [
  "http://localhost:3000",
  "http://localhost:3001"
];

require("dotenv").config();

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(helmet);

const port = process.env.PORT;

//install swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "for test api",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./app.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
var options = {
  explorer: true,
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//test api
app.get("/index", (req, res) => {
  res.send("Hello my new express");
});


app.use("/api/star-system", starSystemRoute);
app.use("/api/authen", authenRoute);
app.use("/api/theme", themeRoute);

const server = app.listen(port, () => {
  console.log("server is running on port : ", port);
});
server.on('close', () => console.log('Server closed'));
server.on('error', (err) => console.error('Server error:', err));
process.on('exit', (code) => console.log(`Process exiting with code: ${code}`));

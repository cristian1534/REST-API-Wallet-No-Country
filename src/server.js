const express = require("express");
const body_parser = require("body-parser");
const color = require("colors");
const morgan = require("morgan");
const database = require("../src/database/database");
const cors = require("cors");
require("dotenv").config();
const auth_routes = require("./routes/auth");
const user_routes = require("./routes/user");
const card_routes = require("./routes/card");
const contact_routers = require("./routes/contact");
const transaction_routes = require("./routes/transaction");
const budget_routes = require("./routes/budget");

const cors_options = {
  origin: "*",
  optionsSuccessStatus: 200,
};
const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cors(cors_options));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  try {
    res.send(`
    <html>
      <head>
        <title>PENGUIN-WALLET</title>
        <style>
          body {
            background-color: black;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 50vh;
            margin: 0;
          }
          h1 {
            color: yellow;
            text-align: center;
            margin-top: 25rem;
          }
          img {
            border-radius: 5px;
            max-width: 100%;
            max-height: 100%;
          }
        </style>
      </head>
      <body>
        <h1>PENGUIN-WALLET SERVER RUNNING.</h1>
        <br/>
        <img src="https://i.pinimg.com/originals/ad/4b/81/ad4b818ef5f4e17c0ba158268274790f.gif" alt="server-working" />
      </body>
    </html>
  `);
  } catch (err) {
    return res.sendStatus(500);
  }
});
app.use("/api/", auth_routes);
app.use("/api/user", user_routes);
app.use("/api/card", card_routes);
app.use("/api/transaction", transaction_routes);
app.use("/api/contact", contact_routers);
app.use("/api/budget", budget_routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(color.cyan.underline.bold(`Server running on port: ${PORT}`));
});

database();

module.exports = app;

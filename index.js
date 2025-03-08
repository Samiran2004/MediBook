import express from "express";
import figlet from "figlet";
import configs from "./configs/index.configs.js";
import Db_Connect from "./services/connectDb.js";

const app = express();

// Connect Database...
const db_URI = configs.ENV === 'development' ? configs.DB_URI : configs.MONGODB_URI;
Db_Connect(db_URI);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.use(express.static("public"));

//view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(configs.PORT, (err) => {
  if (err) {
    figlet("E r r o r  t o  c o n n e c t  s e r v e r  !❌❌❌", (err, data) => {
      if (err) {
        console.log("Something went wrong in figlet...");
        return;
      }
      console.log(data);
    });
  } else {
    figlet(`S e r v e r   c o n n e c t e d   o n  \np o r t :  ${configs.PORT}`, (err, data) => {
      if (err) {
        console.log("Something went wrong in figlet...");
        return;
      }
      console.log(data);
    });
  }
});

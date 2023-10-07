const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } =require("./controllers/user.routes")
const { taskRouter } =require("./controllers/task.routes")

const app = express();
app.use(express.json())
require("dotenv").config();
const cors = require("cors");

app.get("/", (req,res) => {
    res.send("HOME PAGE");
  });
  app.use("/", userRouter);
  app.use("/", taskRouter);

app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log("Connected to DB");
    } catch (error) {
      console.log("Something went wrong\n", error);
    }
    console.log(`Server is running at port: ${process.env.port}`);
  });
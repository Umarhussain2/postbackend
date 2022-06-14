const express = require("express");
const app = express();
const mongoose = require("mongoose");
const model = require("./schema");

app.use(express.json());
let dburl =
  "mongodb+srv://Umarhussain26:987654321@cluster0.t4ho2.mongodb.net/back?retryWrites=true&w=majority";
mongoose
  .connect(dburl)
  .then((res) => console.log("server connected with db"))
  .catch((res) => console.log("server not connwcted with db"));
app.get("/", async (req, res) => {
  try {
    const result = await model.find();
    res.json({
      message: "displaying all records",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/insert", async (req, res) => {
  try {
    const result = await model.create(req.body);
    res.json({
      message: "inserted ",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/search/:name", async (req, res) => {
  try {
    const result = await model.findOne({ name: req.params.name });
    if (result) {
      res.json({
        message: "displaying matched record",
        data: result,
      });
      res.json({
        message: "record not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/update/:age", async (req, res) => {
  try {
    const result = await model.findOne({ age: parseInt(req.params.age) });
    if (result) {
      const result = await model.updateOne(
        { age: parseInt(req.params.age) },
        { $set: { name: req.body.name } }
      );
      res.json({
        message: "displaying matched record",
      });
    } else {
      res.json({
        message: "record not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
app.delete("/delete/:name", async (req, res) => {
  try {
    const result = await model.findOne({ name: req.params.name });

    if (result) {
      const result = await model.deleteOne({ name: req.params.name });
      res.json({
        message: "record deleted",
      });
    } else {
      res.json({
        message: "record not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
app.listen(5000);

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const formRoutes = require("./routes/formRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

console.log('****');

app.use(cors(corsOptions));

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/xyz2_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));



app.use("/api/forms", formRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

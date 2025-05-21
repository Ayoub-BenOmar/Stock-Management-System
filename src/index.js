import express from "express";
import bodyParser from "body-parser";
import productRoute from './routes/product.routes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Home Page");
});

app.use("/api/products", productRoute);

app.post("/register", (req, res) =>{
    res.sendStatus(201);
});

app.post("/login", (req, res) =>{
    res.sendStatus(200);
});

app.listen(port, () =>{
    console.log(`Your server running on port ${port}`);
});
import express from "express";
import bodyParser from "body-parser";
import productRoute from './routes/product.routes.js';
import categoryRoute from './routes/category.routes.js';
import userRoute from "./routes/user.routes.js";
import { authenticateToken } from './middleware/auth.middleware.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Home Page");
});

app.use("/api/users", userRoute);

app.use("/api/products", authenticateToken, productRoute);
app.use("/api/category", authenticateToken, categoryRoute);

app.post("/register", (req, res) =>{
    res.sendStatus(201);
});

app.post("/login", (req, res) =>{
    res.sendStatus(200);
});

app.listen(port, () =>{
    console.log(`Your server running on port ${port}`);
});
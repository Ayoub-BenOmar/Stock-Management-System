import express from "express";
import bodyParser from "body-parser";
import productRoute from './routes/product.routes.js';
import categoryRoute from './routes/category.routes.js';
import userRoute from './routes/user.routes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Home Page");
});

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.listen(port, () =>{
    console.log(`Your server running on port ${port}`);
});
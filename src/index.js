import express from "express";
import bodyParser from "body-parser";
import categoryRoute from './routes/category.routes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Home Page");
});

// For testing, we'll remove the authentication middleware
app.use("/api/categories", categoryRoute);

// app.post("/register", (req, res) =>{
//     res.sendStatus(201);
// });

// app.post("/login", (req, res) =>{
//     res.sendStatus(200);
// });

app.listen(port, () =>{
    console.log(`Your server running on port ${port}`);
});
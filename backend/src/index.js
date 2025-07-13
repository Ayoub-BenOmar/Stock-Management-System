import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import multer from "multer";
import productRoute from './routes/product.routes.js';
import categoryRoute from './routes/category.routes.js';
import userRoute from './routes/user.routes.js';
import supplierRoute from './routes/supplier.routes.js';
import salesRoute from './routes/sale.routes.js';
import dashboardRoute from './routes/dashboard.routes.js';

const app = express();
const port = 3000;

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads directory as static
app.use("/uploads", express.static(path.resolve("../uploads")));

// Image upload endpoint
app.post("/api/upload", upload.single("pic"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Return the public URL to the uploaded file
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.get("/", (req, res) =>{
    res.send("Home Page");
});

app.use("/api/categories", categoryRoute);
app.use("/api/products", (req, res, next) => {
  // Apply multer middleware only to POST and PUT requests
  if (req.method === 'POST' || req.method === 'PUT') {
    upload.single('pic')(req, res, next);
  } else {
    next();
  }
}, productRoute);
app.use("/api/users", userRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/sales", salesRoute);
app.use("/api/dashboard", dashboardRoute);

app.listen(port, () =>{
    console.log(`Your server running on port ${port}`);
});
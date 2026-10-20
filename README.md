<p align="center">
  <img src="frontend/src/assets/logo.png" alt="Stock Management System Logo" width="200"/>
</p>

<h1 align="center">Stock Management System</h1>

<p align="center">
  <strong>Full-Stack Inventory, Sales & Supplier Management Platform</strong>
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#api-endpoints">API</a> •
  <a href="#database-schema">Database</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-5.1-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Prisma-6.9-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</p>

---

## Overview

**Stock Management System** is a robust, full-stack inventory, sales, and supply chain management web application. It seamlessly unifies consumer-facing shopping capabilities with enterprise back-office management. Customers enjoy a responsive product catalog, category filters, interactive shopping cart, and wishlist tracking. Simultaneously, business administrators gain access to a powerful analytics suite, supplier relationship tracking, atomic stock adjustment transactions, and low-inventory warnings.

---

## Features

### For Customers & Shoppers
- **Product Catalog**: Browse dynamic inventory items with real-time prices, stock status, and high-resolution images.
- **Category Filtering & Search**: Instant category-based product filtering and keyword search with real-time UI updates.
- **Cart & Checkout Drawer**: Slide-out cart modal with quantity controls, live price calculations, and instant order placement.
- **Wishlist Management**: Save preferred items to personal wishlists with single-click transfer to cart.
- **Responsive Design**: Tailored user interface engineered for desktops, tablets, and smartphones.

### For Administrators & Inventory Managers
- **Analytics Dashboard**: Real-time KPI cards tracking total revenue, daily sales counts, active catalog volume, and top-selling products.
- **Stock Health Monitoring**: Automatic indicators flagging low-stock items (`< 10` units) and out-of-stock items.
- **Product Management (CRUD)**: Create, update, view, and delete products with image upload support powered by Multer.
- **Category Hierarchy**: Organize inventory into structured categories with automatic product association counts.
- **Supplier Directory**: Manage suppliers, store contact details (email, phone, address), and trace supplied inventory.
- **Automated Sales & Stock Sync**: Every completed sale records total revenue and automatically deducts product inventory in an atomic database transaction.

### Security & Architecture
- **JWT Authentication**: Secure user login and registration with token expiration handling and Bcrypt password hashing.
- **Role-Based Access Control (RBAC)**: Protected admin routes ensuring only authorized personnel access inventory controls.
- **ACID Transactions**: Prisma-driven transactions prevent race conditions during concurrent checkouts.

---

## Tech Stack

### Frontend

<p>
  <img src="https://img.shields.io/badge/React-19.1.0-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-4.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/React_Router-7.6-CA4245?style=flat-square&logo=react-router&logoColor=white" alt="React Router"/>
  <img src="https://img.shields.io/badge/Recharts-3.1-22B5BF?style=flat-square" alt="Recharts"/>
  <img src="https://img.shields.io/badge/Lucide_React-0.525-F56565?style=flat-square" alt="Lucide React"/>
  <img src="https://img.shields.io/badge/SweetAlert2-11.22-683AB7?style=flat-square" alt="SweetAlert2"/>
  <img src="https://img.shields.io/badge/Radix_UI-Select-161618?style=flat-square&logo=radix-ui&logoColor=white" alt="Radix UI"/>
</p>

### Backend

<p>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-5.1-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Prisma_ORM-6.9-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Bcrypt-6.0-4A90E2?style=flat-square" alt="Bcrypt"/>
  <img src="https://img.shields.io/badge/Multer-File_Uploads-FF6B6B?style=flat-square" alt="Multer"/>
</p>

### Database & Tooling

<p>
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/REST_API-Standard-009688?style=flat-square" alt="REST API"/>
  <img src="https://img.shields.io/badge/Git-Version_Control-F05032?style=flat-square&logo=git&logoColor=white" alt="Git"/>
  <img src="https://img.shields.io/badge/Postman-API_Testing-FF6C37?style=flat-square&logo=postman&logoColor=white" alt="Postman"/>
</p>

---

## Getting Started

### Prerequisites

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **PostgreSQL** (v14.x or higher)
- **Git**

### Installation & Setup

#### 1. Clone Repository

```bash
git clone https://github.com/Ayoub-BenOmar/Stock-Management-System.git
cd Stock-Management-System
```

#### 2. Backend Setup

```bash
cd backend

# Create environment configuration
cp .env.example .env
# Edit .env with your PostgreSQL database credentials and JWT secret

# Install backend dependencies
npm install

# Push database schema and generate Prisma client
npx prisma db push

# Start the backend server (runs on port 3000)
node src/index.js
```

#### 3. Frontend Setup

Open a new terminal session:

```bash
cd frontend

# Install frontend dependencies
npm install

# Start development server (runs on port 3001)
npm start
```

> **Windows Users**: You can also launch the client instantly using `start-frontend.bat`.

### Service Access

- **Frontend Application**: [http://localhost:3001](http://localhost:3001)
- **Backend API Server**: [http://localhost:3000](http://localhost:3000)
- **Database Server**: `localhost:5432`

---

## Project Structure

```
Stock-Management-System/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma         # Database schema & relations
│   ├── src/
│   │   ├── controllers/          # API business logic
│   │   │   ├── category.controller.js
│   │   │   ├── dashboard.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── sale.controller.js
│   │   │   ├── supplier.controller.js
│   │   │   └── user.controller.js
│   │   ├── middleware/           # JWT verification & RBAC authorization
│   │   │   └── auth.middleware.js
│   │   ├── routes/               # Express endpoint definitions
│   │   │   ├── category.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── sale.routes.js
│   │   │   ├── supplier.routes.js
│   │   │   └── user.routes.js
│   │   └── index.js              # Application entry point & middleware
│   ├── uploads/                  # Product image storage
│   ├── .env.example              # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── public/                   # Static HTML template & favicons
│   ├── src/
│   │   ├── assets/               # Logos and graphic assets
│   │   ├── components/           # UI components & admin views
│   │   │   ├── admin-categories.tsx
│   │   │   ├── admin-dashboard-page.tsx
│   │   │   ├── admin-products.tsx
│   │   │   ├── admin-sidebar.tsx
│   │   │   ├── admin-suppliers.tsx
│   │   │   ├── cart-modal.tsx
│   │   │   ├── category-filter.tsx
│   │   │   ├── dashboard-chart.tsx
│   │   │   ├── login-page.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── wishlist-page.tsx
│   │   ├── contexts/             # Global contexts (Auth, Cart, Wishlist)
│   │   ├── pages/                # High-level page views
│   │   ├── types/                # TypeScript models & types
│   │   ├── App.tsx               # Route declarations & providers
│   │   └── index.tsx             # React DOM entry point
│   ├── tailwind.config.js        # Tailwind CSS styles & themes
│   ├── tsconfig.json             # TypeScript configuration
│   └── package.json
│
└── README.md                     # Project documentation
```

---

## API Endpoints

### Authentication & Users
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/users/register` | Public | Register new user account |
| POST | `/api/users/login` | Public | Authenticate user & receive JWT token |
| GET | `/api/users` | Admin | Retrieve list of all users |
| GET | `/api/users/:id` | Admin | Retrieve detailed information for single user |

### Products & Inventory
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | List all products with category and supplier details |
| GET | `/api/products/:id` | Public | Fetch product details by ID |
| POST | `/api/products` | Admin | Create product with image upload (`multipart/form-data`) |
| PUT | `/api/products/:id` | Admin | Update product information, pricing, stock, or image |
| DELETE | `/api/products/:id` | Admin | Delete product from database |
| POST | `/api/upload` | Admin | Upload product image and receive public URL |

### Categories
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/categories` | Public | Fetch all categories with total product counts |
| GET | `/api/categories/:id` | Public | Get single category details |
| POST | `/api/categories` | Admin | Create a new inventory category |
| PUT | `/api/categories/:id` | Admin | Update existing category name |
| DELETE | `/api/categories/:id` | Admin | Delete category |

### Suppliers
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/suppliers` | Public | Retrieve list of all suppliers with product counts |
| GET | `/api/suppliers/:id` | Public | Get supplier profile and contact info |
| POST | `/api/suppliers` | Admin | Register new supplier |
| PUT | `/api/suppliers/:id` | Admin | Update supplier profile |
| DELETE | `/api/suppliers/:id` | Admin | Remove supplier record |

### Sales & Transactions
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/sales` | Admin | Retrieve chronologically sorted sales records |
| GET | `/api/sales/:id` | Admin | Get details of a single sales receipt |
| GET | `/api/sales/product/:productId` | Admin | Get sales history for a specific product |
| POST | `/api/sales` | Public/User | Create sale (atomically decrements product stock) |

### Dashboard & Analytics
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/dashboard` | Admin | Get aggregated KPI stats, revenue, and product counts |
| POST | `/api/dashboard/update` | Admin | Recalculate and update cached dashboard statistics |

---

## Database Schema

```
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│       User        │       │     Category      │       │     Supplier      │
├───────────────────┤       ├───────────────────┤       ├───────────────────┤
│ id           (PK) │       │ id           (PK) │       │ id           (PK) │
│ username          │       │ name              │       │ name              │
│ email             │       │ createdAt         │       │ email             │
│ password          │       │ updatedAt         │       │ phone             │
│ role              │       └─────────┬─────────┘       │ address           │
│ active            │                 │ 1               │ createdAt         │
│ createdAt         │                 │                 │ updatedAt         │
│ updatedAt         │                 │                 └─────────┬─────────┘
└───────────────────┘                 │                           │ 1
                                      │                           │
                                      ▼ N                         ▼ N
                            ┌───────────────────────────────────────────┐
                            │                  Product                  │
                            ├───────────────────────────────────────────┤
                            │ id                                   (PK) │
                            │ name                                      │
                            │ description                               │
                            │ price                                     │
                            │ quantity                                  │
                            │ active                                    │
                            │ pic                                       │
                            │ categoryId                           (FK) │
                            │ supplierId                           (FK) │
                            │ createdAt                                 │
                            │ updatedAt                                 │
                            └─────────┬───────────────────────▲─────────┘
                                      │ 1                     │ 1 (topSelling)
                                      │                       │
                                      ▼ N                     │
                            ┌───────────────────┐   ┌─────────┴─────────┐
                            │       Sale        │   │  DashboardStats   │
                            ├───────────────────┤   ├───────────────────┤
                            │ id           (PK) │   │ id           (PK) │
                            │ productId    (FK) │   │ totalSales        │
                            │ quantity          │   │ totalProducts     │
                            │ totalPrice        │   │ totalCategories   │
                            │ createdAt         │   │ totalSuppliers    │
                            │ updatedAt         │   │ lowStockProducts  │
                            └───────────────────┘   │ outOfStockProducts│
                                                    │ monthlyRevenue    │
                                                    │ dailySales        │
                                                    │ topSellingProduct │
                                                    │ lastUpdated       │
                                                    └───────────────────┘
```

---

## Environment Variables

Configure the following variables in `backend/.env`:

| Variable | Required | Description | Example |
|----------|:--------:|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/stock_db?schema=public` |
| `JWT_SECRET` | Yes | 256-bit cryptographic secret for JWT signing | `your_super_secret_jwt_key_here` |
| `PORT` | No | Express server listener port (defaults to 3000) | `3000` |

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made by Ayoub Ben Omar
</p>

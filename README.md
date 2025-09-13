# E-Commerce Platform

A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### Backend
- **Authentication**
  - JWT-based authentication
  - User registration and login
  - Protected routes

- **Product Management**
  - CRUD operations for products
  - Filter products by category and price
  - Product search functionality

- **Cart Management**
  - Add/Remove items from cart
  - Update item quantities
  - Persistent cart (survives page reloads and logouts)

### Frontend
- **User Authentication Pages**
  - Sign up page with form validation
  - Login page with error handling
  - Protected routes for authenticated users

- **Product Display**
  - Product listing with filters
  - Category-based filtering
  - Price range filtering
  - Responsive product grid

- **Shopping Cart**
  - Add items to cart
  - Remove items from cart
  - Adjust item quantities
  - Cart persistence after logout

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- cors

### Frontend
- React (with Vite)
- React Router DOM
- Tailwind CSS
- Axios
- Context API for state management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayp47098/Astrape-Ai.git
   cd Astrape-Ai
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a .env file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `GET /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:productId` - Update cart item quantity (protected)
- `DELETE /api/cart/:productId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

## Project Structure

```
Astrape-Ai/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React documentation
- Express.js documentation
- MongoDB documentation
- Tailwind CSS documentation
- React Router documentation
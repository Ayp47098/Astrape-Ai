const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Headphones',
    image: 'https://example.com/headphones.jpg',
    stock: 50
  },
  {
    name: 'Smartphone',
    price: 699.99,
    description: 'Latest smartphone with advanced features',
    category: 'Electronics',
    image: 'https://example.com/smartphone.jpg',
    stock: 30
  },
  {
    name: 'Running Shoes',
    price: 79.99,
    description: 'Comfortable running shoes for athletes',
    category: 'Sports',
    image: 'https://example.com/shoes.jpg',
    stock: 100
  },
  {
    name: 'Gaming Laptop',
    price: 1299.99,
    description: 'Powerful gaming laptop with high-end graphics',
    category: 'Laptops',
    image: 'https://example.com/laptop.jpg',
    stock: 20
  }
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(sampleProducts);
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();

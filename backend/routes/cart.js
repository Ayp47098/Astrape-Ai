const express = require('express');
const {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
  clearCart
} = require('../controllers/cart');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All cart routes are protected

router.route('/')
  .get(getCart)
  .post(addItemToCart)
  .delete(clearCart);

router.route('/:productId')
  .delete(removeItemFromCart)
  .put(updateCartItem);

module.exports = router;

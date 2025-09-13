const Cart = require('../models/cart');
const Product = require('../models/product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'cartItems.product',
      select: 'name price image'
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: { cartItems: [] }
      });
    }

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Check if cart exists for user
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // Create new cart if none exists
      cart = await Cart.create({
        user: req.user.id,
        cartItems: [{ product: productId, quantity }]
      });
    } else {
      // Check if product already in cart
      const itemIndex = cart.cartItems.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Update quantity if product already in cart
        cart.cartItems[itemIndex].quantity = quantity;
      } else {
        // Add new product to cart
        cart.cartItems.push({ product: productId, quantity });
      }

      await cart.save();
    }

    // Fetch the updated cart with populated product details
    cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'cartItems.product',
      select: 'name price image'
    });

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
exports.removeItemFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }

    // Remove item from cart
    cart.cartItems = cart.cartItems.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { quantity } = req.body;

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }

    // Find item in cart
    const itemIndex = cart.cartItems.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Item not found in cart'
      });
    }

    // Update quantity
    cart.cartItems[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

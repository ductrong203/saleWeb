const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, require: true },
        amount: { type: Number, require: true },
        image: { type: String, require: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, require: true },
      address: { type: String, require: true },
      country: { type: String, require: true },
      phone: { type: Number, require: true },
    },
    paymentMethod: { type: String, require: true },
    itemPrice: { type: Number, require: true },
    shippingPrice: { type: Number, require: true },
    taxPrice: { type: Number, require: true },
    totalPrice: { type: Number, require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, deafault: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

const express = require("express");
const { authMiddleWare } = require("../middleWare/authMiddleWare");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
router.post("/create-product", authMiddleWare, ProductController.createProduct);
router.put("/update-product/:id", ProductController.updateProduct);
router.get("/get-all", ProductController.getAllProduct);
router.get("/get-detail-product/:id", ProductController.getDetailProduct);
router.delete(
  "/delete-product/:id",
  authMiddleWare,
  ProductController.deleteProduct
);
router.delete(
  "/delete-all-product",
  authMiddleWare,
  ProductController.deleteAllProduct
);
module.exports = router;

const express = require("express");
const productService = require("../service/ProductService");
const e = require("express");
// create Product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      originPrice,
      selled,
    } = req.body;

    if (
      !name ||
      !image ||
      !type ||
      !countInStock ||
      !rating ||
      !description ||
      !discount ||
      !originPrice ||
      !selled
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required!",
      });
    }
    console.log(req.body);
    const response = await productService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: e,
    });
  }
};
// update product
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      res.status(200).json({
        message: "the id is required!",
      });
    }
    const response = await productService.updateProduct(id, data);
    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      message: e,
    });
  }
};
// get all product
const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await productService.getAllProduct(
      Number(limit) || 6,
      Number(page) || 1,
      sort,
      filter
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: e });
  }
};
//get detail product
const getDetailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(200).json({ message: "The Product id is required!" });
    }
    const response = await productService.getDetailProduct(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: e });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(200).json({ message: "The Product id is required!" });
    }
    const response = await productService.deleteProduct(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ message: e });
  }
};
const deleteAllProduct = async (req, res) => {
  try {
    const response = await productService.deleteAllProduct();
    return res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ message: e });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  getDetailProduct,
  deleteProduct,
  deleteAllProduct,
};

const express = require("express");
const Product = require("../models/ProductModel");
const createProduct = (product) => {
  return new Promise(async (resolve, reject) => {
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
      } = product;
      const checkProduct = await Product.findOne({ name: name });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "Name of product is already exist!",
        });
      }

      const createdProduct = await Product.create({
        name,
        image,
        type,
        price: originPrice * (1 - discount / 100),
        countInStock,
        rating,
        description,
        discount,
        selled,
        originPrice,
      });
      if (createdProduct) {
        resolve({
          status: "OK",
          message: "Create a product successfully!",
          data: createdProduct,
        });
      }
    } catch (error) {
      reject(e);
    }
  });
};
//api update product
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = Product.findOne({ id: id });
      if (!checkProduct) {
        resolve({
          status: "ERR",
          message: "Product is undefined!",
        });
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      console.log(updatedProduct);
      if (updatedProduct) {
        resolve({
          status: "OK",
          message: "Update product successfully!",
          updatedProduct,
        });
      }
    } catch (error) {
      reject(e);
    }
  });
};
// api get all product
const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("sort", sort);
      console.log("filer", filter);
      const totalProduct = await Product.countDocuments({});
      if (filter) {
        const label = filter[0];
        const allProductFilter = await Product.find({
          [label]: { $regex: filter[1], $options: "i" },
        })
          .limit(limit)
          .skip((page - 1) * limit);
        resolve({
          status: "OK",
          message: "All products:",
          data: allProductFilter,
          total: totalProduct,
          pageCurrent: page,
          limit: limit,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        console.log(objectSort);
        const allProductSort = await Product.find()
          .limit(limit)
          .skip((page - 1) * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "All products:",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: page,
          limit: limit,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      const allProduct = await Product.find()
        .limit(limit)
        .skip((page - 1) * limit);
      resolve({
        status: "OK",
        message: "All products:",
        data: allProduct,
        total: totalProduct,
        pageCurrent: page,
        limit: limit,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
// api get detail product
const getDetailProduct = (idreq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: idreq });
      if (checkProduct == null) {
        resolve({
          status: "OK",
          message: "The product is undefined!",
        });
      }
      resolve({
        status: "OKE",
        message: "SUCCESS!",
        checkProduct,
      });
    } catch (error) {
      reject(e);
    }
  });
};
//api delete product
const deleteProduct = (idreq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: idreq });
      if (checkProduct == null) {
        resolve({
          status: "OK",
          message: "The product is undefined!",
        });
      }
      await Product.findByIdAndDelete(idreq);
      resolve({
        status: "OK",
        message: "Delete Product successfully! Deleted Product with id: ",
        idreq,
      });
    } catch (error) {
      reject(e);
    }
  });
};
const deleteAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany();
      resolve({
        status: "OK",
        message: "Deleted All Product successfully!",
      });
    } catch (error) {}
  });
};
module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  getDetailProduct,
  deleteProduct,
  deleteAllProduct,
};

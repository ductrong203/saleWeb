const express = require("express");
const User = require("../models/UserModel");
const Bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService");
//**api create user
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone, isAdmin } = newUser;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "this email has already exited! Please try another email !",
        });
      }
      const hash = Bcrypt.hashSync(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hash,
        //confirmPassword,
        phone,
        isAdmin,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Success!",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
//**api login User
const loginUser = (user) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = user;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser == null) {
        resolve({
          status: "ERR",
          message: "user is not defined!",
        });
      }
      //const checkpass = password == checkUser.password;

      const comparePassword = Bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "user or password is not correct !",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        message: "Success!",
        data: checkUser,
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject(e);
    }
  });
};
// api delete user
const deleteUser = (idreq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: idreq,
      });
      if (checkUser == null) {
        resolve({
          status: "ERR",
          message: "User is not defined!",
        });
      }
      console.log("UserID:", idreq);
      await User.findByIdAndDelete(idreq);
      resolve({
        message: "Deleted user successfully!",
      });
    } catch (error) {
      reject(e);
    }
  });
};
// api get user data
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        message: "Users information:",
        data: allUser,
      });
    } catch (error) {
      reject(e);
    }
  });
};
// api get detail user
const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      console.log(id);
      if (checkUser == null) {
        resolve({
          status: "ERR",
          message: "User is not defined!",
        });
      }
      resolve({
        status: "SUCCESS!",
        message: "Users inf with id:",
        id,
        data: checkUser,
      });
    } catch (error) {
      reject(e);
    }
  });
};
// api update user
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      if (checkUser == null) {
        resolve({
          status: "ERR",
          message: "User is not defined!",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "SUCCESS!",
        message: "User is updated!",
        data: updatedUser,
      });
      console.log(checkUser);
    } catch (error) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  updateUser,
};

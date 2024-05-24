const express = require("express");
const UserService = require("../service/UserSevice");
const jwtService = require("../service/jwtService");
//** create User
const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, isAdmin } = req.body;
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: "ERR",
        message: "the input is required",
      });
    } else if (isCheckEmail == false) {
      return res.status(200).json({
        status: "ERR",
        message: "the input is email",
      });
    } else if (confirmPassword !== password) {
      return res.status(200).json({
        status: "ERR",
        message: "the confirmPassword is equal password",
      });
    }
    console.log("isCheckEmail:", isCheckEmail);
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "email and password is required!",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "the email is invalid !",
      });
    }
    const reponse = await UserService.loginUser(req.body);
    return res.status(200).json(reponse);
  } catch (error) {
    return res.status(404).json({
      message: e,
    });
  }
};
// delete user
const deleteUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    if (!idUser) {
      return res.status(200).json({
        status: "ERR",
        message: "Users ID is required!",
      });
    }
    const reponse = await UserService.deleteUser(idUser);
    return res.status(200).json(reponse);
  } catch (error) {
    return res.status(404).json({ message: e });
  }
};
// get User data
const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: e });
  }
};
//get detail user
const getDetailUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(200)
        .json({ status: "ERR", message: "User ID is required!" });
    }
    const response = await UserService.getDetailUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: e });
  }
};
// update user
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      res.status(202).json({
        status: "ERR",
        message: "Users ID is required!",
      });
    }
    const email = req.body.email;
    console.log(email);
    if (email !== undefined) {
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const checkEmail = reg.test(email);
      if (!checkEmail) {
        return res.status(200).json({
          status: "ERR",
          message: "Email is not emails type!",
        });
      }
    }
    //console.log(checkEmail);
    const reponse = await UserService.updateUser(id, data);
    return res.status(200).json(reponse);
  } catch (error) {
    return res.status(404).json({ message: e });
  }
};
//refresh token
const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    if (token == null) {
      return res.status(200).json({
        message: "token is required!",
      });
    }
    const response = await jwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({ message: e });
  }
};

module.exports = {
  createUser,
  loginUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  updateUser,
  refreshToken,
};

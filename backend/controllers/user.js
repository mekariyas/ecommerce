import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Product from "../models/product.js";
import Order from "../models/order.js";

const refresh = (req, res) => {
  const refreshToken = req.cookies.userCookie;
  if (!refreshToken) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.SECRET_TOKEN);
    const accessToken = jwt.sign(
      { _id: decoded._id, role: decoded.role },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return res
        .status(409)
        .json({ message: "Email is already in use", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      fName: firstName,
      lName: lastName,
      email: email,
      password: hashedPassword,
    });
    const getUser = await User.findOne({ email: email });
    const accessToken = jwt.sign(
      { _id: getUser._id, role: getUser.role },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { _id: getUser._id, role: getUser.role },
      process.env.SECRET_TOKEN,
      { expiresIn: "168h" },
    );

    res.cookie("userCookie", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res
      .status(200)
      .json({ message: "User created", success: true, accessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const verifyUser = await bcrypt.compare(password, findUser.password);
    if (!verifyUser) {
      return res
        .status(401)
        .json({ message: "Incorrect password", success: false });
    }
    const accessToken = jwt.sign(
      { _id: findUser._id, role: findUser.role },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { _id: findUser._id, role: findUser.role },
      process.env.SECRET_TOKEN,
      { expiresIn: "168h" },
    );

    res.cookie("userCookie", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res
      .status(200)
      .json({ message: "successfully authorized", success: true, accessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const getProducts = async (req, res) => {
  try {
    const { skip } = req.queryData;
    const totalProducts = await Product.countDocuments({});
    const products = await Product.find({ stock: { $gt: 0 } })
      .skip(skip)
      .limit(5);
    if (products.length == 0) {
      return res
        .status(404)
        .json({ message: "No products found", success: false });
    }

    const jwt_cookie = req.cookies?.userCookie;
    if (!jwt_cookie) {
      return res.status(200).json({
        products: products,
        totalProducts: totalProducts,
        accessToken: "",
      });
    }

    jwt.verify(jwt_cookie, process.env.SECRET_TOKEN, function (err, decoded) {
      if (err) {
        return res
          .status(200)
          .json({ products: products, totalProducts: totalProducts });
      }
      const decodedToken = decoded;
      const accessToken = jwt.sign(
        { _id: decodedToken._id, role: decodedToken.role },
        process.env.SECRET_TOKEN,
        { expiresIn: "15m" },
      );
      return res.status(200).json({
        products: products,
        totalProducts: totalProducts,
        accessToken,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const getProduct = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res
      .status(400)
      .json({ message: "No query defined", success: false });
  }
  try {
    const item = await Product.findOne({ name: name });
    if (!item) {
      return res
        .status(404)
        .json({ message: "Item not found", success: false });
    }
    const jwt_token = req.cookies.userCookie;
    if (!jwt_token) {
      return res.status(200).json({ item, accessToken: "" });
    }
    jwt.verify(jwt_token, process.env.SECRET_TOKEN, function (err, decoded) {
      if (err) {
        return res.status(200).json({ item, accessToken: "" });
      }
      const decodedToken = decoded;
      const accessToken = jwt.sign(
        { _id: decodedToken._id, role: decodedToken.role },
        process.env.SECRET_TOKEN,
        { expiresIn: "15m" },
      );
      return res.status(200).json({ item, accessToken });
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const placeOrder = async (req, res) => {
  const { order, address } = req.body;
  const userId = req.userId;
  const totalPrice = order.reduce((prev, curr) => {
    return prev + curr.price;
  }, 0);

  try {
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res
        .status(404)
        .json({ message: "User not found login or sign up", success: false });
    }

    //begin transaction for order placement

    const session = await mongoose.startSession();
    session.startTransaction();
    for (const item of order) {
      try {
        const product = await Product.findById(item._id).session(session);
        if (!product) {
          throw new Error("Product not found");
        } else if (product.stock < item.amount) {
          throw new Error("Not enough stock");
        }
        product.stock -= item.amount;

        await product.save({ session });
      } catch (error) {
        console.log(error.message);
        return res
          .status(400)
          .json({ message: `${error.message}`, success: false });
      }
    }

    const newOrder = new Order({
      user: userId,
      address,
      OrderList: order,
      totalPrice,
    });
    await newOrder.save();
    await session.commitTransaction();
    session.endSession();

    // ---End of transaction--

    return res
      .status(200)
      .json({ message: "Ordered Successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const logOut = async (req, res) => {
  const cookie = req.cookies.userCookie;
  if (!cookie) {
    return res
      .status(404)
      .json({ message: "cookie not found", success: false });
  }

  res.clearCookie("userCookie", {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res
    .status(200)
    .json({ message: "successfully logged out", success: true });
};

export { signUp, signIn, getProduct, placeOrder, getProducts, logOut, refresh };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Product from "../models/product.js";
import Order from "../models/order.js";

//log in and log out(get request)
//add a new product (post request)
//restock a product(put request)
//delete a product(delete request)

//admin

const refresh = (req, res) => {
  const refreshToken = req.cookies.userCookie;
  if (!refreshToken) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.ADMIN_SECRET_TOKEN);
    const accessToken = jwt.sign(
      { _id: decoded._id, role: decoded.role },
      process.env.ADMIN_SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const getUser = await User.findOne({ email: email });
    if (!getUser) {
      return res
        .status(404)
        .json({ message: "User Does not Exist", success: false });
    }
    if (getUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied: Admins only", success: false });
    }
    const verifyUser = await bcrypt.compare(password, getUser.password);
    if (!verifyUser) {
      return res
        .status(401)
        .json({ message: "Incorrect password", success: false });
    }
    const accessToken = jwt.sign(
      { _id: getUser._id, role: getUser.role },
      process.env.ADMIN_SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { _id: getUser._id, role: getUser.role },
      process.env.ADMIN_SECRET_TOKEN,
      { expiresIn: "168h" },
    );

    res.cookie("adminCookie", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res
      .status(200)
      .json({
        message: "successfully authorized",
        success: true,
        accessToken,
        id: getUser.id,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const logout = async (req, res) => {
  const cookie = req.cookies?.adminCookie;

  if (!cookie) {
    return res
      .status(404)
      .json({ message: "cookie not found", success: false });
  }

  res.clearCookie("adminCookie", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res
    .status(200)
    .json({ message: "successfully logged out", success: true });
};

const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await User.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const accessToken = jwt.sign(
      { _id: admin._id, role: admin.role },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    return res
      .status(200)
      .json({ firstName: admin.fName, lastName: admin.lName, accessToken });
  } catch (error) {
    console.log("Error Admin");
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

//Product CRUD

const addProduct = async (req, res) => {
  const { name, price, brand, description, size, stock, color } = req.body;
  const image = req.file?.filename;
  const adminId = req.userId;
  if (
    !name ||
    !price ||
    !brand ||
    !description ||
    !size ||
    !stock ||
    !color ||
    !image
  ) {
    return res.status(400).json({ message: "Incomplete data", success: false });
  }

  try {
    const itemStored = await Product.findOne({ name: name });
    if (itemStored) {
      return res
        .status(409)
        .json({ message: "Item already exists", success: false });
    }
    await Product.create({
      name: name,
      price: Number(price),
      brand: brand,
      description: description,
      stock: Number(stock),
      size: size.split(","),
      color: color.split(","),
      image: image,
    });

    const accessToken = jwt.sign(
      { _id: decodedToken._id, role: decodedToken.role },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    return res.status(201).json({ message: "Item Created", accessToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const { skip } = req.queryData;
    const totalProducts = await Product.countDocuments({});
    const products = await Product.find({ stock: { $gt: 0 } })
      .skip(skip)
      .limit(5);
    const adminId = req.userId;
    const accessToken = jwt.sign(
      { _id: adminId, role: "admin" },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );

    return res
      .status(200)
      .json({ products: products, totalProducts, accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const getProduct = async (req, res) => {
  const { name } = req.params;
  const adminId = req.userId;
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
    const accessToken = jwt.sign(
      { _id: adminId, role: "admin" },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    return res.status(200).json({ item, accessToken });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const restockProduct = async (req, res) => {
  const { name, price, brand, description, stock, color } = req.body;
  const image = req.file?.filename ?? req.body.image;
  const adminId = req.userId;
  if (!name) {
    return res
      .status(401)
      .json({ message: "Product name not provided", success: false });
  }
  try {
    await Product.findOneAndUpdate(
      { name: name },
      {
        name: name,
        price: price,
        brand: brand,
        description: description,
        stock: stock,
        color: color,
        image: "../uploads/shoe-items/" + image,
      },
    );
    const accessToken = jwt.sign(
      { _id: adminId, role: "admin" },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    return res
      .status(200)
      .json({ message: "Product Updated", success: true, accessToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { name } = req.body;
  const adminId = req.userId;
  if (!name) {
    return res
      .status(401)
      .json({ message: "Product name not provided", success: false });
  }
  try {
    const findItem = await Product.findOne({ name: name });
    const accessToken = jwt.sign(
      { _id: adminId, role: "admin" },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    if (!findItem) {
      return res
        .status(404)
        .json({ message: "Product does not exist", success: false });
    }
    await Product.findOneAndDelete({ name: name });
    return res
      .status(204)
      .json({ message: "Product deleted", success: true, accessToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const adminId = req.userId;
    const skip = parseInt(req.query.skip) || 0;
    const totalOrders = await Order.countDocuments({});
    const orders = await Order.find({ status: "Pending" })
      .skip(skip)
      .limit(5)
      .sort({ createdAt: -1 });
    let allOrders = [];
    for (const order of orders) {
      allOrders = [
        ...allOrders,
        await order.populate("user", ["fName", "lName", "email"]),
      ];
    }
    const accessToken = jwt.sign(
      { _id: adminId, role: "admin" },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    return res
      .status(200)
      .json({ orders: allOrders, totalOrders, accessToken });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const getOrder = async (req, res) => {
  const { orderId } = req.params;
  const adminId = req.userId;
  if (!orderId) {
    return res
      .status(400)
      .json({ message: "No query defined", success: false });
  }
  try {
    const order = await Order.findById(orderId).populate("user", [
      "fName",
      "lName",
      "email",
    ]);
    if (!order) {
      return res
        .status(404)
        .json({ message: "No order found", success: false });
    }
    const accessToken = jwt.sign(
      { _id: adminId, role: "admin" },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    return res.status(200).json({ order, accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export {
  login,
  getAdmin,
  logout,
  addProduct,
  getProduct,
  restockProduct,
  deleteProduct,
  getProducts,
  getOrders,
  getOrder,
  refresh,
};

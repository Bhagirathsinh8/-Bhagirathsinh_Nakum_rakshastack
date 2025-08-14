const User = require("../models/User");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { serverConfig } = require("../utils/constant");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(StatusCodes.BAD_REQUEST).json({ success:false,message: "Email already exists",data:null, });

    const salt = 10
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name, email, password: hashedPassword, role
    });
    await newUser.save();

   return res.status(StatusCodes.CREATED).json({success:true,message: "User registered successfully",data:newUser });
  } catch (error) {
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success:false,
        message: error.message,
        data:null
     });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message: "Invalid email or password",data:null,});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(StatusCodes.BAD_REQUEST).json({ success:false,message: "Invalid email or password",data:null,});

    const token = jwt.sign({ id: user._id, role: user.role }, serverConfig.JWT_SECRET_KEY, {
      expiresIn: "7d"
    });

    return res.status(StatusCodes.OK).json({success:true,message: "Login successful", token,data:user });
  } catch (error) {
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success:false,
        message: error.message,
        data:null
     });
  }
};

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");
const otpService = require("./otp.service.js");

// const createUser = async (userData) => {
//   try {
//     let { firstName, lastName, email, password, otp } = userData;
    
//     email = email.toLowerCase().trim();
    
//     const isUserExist = await User.findOne({ email });
//     if (isUserExist) {
//       throw new Error(`User already exists with email: ${email}`);
//     }
    
//     if (!otp) {
//       await otpService.sendOTP(email);
//       return { otpSent: true, message: "OTP sent to email" };
//     }
    
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password, otp } = userData;
    
    email = email.toLowerCase().trim();
    
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error(`User already exists with email: ${email}`);
    }
    
    if (!otp) {
      await otpService.sendOTP(email);
      return { otpSent: true, message: "OTP sent to email" };
    }
    
    // Verify OTP before creating user
    const otpVerification = await otpService.verifyOTP(email, otp);
    if (!otpVerification.valid) {
      throw new Error(otpVerification.message);
    }
    
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
    
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");
    if (!user) {
      throw new Error(`User not found with id: ${userId}`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User not found with email: ${email}`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);

    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User not found with id :", userId);
    }
    // console.log("user", user)
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const resetUserPassword = async (email, newPassword) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User not found with email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    await user.save();

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserRole = async (userId, role) => {
  try {
    // Validate the role
    const validRoles = ["CUSTOMER", "ADMIN"];
    if (!validRoles.includes(role)) {
      throw new Error("Invalid role specified");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
  resetUserPassword,
  updateUserRole,
};

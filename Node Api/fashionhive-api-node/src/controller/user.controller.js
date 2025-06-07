userService = require("../services/user.service.js");
const otpService = require("../services/otp.service.js");

const getUserProfile = async (req, res) => {
  const jwt = req.headers.authorization?.split(" ")[1];
  // console.log("req", jwt);
  try {
    // in  bearer token [bearer, token] will split in an array and then token will only be used on index 1

    if (!jwt) {
      return res.status(404).send({ message: "Unauthorized!" });
    }
    const user = await userService.getUserProfileByToken(jwt);

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const initiateSignup = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    
    const normalizedEmail = email.toLowerCase().trim();
    
    try {
      // Try to find user - if found, it's an error
      const existingUser = await userService.getUserByEmail(normalizedEmail);
      if (existingUser) {
        return res.status(400).send({ error: `User already exists with email: ${normalizedEmail}` });
      }
    } catch (error) {
      // If user not found, this is expected - continue with OTP sending
      if (!error.message.includes('not found')) {
        throw error;
      }
    }
    
    await otpService.sendOTP(normalizedEmail);
    return res.status(200).send({ message: "OTP sent to email" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    console.log(
      "Forgot password request for normalized email:",
      normalizedEmail
    );

    const user = await userService.getUserByEmail(normalizedEmail);
    if (!user) {
      console.log("No user found with email:", normalizedEmail);
      return res.status(404).send({ error: "User not found" });
    }

    await otpService.sendOTP(normalizedEmail);
    console.log("OTP sent to:", normalizedEmail);

    return res.status(200).send({
      message: "OTP sent to email",
      email: normalizedEmail, // Return normalized email
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).send({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;

    // Normalize and validate input
    email = email.toLowerCase().trim();
    console.log("Reset password request for:", email);

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Email, OTP and new password are required",
      });
    }

    console.log("Verifying OTP for:", email);
    const otpVerification = otpService.verifyOTP(email, otp);
    console.log("Verification result:", otpVerification);

    if (!otpVerification.valid) {
      return res.status(400).json({
        success: false,
        error: otpVerification.message,
      });
    }

    console.log("Resetting password for:", email);
    const user = await userService.resetUserPassword(email, newPassword);

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[Password Reset Error]", error);
    return res.status(500).json({
      success: false,
      error: "Failed to reset password",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const updatedUser = await userService.updateUserRole(userId, role);

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const completeSignup = async (req, res) => {
  try {
    const userData = req.body;
    
    // Required fields validation
    if (!userData.email || !userData.otp || !userData.password) {
      return res.status(400).send({ 
        error: "Email, OTP and password are required" 
      });
    }
    
    const user = await userService.createUser(userData);
    
    return res.status(201).send({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    return res.status(500).send({ 
      error: error.message 
    });
  }
};

module.exports = {
  getUserProfile,
  getAllUsers,
  initiateSignup,
  createUser,
  forgotPassword,
  resetPassword,
  updateUserRole,
  completeSignup,
};

// Import Dependencies
import express from "express";
import isLoggedIn from "../../middleware/isLoggedIn.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";
import User from "./../userModel.js";

const userRoute = express.Router();

userRoute.get(
  "/users",
  catchAsync(async (req, res) => {
    const users = await User.find();
    if (users.length <= 0) {
      return next(new AppError("User not Found", 404));
    }
    res.status(200).json({ data: users });
  })
);

userRoute.get(
  "/me", isLoggedIn ,
  catchAsync(async (req, res, next) => {
    res.status(200).json(req.user);
  })
);

userRoute.delete(
  "/user/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("Invalid data Input", 406));
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted." });
  })
);

userRoute.patch(
  "/user", isLoggedIn ,
  catchAsync(async (req, res, next) => {
    const { name, email, phone } = req.body;

    const updatedData = {
      name: name,
      email: email,
      phone: phone,
    };

    const user = await User.findByIdAndUpdate(req.user._id, {
      $set: updatedData,
    });
    if (!user) {
      res.status(404).json("User not found!");
    }
    res.status(200).json("SuccessFull");
  })
);

userRoute.post(
  "/user/add-new-address", isLoggedIn ,
  catchAsync(async (req, res, next) => {
    const customer = req.user;
    console.log(customer);
    
    const { long, lat, addressLine1, addressLine2, country, city, state, zipcode } =
      req.body;

    const newAddress = {
      $push: {
        address: {
          long: long,
          lat: lat,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          country: country,
          city: city,
          state: state,
          zipcode: zipcode,
        },
      },
    };

    // Find User
    if (customer.address.length >= 3) {
      return res.status(200).json({ message: "You can add only 3 addresses." });
    }

    await customer.update(newAddress);

    return res.status(201).json({ message: "successFull" });
  })
);

userRoute.get(
  "/user/addresses", isLoggedIn ,
  catchAsync(async (req, res, next) => {
    const customer = req.user;

    const customerAddress = await User.findById(customer._id).select("address");
    return res.status(200).json({
      status: "success",
      data: customerAddress.address,
    });
  })
);

userRoute.patch(
  "/user/address/:addressId", isLoggedIn ,
  catchAsync(async (req, res, next) => {
    const customer = req.user;
    const { addressId } = req.params;
    const { long, lat, addressLine1, addressLine2, city, state, zipcode } =
      req.body;

    if (
      !addressId ||
      !addressLine1 ||
      !addressLine2 ||
      !city ||
      !state ||
      !zipcode
    ) {
      return next(new AppError("Invalid data Input", 406));
    }

    const updateAddress = {
      $set: {
        "address.$.long": long,
        "address.$.lat": lat,
        "address.$.addressLine1": addressLine1,
        "address.$.addressLine2": addressLine2,
        "address.$.city": city,
        "address.$.state": state,
        "address.$.zipcode": zipcode,
      },
    };

    // Address Update
    await User.findOneAndUpdate(
      {
        _id: customer._id,
        "address._id": addressId,
      },
      updateAddress
    );

    return res.status(200).json({ message: "success"});
  })
);

userRoute.delete(
  "/user/address/:addressId", isLoggedIn ,
  catchAsync(async (req, res, next) => {
    const customer = req.user;
    const { addressId } = req.params;

    if (!addressId) {
      return next(new AppError("Invalid data Input", 406));
    }

    // Delete Address
    await User.findByIdAndUpdate(customer._id, {
      $pull: { address: { _id: addressId } },
    });
    res.status(200).json({ message: "success"});
  })
);


// export
export default userRoute ;
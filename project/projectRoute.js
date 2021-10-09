// Import Dependencies
import express from "express";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";
import Project from "./peojectModel.js";

const projectRoute = express.Router();

projectRoute.post(
  "/",
  catchAsync(async (req, res, next) => {
    const { customer, title, descriptions } = req.body;

    if (!customer || !title || !descriptions) {
      return next(new AppError(`Invalid input data`, 406));
    }

    const project = await Project.create(req.body);

    if (!project) {
      return next(new AppError(`Something went wrong`, 409));
    }

    res.status(201).json({
      status: "success",
      data: project,
    });
  })
);

// export
export default projectRoute ;
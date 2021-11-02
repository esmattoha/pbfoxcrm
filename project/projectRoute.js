// Import Dependencies
import express from "express";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";
import Project from "./peojectModel.js";

const projectRoute = express.Router();

projectRoute.post(
  "/",
  catchAsync(async (req, res, next) => {
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

projectRoute.get(
  "/",
  catchAsync(async (req, res, next) => {
    const projects = await Project.find({});

    if (projects.length <= 0) {
      return next(new AppError(`Resource not found.`, 404));
    }

    res.status(200).json({
      status: "success",
      data: projects,
    });
  })
);

projectRoute.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new AppError(`Resource not found.`, 404));
    }

    res.status(200).json({
      status: "success",
      data: project,
    });
  })
);

projectRoute.patch(
  "/:id",
  catchAsync(async (req, res, next) => {
    const project = await Project.findByIdAndUpdate(req.params.id,{$set: req.body});

    if (!project) {
      return next(new AppError(`Resource not found.`, 404));
    }

    res.status(200).json({
      status: "success",
    });
  })
);

projectRoute.delete(
  "/:id",
  catchAsync(async (req, res, next) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return next(new AppError(`Resource not found.`, 404));
    }

    res.status(200).json({
      status: "success",
    });
  })
);

// export
export default projectRoute;

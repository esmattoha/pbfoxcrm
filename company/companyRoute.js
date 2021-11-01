// Import Dependencies
import express from "express";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";
import Company from "./companyModel.js";

const companyRouter = express.Router();

companyRouter.post(
  "/company",
  catchAsync(async (req, res, next) => {
    const createdCompany = await Company.create(req.body);

    if (!createdCompany) {
      return next(new AppError("something went wrong , try again", 422));
    }
    res.status(201).json(createdCompany);
  })
);

companyRouter.get(
  "/companies",
  catchAsync(async (req, res, next) => {
    const companies = await Company.find({}).select("-__v");

    if (companies.length <= 0) {
      return next(new AppError("Resource not Found", 404));
    }

    res.status(200).json(companies);
  })
);

companyRouter.get(
  "/company/:id",
  catchAsync(async (req, res, next) => {
    const company = await Company.findById(req.params.id).select("-__v");

    if (!company) {
      return next(new AppError("Resource not Found", 404));
    }

    res.status(200).json(company);
  })
);

companyRouter.patch(
  "/company/:id",
  catchAsync(async (req, res, next) => {
    const company = await Company.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        about: req.body.about,
        workTypes: req.body.workTypes,
        admin: req.body.admin,
      },
    }).select("-__v");

    if (!company) {
      return next(new AppError("Resource not Found", 404));
    }

    res.status(200).json("Updated.");
  })
);

companyRouter.delete(
  "/company/:id",
  catchAsync(async (req, res, next) => {
    const company = await Company.findByIdAndDelete(req.params.id).select(
      "-__v"
    );

    if (!company) {
      return next(new AppError("Resource not Found", 404));
    }

    res.status(200).json("Deleted.");
  })
);
// export
export default companyRouter;

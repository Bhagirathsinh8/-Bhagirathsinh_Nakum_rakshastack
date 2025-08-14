const PGListing = require("../models/PGListing");
const { StatusCodes } = require("http-status-codes");

exports.addPG = async (req, res) => {
  try {
    const { name, location, price, amenities, gender, images } = req.body;
    const existPg = await PGListing.findOne({ name, location });

    if (existPg)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ success: false, message: "PG Already exist", data: null });

    const newPG = new PGListing({
      name,
      location,
      price,
      amenities,
      gender,
      images,
      owner: req.user.id,
    });
    await newPG.save();
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "PG added successfully", data: newPG });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

exports.getPGs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pgs = await PGListing.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Get All PG Successfully", data: pgs });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

exports.searchPGs = async (req, res) => {
  try {
    const { location, gender, priceMax } = req.query;
    const filter = {};

    if (location) filter.location = { $regex: location, $options: "i" };
    if (gender) filter.gender = gender;
    if (priceMax) filter.price = { $lte: Number(priceMax) };

    const pgs = await PGListing.find(filter);
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Get All PG Successfully", data: pgs });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

exports.getPGDetails = async (req, res) => {
  try {
    const pg = await PGListing.findById(req.params.id).populate(
      "owner",
      "name email"
    );
    if (!pg)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "PG not found", data: null });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Get PG Details Successfully",
      data: pg,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

exports.deletePg = async (req, res) => {
  try {
    const { id } = req.params;
    const pg = await PGListing.findByIdAndDelete(id);
    if (!pg)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "PG not found", data: null });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "PG deleted successfully",
      data: pg,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

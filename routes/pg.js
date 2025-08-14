const express = require("express");
const Controller = require("../controllers/pgController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/search", Controller.searchPGs);

router.get("/listing", Controller.getPGs);

router.get("/details/:id", Controller.getPGDetails);

router.post("/add-pg", verifyToken, Controller.addPG);

router.delete("/delete/:id",verifyToken,Controller.deletePg)

module.exports = router;

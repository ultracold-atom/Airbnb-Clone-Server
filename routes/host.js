const router = require("express").Router();
const Host = require("../models/host");

const upload = require("../middlewares/upload-photo");
// POST request - create a new product

// title: String,
//   description: String,
//   photo: String,
//   price: Number,
//   stockQuantity: Number,
//   rating: [Number]

router.post("/hosts", upload.single("photo"), async (req, res) => {
  try {
    let host = new Host();
    host.title = req.body.title;
    host.category = req.body.category;
    host.owner = req.body.owner;
    host.address = req.body.address;
    host.country = req.body.country
    host.roomNumber = req.body.roomNumber
    host.features = req.body.features
    host.price = req.body.price;
    host.photo = req.file.location;

    await host.save(); // async

    res.json({
      status: true,
      message: "Successfully saved"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET requesst - get all products
router.get("/hosts", async (req, res) => {
  try {
    let hosts = await Host.find()
    res.json({
      success: true,
      hosts: hosts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET request - get a single product
router.get("/hosts/:id", async (req, res) => {
  try {
    let host = await Host.findOne({ _id: req.params.id })
    res.json({
      success: true,
      host: host
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// PUT request - Update a single product
router.put("/hosts/:id", upload.single("photo"), async (req, res) => {
  try {
    let host = await Host.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          photo: req.file.location,
          address: req.body.address,
          country: req.body.country,
          roomNumber: req.body.roomNumber,
          features: req.body.features,
          owner: req.body.owner
        }
      },
      { upsert: true }
    );

    res.json({
      success: true,
      updatedHost: host
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// DELETE request - delete a single product
router.delete("/hosts/:id", async (req, res) => {
  try {
    let deletedHost = await Host.findOneAndDelete({ _id: req.params.id });

    if (deletedHost) {
      res.json({
        status: true,
        message: "Successfully deleted"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
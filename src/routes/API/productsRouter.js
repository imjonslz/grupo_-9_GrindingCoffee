const express = require ("express");
const router = express.Router();
const apiProductsController = require("../../controllers/API/productsController")

router.get("/", apiProductsController.allProducts);

router.get("/:id", apiProductsController.productDetail);

module.exports = router;
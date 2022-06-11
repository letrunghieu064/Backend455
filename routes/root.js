const express = require("express");
const router = express.Router();
const user_router = require("./user");
router.use(user_router);
module.exports = router;

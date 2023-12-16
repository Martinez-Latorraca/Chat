const express = require("express");
const router = express.Router();
const styleController = require("../controllers/styleController");
var { expressjwt: checkJwt } = require("express-jwt");

router.get("/", styleController.index);
router.post(
  "/",
  checkJwt({ secret: process.env.JWT_ADMIN_SECRET_KEY, algorithms: ["HS256"] }),
  styleController.store,
);
router.patch(
  "/:id",
  checkJwt({ secret: process.env.JWT_ADMIN_SECRET_KEY, algorithms: ["HS256"] }),
  styleController.update,
);
router.delete(
  "/",
  checkJwt({ secret: process.env.JWT_ADMIN_SECRET_KEY, algorithms: ["HS256"] }),
  styleController.destroy,
);

module.exports = router;

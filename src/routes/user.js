const express = require("express");
const container = require("../infrastructure/container");
const router = express.Router();

container.then(({ userController }) => {
    router.post("/signup", userController.create);
    router.post("/signin", userController.signIn);
});

module.exports = router;

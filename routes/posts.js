const express = require("express");

const router = express.Router();

const postsController = require("../controllers/post_controller");

router.get('/post',postsController.posts);

module.exports = router;
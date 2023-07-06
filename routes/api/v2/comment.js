const express = require('express');
const router = express.Router();
const coommentApi = require('../../../controllers/api/v2/comment_api');
router.get('/',coommentApi.comment);

module.exports = router;

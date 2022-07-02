const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

router.get("/:id", userController.findallusers);

module.exports = router;
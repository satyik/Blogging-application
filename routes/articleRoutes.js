const articleController = require('../controllers/articleController');
const { Router } = require('express');
const router = Router();
var article = require("../models/article");


//Setting up multer
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

//setting up cloudinary
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'spy09', 
  api_key: '152162741393785', 
  api_secret: 'QBXRNXzaMU_gVTyIw4fsKacMqp8' 
});


router.get('/new',function(req, res) {
  res.render('new');
});


router.post("/",upload.single('image'), function(req, res) {
    cloudinary.uploader.upload(req.file.path, function(result) {
      req.body.article.image = result.secure_url;
      req.body.article.author = {
        id: req.user._id,
        username: req.user.name
      }
      article.create(req.body.article, function(err, article) {
        if (err || !article) {
          return res.redirect('/');
        }
        res.redirect('/');
      });
    });
});

router.get("/:id", articleController.findarticle);

module.exports = router;



// router.get("/:id/edit", middleware.checkj_foodOwnership, function(req, res) {
//   //find j_food ID in DB
//   article.findById(req.params.id, function(err, foundarticle ) {
//       if (err || !foundarticle) {
//            req.flash("error","Something went wrong.");
//            res.redirect("/article");
//       } else {
//           //show to the edit page
//           res.render("article/edit",  { j_food: foundj_food }); 
//       }
  
//   });
// });
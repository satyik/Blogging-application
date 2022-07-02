var article = require("../models/article");

module.exports.findallarticle = async (req, res) => {
    article.find({}, function (err, article) {
      res.render("home", { article: article });
  });
  }
var article = require("../models/article");

module.exports.findarticle = async (req, res) => {
    article.findById(req.params.id).exec(function(err, foundarticle) {
        if (err || !foundarticle) {
            res.redirect("/");
        }
        else {
            res.render("article", { article: foundarticle });
        }
    });
  }
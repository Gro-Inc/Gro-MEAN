const express = require('express');
const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("layout", {title: "Gro"});
});

router.get("/partials/:name", function (req, res) {
    res.render("partials/" + req.params.name);
});

module.exports = router;
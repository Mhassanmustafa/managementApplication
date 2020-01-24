var express = require("express");
var router = express.Router();
var { temp } = require("../../models/temp");
const auth = require("../../middleware/auth");

router.post("/newTemp", auth, async (req, res) => {
  const tem = new temp(req.body);

  tem.save().then(res.send("record saved"));
});

router.get("/getAlltemp", async (req, res) => [
  await temp
    .find()
    .select("-_id -__v")
    .then(result => {
      res.send(result);
    })
]);

router.delete("/alltemp", auth, async (req, res) => {
  await temp.deleteMany().then(result => {
    res.send(result);
  });
});

router.delete("/temp/:name", auth, async (req, res) => {
  await temp
    .deleteOne({ name: req.params.name })
    .then(result => res.send(result));
});

module.exports = router;

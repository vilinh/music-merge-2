const express = require("express");
const router = express.Router();
const axios = require("axios");
router.use(express.json());


router.get("/search/:id", async (req, res) => {
  await axios
    .get(`https://api.deezer.com/playlist/${req.params.id}`)
    .then((response) => {
      res.send(response.data.tracks);
    });
});

module.exports = router;

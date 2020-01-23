const Dev = require("../models/Dev");
const parseStrAsArr = require("../utils/parseStringAsArr");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArr = parseStrAsArr(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArr
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 100000
        }
      }
    });

    return res.json(devs);
  }
};

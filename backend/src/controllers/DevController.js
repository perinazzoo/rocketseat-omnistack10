const axios = require("axios");
const Dev = require("../models/Dev");
const parseStrAsArr = require("../utils/parseStringAsArr");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) return res.status(400).json({ message: "Este dev já existe!" });

    const response = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    let { name, avatar_url, bio } = response.data;
    name === null ? (name = github_username) : "";

    const techsArr = parseStrAsArr(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    dev = await Dev.create({
      name,
      github_username,
      bio,
      avatar_url,
      techs: techsArr,
      location
    });

    const sendSocketMessageTo = findConnections(
      { latitude, longitude },
      techsArr
    );

    sendMessage(sendSocketMessageTo, "novodev", dev);

    return res.json(dev);
  }
};

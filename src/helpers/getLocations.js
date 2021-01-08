const _ = require("lodash");
const Locations = require("../models/Locations");

async function getLocations() {
  try {
    const data = await Locations.findAll();

    if (!_.isEmpty(data)) {
        return data.map(el => {
            return el.dataValues
        })
    } else {
      throw new Error("Empty");
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = getLocations;

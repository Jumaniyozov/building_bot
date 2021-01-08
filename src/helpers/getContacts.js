const _ = require("lodash");
const ContactData = require("../models/ContactData");

async function getContacts() {
  try {
    const data = await ContactData.findAll();

    if (!_.isEmpty(data)) {
      return data[0].dataValues;
    } else {
      throw new Error("Empty");
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = getContacts;

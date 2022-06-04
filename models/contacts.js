const { Schema, model } = require('mongoose');
const Joi = require('joi');

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
);

const Contact = model('contact', schema);



const schemaCreate = Joi.object({
  name: Joi.string().alphanum().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(2).required(),
  favorite: Joi.bool(),
});

const schemaPatch = Joi.object({ 
  favorite: Joi.bool().required(),
});

module.exports = {
  Contact,
  schemaCreate,
  schemaPatch
};




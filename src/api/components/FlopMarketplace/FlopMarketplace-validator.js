const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      role : joi.string().role().required().label('Role'),
      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .min(6)
        .max(32)
        .required()
        .label('Password'),
      password_confirm: joi.string().required().label('Password confirmation'),
    },
  },

  createProduct: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      price: joi.number().price().required().label('Price'),
      sellername : joi.string().role().required().label('Sellername'),
    },
  },

  createDeal: {
    body: {
      sellername: joi.string().min(1).max(100).required().label('Sellername'),
      customername: joi.string().min(1).max(100).required().label('Customername'),
      price: joi.number().price().required().label('Price'),
      date : joi.string().role().required().label('Date'),
    },
  },



  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  updatePrice: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      price: joi.number().price().required().label('Price'),
    },
  },

  changePassword: {
    body: {
      password_old: joi.string().required().label('Old password'),
      password_new: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .min(6)
        .max(32)
        .required()
        .label('New password'),
      password_confirm: joi.string().required().label('Password confirmation'),
    },
  },
};

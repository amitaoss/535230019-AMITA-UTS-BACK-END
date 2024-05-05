const { User, Product} = require('../../../models');


async function Floptropica(){
  return User.find({});
}

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers(first, PageSizeHaha, GoSearch, Sorttt) {
  const [field, substring] = (GoSearch || '').split(':'); // Menggunakan split(':') untuk memisahkan string GoSearch
  const [sortField, sortDirection] = (Sorttt || '').split(':'); // Menggunakan split(':') untuk memisahkan string Sorttt
  let ascdesc = 1;
  if (sortDirection === 'desc') {
    ascdesc = -1;
  }

  return User.find({ [field]: { $regex: `\\b${substring}\\b`, $options: 'i' } })
    .sort({ [sortField]: ascdesc })
    .skip(first)
    .limit(PageSizeHaha)
    .select('-password');
}

/**
 * Get a list of products
 * @returns {Promise}
 */
async function getProducts(first, PageSizeHaha, GoSearch, Sorttt) {
    const [field, substring] = (GoSearch || '').split(':'); // Menggunakan split(':') untuk memisahkan string GoSearch
    const [sortField, sortDirection] = (Sorttt || '').split(':'); // Menggunakan split(':') untuk memisahkan string Sorttt
    let ascdesc = 1;
    if (sortDirection === 'desc') {
      ascdesc = -1;
    }
  
    return Product.find({ [field]: { $regex: `\\b${substring}\\b`, $options: 'i' } })
      .sort({ [sortField]: ascdesc })
      .skip(first)
      .limit(PageSizeHaha)
      .select('-password');
  }

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Get product detail
 * @param {string} name
 * @param {number} price
 * @param {string} sellername
 * @returns {Promise}
 */
async function getProduct(name) {
    return Product.findByName(name);
  }

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} role - seller atau customer
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, role, password) {
  return User.create({
    name,
    email,
    role,
    password,
  });
}

/**
 * Create new product
 * @param {string} name - Name of product
 * @param {number} price - 
 * @returns {Promise}
 */
async function createProduct(name, price) {
    return Product.create({
      name,
      price,
    });
  }

  /**
 * Create new deal
 * @param {string} sellername 
 * @param {string} customername
 * @param {number} price
 * @param {string} date
 * @returns {Promise}
 */
async function createDeal(sellername, customername, price, date) {
    return Deal.create({
      sellername,
      customername,
      price,
      date,
    });
  }



/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Delete a user
 * @param {string} name --product name
 * @returns {Promise}
 */
async function deleteProduct(name) {
    return User.deleteOne({ _name: name });
  }
  

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

/**
 * Update harga produk
 * @param {string} name --product name
 * @param {string} price --new price
 * @returns {Promise}
 */
async function updatePrice(name, price) {
    return Product.updateOne({ _name: name }, { $set: { price } });
  }

module.exports = {
  getUsers,
  getUser,
  getProducts,
  createUser,
  createProduct,
  getProduct,
  createDeal,
  updateUser,
  updatePrice,
  deleteUser,
  getUserByEmail,
  deleteProduct,
  changePassword,
  Floptropica,
};

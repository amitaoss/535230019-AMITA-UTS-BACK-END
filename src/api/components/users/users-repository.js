const { User } = require('../../../models');


async function Floptok(){
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
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
  Floptok,
};

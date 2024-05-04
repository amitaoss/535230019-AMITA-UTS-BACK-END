const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get the number of failed login attempts for a user
 * @param {string} email - User email
 * @returns {number}
 */
async function getFailedLoginAttempts(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (!user) {
    return 0;
  }

  return user.failed_login_attempts || 0;
}

/**
 * Increment angka attempt gagal login untuk user 
 * @param {string} email - User email
 * @returns {void}
 */
async function incrementFailedLoginAttempts(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (!user) {
    return;
  }

  const failedLoginAttempts = user.failed_login_attempts || 0;
  await usersRepository.updateUser(user.id, user.name, user.email, failedLoginAttempts + 1);
}

/**
 * Reset angka attempt gagal login untuk user
 * @param {string} email - User email
 * @returns {void}
 */
async function resetFailedLoginAttempts(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (!user) {
    return;
  }

  await usersRepository.updateUser(user.id, user.name, user.email, 0);
}


/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers(GoSearch, Sorttt, PageNumberHaha, PageSizeHaha) {
  const PagResults = {};
  const Start = (PageNumberHaha - 1) * PageSizeHaha;
  const End = PageNumberHaha * PageSizeHaha;
  const OghOgh = await usersRepository.Floptok();
  const Gokgok = OghOgh.length;

  PagResults.page_number = {
    PageNumberHaha,
  };

  PagResults.page_size = {
    PageSizeHaha,
  };

  PagResults.OghOgh = {
    OghOgh,
  };

  if (Start == 0 || PageNumberHaha == 0) { //Cek apakah ada halaman sebelumnya
    PagResults.has_previous_page = {
      has_previous_page: false,
    };
  } 
  if (Start !==0 || PageNumber !== 0){
    PagResults.has_previous_page = {
      has_previous_page: true,
    };
  }
  

  if (End > OghOgh || PageNumberHaha == 0) { //Cek apakah ada halaman berikutnya
    PagResults.has_next_page = {
      has_next_page: false,
    };
  } 
  if (End < OghOgh || PageNumberHaha !== 0) {
    PagResults.has_next_page = {
      has_next_page: true,
    };
  }

  PagResults.data = await usersRepository.getUsers(
    Start,
    PageSizeHaha,
    GoSearch,
    Sorttt
  );
  return PagResults;
}



/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);
  return passwordMatched(password, user.password);
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
};

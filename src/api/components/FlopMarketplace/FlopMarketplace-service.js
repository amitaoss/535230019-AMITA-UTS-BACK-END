const flopMarketplaceRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');
const { getProducts } = require('./FlopMarketplace-repository');



/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await flopMarketplaceRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
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
  const user = await flopMarketplaceRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

/**
 * Get user detail
 * @param {string} name 
 *  @param {string} price
 * * @param {string} sellername
 * @returns {Object}
 */
async function getProduct(name, price, sellername) {
    const product = await flopMarketplaceRepository.getUser(name, price, sellername);
  
    // User not found
    if (!product) {
      return null;
    }
  
    return {
      name: product.name,
      price: product.price,
      sellername: product.sellername
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
 *  @param {string} role - seller atau customer
 * @returns {boolean}
 */
async function createUser(name, email, role, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await flopMarketplaceRepository.createUser(name, email, role, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Create new product
 * @param {string} name - Name
 * @param {number} price
 * @returns {boolean}
 */
async function createProduct(name, price) {

  
    try {
      await flopMarketplaceRepository.createProduct(name, price);
    } catch (err) {
      return null;
    }
  
    return true;
  }

  /**
 * Create new deal (transaction)
 * @param {string} sellername
 * @param {string} customername
 * @param {number} price
 *  @param {string} date
 * @returns {boolean}
 */
async function createDeal(sellername, customername, price, date) {
    
  
    try {
      await flopMarketplaceRepository.createDeal(sellername,customername, price, date);
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
 *  @param {string} role
 * @returns {boolean}
 */
async function updateUser(id, name, role, email) {
  const user = await flopMarketplaceRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, role, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update price
 * @param {string} name
 * @param {string} price
 * @returns {boolean}
 */
async function updatePrice(name, price) {
    const product = await flopMarketplaceRepository.getProduct(name);
  
    // Product not found
    if (!Product) {
      return null;
    }
  
    try {
      await flopMarketplaceRepository.updatePrice(name,price);
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
  const user = await flopMarketplaceRepository.getUser(id);

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

async function deleteProduct(name) {
    const user = await flopMarketplaceRepository.getProduct(name);
  
    // User not found
    if (!Product) {
      return null;
    }
  
    try {
      await flopMarketplaceRepository.deleteProduct(name);
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
  createProduct,
  getProducts,
  getProduct,
  createDeal,
  updateUser,
  updatePrice,
  deleteUser,
  deleteProduct,
  emailIsRegistered,
  checkPassword,
  changePassword,
};

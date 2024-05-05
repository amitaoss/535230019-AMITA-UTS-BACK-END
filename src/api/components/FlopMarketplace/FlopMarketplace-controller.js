const flopMarketplaceService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');



/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUsers(request, response, next) {
  
  try {
    const GoSearch = request.query.search; // search engine dengan search key string
    const Sorttt = request.query.sort || 'email'; //sorting dengan email
    const PageNumberHaha = (parseInt(request.query.page_number)) || 1; //page number harus bertipe integer dan bil positif, maka menggunakan parseInt dan default value nya adalah 1
    const PageSizeHaha = (parseInt(request.query.page_size)) || Infinity; // page size harus bertipe integer dan bil positif, maka menggunakan parseInt. Default value nya adalah infinity karena kita tidak mengetahui berapa banyak jumlah user
    
    const users = await flopMarketplaceService.getUsers(
      GoSearch,
      Sorttt,
      PageNumberHaha,
      PageSizeHaha
      
    );
    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getProducts(request, response, next) {
  
    try {
      const GoSearch = request.query.search; // search engine dengan search key string
      const Sorttt = request.query.sort || 'name'; //sorting dengan nama
      const PageNumberHaha = (parseInt(request.query.page_number)) || 1; //page number harus bertipe integer dan bil positif, maka menggunakan parseInt dan default value nya adalah 1
      const PageSizeHaha = (parseInt(request.query.page_size)) || Infinity; // page size harus bertipe integer dan bil positif, maka menggunakan parseInt. Default value nya adalah infinity karena kita tidak mengetahui berapa banyak jumlah user
      
      const users = await flopMarketplaceService.getProducts(
        GoSearch,
        Sorttt,
        PageNumberHaha,
        PageSizeHaha
        
      );
      return response.status(200).json(products);
    } catch (error) {
      return next(error);
    }
  }

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUser(request, response, next) {
  try {
    const user = await flopMarketplaceService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown user');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getProduct(request, response, next) {
    try {
      const product = await flopMarketplaceService.getProduct(request.params.name);
  
      if (!product) {
        throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown product');
      }
  
      return response.status(200).json(product);
    } catch (error) {
      return next(error);
    }
  }
/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createUser(request, response, next) {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const role = request.body.role;
    const password = request.body.password;
    const password_confirm = request.body.password_confirm;

    // Check confirmation password
    if (password !== password_confirm) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Password confirmation mismatched'
      );
    }

    // Email must be unique
    const emailIsRegistered = await flopMarketplaceService.emailIsRegistered(email);
    if (emailIsRegistered) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email is already registered'
      );
    }

    const success = await flopMarketplaceService.createUser(name, email, role, password);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(200).json({ name, email });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createProduct(request, response, next) {
    try {
      const name = request.body.name;
      const price = request.body.price;
      
  
      const success = await flopMarketplaceService.createProduct(name, price);
      if (!success) {
        throw errorResponder(
          errorTypes.UNPROCESSABLE_ENTITY,
          'Failed to create product'
        );
      }
  
      return response.status(200).json({ name, price});
    } catch (error) {
      return next(error);
    }
  }

  /**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createDeal(request, response, next) {
    try {
      const sellername = request.body.sellername;
      const customername = request.body.customername;
      const price = request.body.price;
      const date = request.body.date;
      
  
      const success = await flopMarketplaceService.createDeal(sellername, customername, price, date);
      if (!success) {
        throw errorResponder(
          errorTypes.UNPROCESSABLE_ENTITY,
          'Failed to create deal'
        );
      }
  
      return response.status(200).json({ sellername, customername });
    } catch (error) {
      return next(error);
    }
  }

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateUser(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const email = request.body.email;

    // Email must be unique
    const emailIsRegistered = await usersService.emailIsRegistered(email);
    if (emailIsRegistered) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email is already registered'
      );
    }

    const success = await usersService.updateUser(id, name, email);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updatePrice(request, response, next) {
    try {
      
      const name = request.body.name;
      const price = request.body.price;
  
      
  
      const success = await flopMarketplaceService.updatePrice(name, price);
      if (!success) {
        throw errorResponder(
          errorTypes.UNPROCESSABLE_ENTITY,
          'Failed to update price'
        );
      }
  
      return response.status(200).json({ name });
    } catch (error) {
      return next(error);
    }
  }
  
/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteUser(request, response, next) {
  try {
    const id = request.params.id;

    const success = await usersService.deleteUser(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteProduct(request, response, next) {
    try {
      const name = request.params.name;
  
      const success = await flopMarketplaceService.deleteProduct(name);
      if (!success) {
        throw errorResponder(
          errorTypes.UNPROCESSABLE_ENTITY,
          'Failed to delete product'
        );
      }
  
      return response.status(200).json({ name });
    } catch (error) {
      return next(error);
    }
  }

/**
 * Handle change user password request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function changePassword(request, response, next) {
  try {
    // Check password confirmation
    if (request.body.password_new !== request.body.password_confirm) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Password confirmation mismatched'
      );
    }

    // Check old password
    if (
      !(await usersService.checkPassword(
        request.params.id,
        request.body.password_old
      ))
    ) {
      throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Wrong password');
    }

    const changeSuccess = await usersService.changePassword(
      request.params.id,
      request.body.password_new
    );

    if (!changeSuccess) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to change password'
      );
    }

    return response.status(200).json({ id: request.params.id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  createProduct,
  createDeal,
  updateUser,
  updatePrice,
  deleteUser,
  deleteProduct,
  changePassword,
  getProduct,
  getProducts,
};

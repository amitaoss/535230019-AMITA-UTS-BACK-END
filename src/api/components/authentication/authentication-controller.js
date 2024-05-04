const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');
const failedLoginAttempts = {}; //untuk melihat berapa kali percobaan login yg gagal


/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    if (failedLoginAttempts[email] >= 5) {
      throw errorResponder(
        errorTypes.FORBIDDEN_ERROR,
        'Too many failed login attempts. Please try again later.'
      );
    }

    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      
      failedLoginAttempts[email] = (failedLoginAttempts[email] || 0) + 1;

      // error 403 Forbidden jika fail login lebih dari 5 kali
      if (failedLoginAttempts[email] >= 5) {
        throw errorResponder(
          errorTypes.FORBIDDEN_ERROR,
          'Too many failed login attempts. Please try again later.'
        );
      }
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    
    delete failedLoginAttempts[email];

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

// limit percobaan login dihapus setelah jangka waktu tertentu
setInterval(() => {
  for (const email in failedLoginAttempts) {
    if (failedLoginAttempts.hasOwnProperty(email)) {
      delete failedLoginAttempts[email];
    }
  }
}, 30 * 60 * 1000); // 30 menit

module.exports = {
  login,
};

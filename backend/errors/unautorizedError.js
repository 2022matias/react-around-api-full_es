const unautorizedError = (message) => {
  const error = new Error(message);
  error.statusCode = 401;
  return error;
};

module.exports = unautorizedError;

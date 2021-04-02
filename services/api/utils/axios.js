const axios = require("axios");

/**
 * Utility to make axios requests
 *
 * @param {String} method The HTTP method
 * @param {String} url The url for the request
 * @param {Boolean} withCredentials If the request should use credentials
 * @param {Object} body The body object, if exists
 */
exports.axiosRequest = async (method, url, contentType, responseType, withCredentials, body) => {
  let responseObject;

  await axios({
    method: method,
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": contentType,
    },
    data: body ? JSON.stringify(body) : null,
    withCredentials: withCredentials,
    responseType: responseType ? responseType : null,
  })
    .then((responseData) => {
      // If the request is successfull
      responseObject = responseData;
    })
    .catch((error) => {
      // If error
      responseObject = error.response;
    });

  return responseObject;
};

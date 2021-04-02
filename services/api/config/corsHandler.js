const allowedList = [
  undefined,
  "http://localhost:3000",
  "http://localhost:3000/*",
  "http://localhost",
  "http://localhost/*",
];

module.exports = () => {
  return {
    origin: function (origin, callback) {
      if (allowedList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
};

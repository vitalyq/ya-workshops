module.exports = category => ({
  log: (status, message) => {
    console.log(`${status} [${category}] - ${message}`);
  },
});

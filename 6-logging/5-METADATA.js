const pad = val => String(val).padStart(2, '0');
const getDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-` +
    `${pad(now.getMonth() + 1)}-` +
    `${now.getDate()} ` +
    `${pad(now.getHours())}:` +
    `${pad(now.getMinutes())}:` +
    `${now.getSeconds()}.` +
    `${now.getMilliseconds()}`;
};

module.exports = category => ({
  log: (status, message, data) => {
    console.log(`[${getDate()}] ${status} [${category}] - ${message} ${JSON.stringify(data)}`);
  },
});

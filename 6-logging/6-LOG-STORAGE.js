const fs = require('fs');

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

const outStream = fs.createWriteStream('app.log');

module.exports = category => ({
  log: (status, message, data) => {
    const entry = `[${getDate()}] ${status} [${category}] - ${message} ${JSON.stringify(data)}`;
    process.stdout.write(entry);
    outStream.write(entry);
  },
});

const pad = val => String(val).padStart(2, '0');
const getDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-` +
    `${pad(now.getMonth() + 1)}-` +
    `${pad(now.getDate())} ` +
    `${pad(now.getHours())}:` +
    `${pad(now.getMinutes())}:` +
    `${now.getSeconds()}.` +
    `${now.getMilliseconds()}`;
};

module.exports = category => ({
  log: (level, message, data) => {
    const output = JSON.stringify({
      datetime: getDate(),
      level,
      category,
      data: [
        message,
        JSON.stringify(data),
      ],
    });

    console.log(output);
  },
});

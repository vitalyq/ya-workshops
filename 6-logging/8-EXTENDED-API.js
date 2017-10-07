const levels = ['debug', 'info', 'warn', 'error'];

const getDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-` +
    `${now.getMonth() + 1}-` +
    `${now.getDate()} ` +
    `${now.getHours()}:` +
    `${now.getMinutes()}:` +
    `${now.getSeconds()}.` +
    `${now.getMilliseconds()}`;
};

const formatData = (data) => {
  if (data) {
    return `\n\t${JSON.stringify(data)}`;
  }
  return '';
};

module.exports = (category) => {
  const logger = {
    log: (level, message, data) => {
      const entry = `[${getDate()}] [${level}] ${category} - ${message}${formatData(data)}`;
      console.log(entry);
    },
  };

  const handler = {
    get: (target, property) => {
      if (property === 'all') {
        return target[property];
      } else if (levels.includes(property)) {
        return target.log.bind(target, property);
      }
      throw Error(`Logging level ${property} is not supported.`);
    },
  };

  return new Proxy(logger, handler);
};

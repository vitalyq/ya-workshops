const fs = require('fs');
const request = require('request');
const co = require('co');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const FILE = 'config.json';

const requestStatusPromise = url =>
  new Promise((resolve) => {
    request(url, (err, res) => {
      resolve(res.statusCode);
    });
  });

co(function* readJSON() {
  try {
    const data = yield readFile(FILE);
    const conf = JSON.parse(data);
    const resp = yield requestStatusPromise(conf.url);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
});

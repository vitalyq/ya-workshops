const fs = require('fs');
const request = require('request');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const FILE = 'config.json';

const requestStatusPromise = url =>
  new Promise((resolve) => {
    request(url, (err, res) => {
      resolve(res.statusCode);
    });
  });

const read = async () => {
  try {
    const data = await readFile(FILE);
    const conf = JSON.parse(data);
    const resp = await requestStatusPromise(conf.url);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};

read();

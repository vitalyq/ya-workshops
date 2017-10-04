/* eslint no-eval: "off", no-unused-vars: "off", consistent-return: "off" */
// Hashy template engine
// All the code should come in angle brackets: <# #>
// The data is available on the data object: <# if (data.user) { #> Hello! <# } #>
// Data could be printed: <#= data.name #>
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const render = (content, data) => {
  const processed = `#>${content}<#`
    .replace(/<#=([^]*?)#>/g, (match, p1) => `<# _output += ${String(p1)}; #>`)
    .replace(/#>([^]*?)<#/g, (match, p1) => `_output += \`${p1}\`;`);

  return eval(`let _output = ''; ${processed}; _output;`);
};

module.exports = async function templateEngineHandler(filePath, options, callback) {
  try {
    const content = await readFile(filePath);
    const rendered = render(content, options);
    if (callback) {
      callback(null, rendered);
    } else {
      return rendered;
    }
  } catch (error) {
    if (callback) {
      callback(error);
    } else {
      throw error;
    }
  }
};

/* eslint-disable func-names, require-yield */
const expect = require('expect');

const co = generator =>
  new Promise((resolve, reject) => {
    const iterator = generator();
    let iterate;

    const createHandler = method => (value) => {
      try {
        const result = iterator[method](value);
        iterate(result);
      } catch (error) {
        reject(error);
      }
    };
    const nextHandler = createHandler('next');
    const throwHandler = createHandler('throw');

    iterate = ({ done, value }) => {
      if (done) {
        return resolve(value);
      }
      return Promise.resolve(value).then(
        nextHandler,
        throwHandler,
      );
    };

    iterate({});
  });

const testCo = () => {
  // Yielding promises should work
  co(function* () {
    yield Promise.resolve();
  });

  // Yielding values should work
  co(function* () {
    yield 1;
  });

  // Should return promise
  expect(co(function* () {
    yield 1;
  })).toBeA(Promise, 'Should return promise');

  // Should wait for all yielded promises
  const completeSpy = expect.createSpy();
  co(function* () {
    const value1 = yield Promise.resolve(1);
    const value2 = yield Promise.resolve(2);
    const value3 = yield Promise.resolve(3);
    completeSpy(value1, value2, value3);
  }).then(() => {
    expect(completeSpy).toHaveBeenCalledWith(1, 2, 3);
  });

  // Returned promise should be resolved
  const resolveSpy = expect.createSpy();
  co(function* () {
    return yield 1;
  }).then(resolveSpy)
    .then(() => {
      expect(resolveSpy).toHaveBeenCalledWith(1);
    });

  // Should reject on exception in generator
  const myError = { name: 'oops' };
  const rejectSpy = expect.createSpy();
  co(function* () {
    throw myError;
  }).catch(rejectSpy)
    .then(() => {
      expect(rejectSpy).toHaveBeenCalledWith(myError);
    });

  // Should throw inside generator on rejected promise
  const exceptionSpy = expect.createSpy();
  co(function* () {
    try {
      yield Promise.reject();
    } catch (err) {
      exceptionSpy();
    }
  }).then(() => {
    expect(exceptionSpy).toHaveBeenCalled('Should throw inside generator on rejected promise');
  });
};

testCo();
console.log('All tests passed.');

module.exports = co;

// My simplified implementation of co
const co = generator =>
  new Promise((resolve) => {
    const iter = generator();
    const iterate = (status) => {
      if (status.done) {
        resolve(status.value);
      } else {
        status.value.then((res) => {
          iterate(iter.next(res));
        }).catch((err) => {
          iterate(iter.throw(err));
        });
      }
    };

    iterate(iter.next());
  });

module.exports = co;

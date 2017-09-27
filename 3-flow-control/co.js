const co = generator =>
  new Promise((resolve) => {
    const iter = generator();
    const iterate = (status) => {
      if (status.done) {
        resolve(status.value);
      } else {
        status.value.then((res) => {
          iterate(iter.next(res));
        });
      }
    };

    iterate(iter.next());
  });

module.exports = co;

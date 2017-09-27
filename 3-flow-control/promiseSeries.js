const arr = [1, 2, 3];

const displayValue = value =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(value);
      resolve();
    }, 1000);
  });

arr.reduce(
  (acc, item) => acc.then(() => displayValue(item)),
  Promise.resolve(),
);

const user = require('../data/user');
const products = require('../data/products');

const IDENT_SALE = 10;

function getShowcase(user, products) {
  return products.map((product) => {
    const showcaseItem = {
      name: product.name,
    };

    let discount = 0;
    if (product.sale) {
      discount = product.sale;
    } else if (user.status === 'ident') {
      discount = IDENT_SALE;
    }
    showcaseItem.price = (product.price * (100 - discount)) / 100;

    return showcaseItem;
  });
}

function getBonuses(user, showcase) {
  if (user.status !== 'newbie') {
    return [];
  }

  const random = Math.floor(Math.random() * showcase.length);
  const randomProduct = showcase[random];

  return [randomProduct];
}

module.exports = (() => {
  const showcase = getShowcase(user, products);
  const bonuses = getBonuses(user, showcase);
  const pageData = {
    showcase,
    bonuses,
    authorized: user.status !== 'anonym',
  };
  return pageData;
})();

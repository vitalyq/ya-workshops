const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const hashy = require('./hashy');
const showcase = require('./views/showcase');

const app = new Koa();

// Set up template engine
app.use(views(path.join(__dirname, 'views'), {
  extension: 'hash',
  engineSource: {
    hash: hashy,
  },
}));

app.use(async (ctx) => {
  await ctx.render('showcase', showcase);
});

app.listen(3000, () => {
  console.log('Ready on http://localhost:3000');
});

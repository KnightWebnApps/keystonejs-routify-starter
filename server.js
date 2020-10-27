const express = require('express');
const { ssr } = require('@sveltech/ssr');
const { keystone, apps } = require('./index.js');

const ENTRYPOINT = 'app/dist/__app.html'
const APP = 'app/dist/build/bundle.js'
const PORT = 3000


keystone
  .prepare({
    apps: apps,
    dev: true//process.env.NODE_ENV !== 'production',
  })
  .then(async ({ middlewares }) => {
    await keystone.connect();
    const app = express();

    app.use(express.static('app/dist'))
    app.use(middlewares)

    app.get('*', async (req, res) => {
      const html = await ssr(ENTRYPOINT, APP, req.url)
      res.send(html)
    })

    app.listen(PORT);
    console.log(`Running on Port: ${PORT}`)
  });
  
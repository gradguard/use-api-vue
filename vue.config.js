const getPosts = require('./src/server_js/posts');

module.exports = {
  devServer: {
    before(app) {
      app.get('/api/posts', (req, res) => {
        setTimeout(() => {
          const result = getPosts();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        }, 5000);
      });
      app.get('/api/error', (req, res) => {
        setTimeout(() => {
          const result = {
            message: 'This is an expected error',
          };
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        }, 1000);
      });
    },
  },
};

const express = require('express');
const mime = require('mime-types');
const fs = require('fs');

const app = express();
const port = process.env.MOCK_SERVER_PORT || 7001;

function isDir(path) {
  try {
    const stat = fs.lstatSync(path);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
}
app.all('*', (req, res) => {
  const path = `${__dirname}/mockdata${req.path}`;
  try {
    if (fs.existsSync(path)) {
      let filepath = path;
      if (isDir(path)) {
        filepath = `${path}/index.json`;
      }
      const mimetype = mime.lookup(filepath);
      const contents = fs.readFileSync(filepath, 'utf8');
      return res.setHeader('content-type', mimetype).send(contents);
    }
  } catch (error) {
    return res.status(500).send({ error: error.toString() });
  }

  return res.status(404).send('not found');
});

app.listen(port, () => {
  console.info(`Mock Server is listening on ${port}`);
});

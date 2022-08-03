const express = require("express");
const app = express();
const port = process.env.MOCK_SERVER_PORT || 7001;

app.get("*", (req, res) => {
  res.send({
      path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

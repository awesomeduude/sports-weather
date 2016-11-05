"use strict";
"use strict";
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _keys = require('./keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

var schema = new _mongoose2.default.Schema({ name: 'string', size: 'string' });
var Tank = _mongoose2.default.model('Tank', schema);

app.post('/tanks', function (req, res) {
  Tank.create({
    name: req.body.name,
    size: req.body.size
  }, function (err, small) {
    if (err) {
      res.send({ 'success': false });
    } else {
      res.send({ 'success': true });
    }
  });
});

app.get('/', function (req, res) {
  res.send('Hello, World!');
});

_mongoose2.default.connect(process.env.MONGODB_URI || _keys.database);

app.listen(process.env.PORT || 3000, function () {
  console.log('***************Listening on port 3000***************');
});

var express = require('express');
var router = express.Router();
var mongoDB = require('./../libs/database');

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('admin/index', { title: 'admin index files here' });
});

router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: 'Login' });
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('admin/register', { title: 'Registration' });
});

router.post('/register', function(req, res) {
  var reqData = req.body;
  mongoDB.connect(function (err, db) {
     if (err) {
      db.close();
      return res.status(500).json({
        message: "something went worng. db connection is not established"
      });
     }

     mongoDB.insert(db, 'users', reqData, function (insetErr, success) {
       if (insetErr) {
          db.close();
          return res.status(500).json({
            message: "Data insert error"
          });
       }
       db.close();
       return res.status(200).json(success);
     });   
  });
});




module.exports = router;
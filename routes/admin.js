var express = require('express');
var router = express.Router();
var mongoDB = require('./../libs/database');

router.get('/users', function(req, res) {
  //todo list users
});

router.get('/logout', function(req, res) {
  req.session.isAuthenticated = false;
  delete req.session.fname;
  res.status(200).json({
    message: 'You are successfully logged out'
  })
});
/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('admin/index', { title: 'admin index files here' });
});

//renders login page
router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: 'Login' });

});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('admin/register', { title: 'Registration' });
});

//process user login
router.post('/login', function(req, res) {
  var email = req.body.email;
  var pass = req.body.password;
  console.log(req.body);
  mongoDB.connect(function (err, db) {

     if (err) {
      db.close();
      return res.status(500).json({
        message: "something went worng. db connection is not established"
      });
     }

     mongoDB.find(db, 'users', {
      "email": email, 
      "password": pass
    }, function (err, users) {
      if (err) {
        return res.status(500).json({ 
          message: "Something went wrong. " +
           "We are working on it. please stay with us"
        });
      }

      if (users) {
        // var currentUser = users[0];
        // req.session.isAuthenticated = true;
        // req.session.fname = currentUser.fname;

      for (var i = 0; i < users.length; i++) {
  
      if  (email==users[i].email && pass==users[i].password) {
           return res.redirect('/admin/users')
           return res.status(200).json({
        message: "Login successfull"
      });
                     }
          }
       

      }

      return res.status(401).json({
        message: "Wrong email/password. Please try again"
      });
 
      db.close();
       
     });
   });
});

//process user registration
router.post('/register', function(req, res) {
  var reqData = req.body;
  // return res.status(200).json({
  //           message: reqData
  //         });

  mongoDB.connect(function (err, db) {
     if (err) {
      db.close();
      return res.status(500).json({
        message: "something went worng. db connection is not established"
      });
     }

     mongoDB.insert(db, 'users',reqData, function (insetErr, success) {
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

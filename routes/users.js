var express = require('express');
var router = express.Router();
var mongoDB = require('./../libs/database');

/* GET users listing. */
router.get('/usersInfo', function(req, res, next) {
  res.render('users/usersInfo');

});

router.delete('/usersInfo', function(req, res) {
    var reqData = req.body;
    console.log(reqData.email)

  mongoDB.connect(function (err, db) {
           if (err) {
            db.close();
            return res.status(500).json({
              message: "something went worng. db connection is not established"
            });
           }

           mongoDB.delete(db, 'users',{
            "email":reqData.email
            }, function (deleteErr, success) {
              
             if (deleteErr) {
                db.close();
                return res.status(500).json({
                  message: "Data delete error"
                });
             }
                 
              if(success)
             {
              return res.status(200).json({ message: "Data deleted successfully"});
              db.close();
             } 
             
            
             
           });   
        });
});

router.put('/usersInfo', function(req, res) {
     var reqData = req.body;
    //    return res.status(200).json({
    //       message:reqData
    //     });


  mongoDB.connect(function (err, db) {
           if (err) {
            db.close();
            return res.status(500).json({
              message: "something went worng. db connection is not established"
            });
           }

           mongoDB.update(db, 'users', {"email":reqData.email}, {$set:{"fname":reqData.fname,"address":reqData.address,"email":reqData.email,"password":reqData.password}}, function (updateErr,success) {
             if (updateErr) {
                db.close();
                return res.status(500).json({
                  message: "Data update error"
                });
             }
            
             if(success)
             {
              return res.status(200).json(success);
               db.close();
             }
             
           });   
        });
});




module.exports = router;


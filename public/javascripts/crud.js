
//var mongoDB = require('./../../libs/database');
$(document).ready(function() {
$("#update").click(function(){
        alert("Email: " + $("#email").val()+"\n"+"Name:"+ $("#fname").val());
    });
  });

     $("#delete").click(function(){
    
        alert("Email: " + $("#email").val());

            mongoDB.connect(function (err, db) {
               if (err) {
                db.close();
                return res.status(500).json({
                  message: "something went worng. db connection is not established"
                });
               }

               var email = $("#email").val();

               mongoDB.delete(db, 'users', {name : email }, function (deleteErr, success) {
                 if (deleteErr) {
                    db.close();
                    return res.status(500).json({
                      message: "Data delete error"
                    });
                 }
                 db.close();
                 return res.status(200).json(success);
               });   
            });
    });
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/blog';

var connect = function connect(cb) {
  MongoClient.connect(url, cb);
}

var insertDocument = function(db, collection, data, callback) {
   db.collection(collection).insertOne(data, callback);
};

var findDocuments = function(db, collection, condition, callback) {

    var collection = db.collection(collection);
    // Find some documents
    collection.find(condition).toArray(callback);
};

var updateDocument = function(db, collection, condition, data, callback) {
  // Get the documents collection
  var collection = db.collection(collection);
  collection.updateOne(condition, data, callback);
}

var deleteDocument = function(db, collection, condition, callback) {
  var collection = db.collection('documents');
  collection.deleteOne(condition, callback);
}

module.exports = {
  connect: connect,
  insert: insertDocument,
  find: findDocuments,
  update: updateDocument,
  delete: deleteDocument
}
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Content = mongoose.model('Content');

router.get('/content', function(req, res, next) {
  Content.find(function(err, data){
    if(err){ return next(err); }
    res.json(data);
  });
});

router.post('/content', function(req, res, next){
  var content = new Content(req.body);
  content.save(function(err, content){
    if(err){ return next(err); }
    res.json(content);
  });
});

router.delete('/content/:elementId', function(req, res) { //THIS IS TO GET ONE AT THE TIME
  // console.log("GOT THE CONTENT AND HERE IT IS:");
  // console.log(req.content);
  req.content.remove();
  res.json(req.comment);
});

router.param('elementId', function(req, res, next, id) { //THIS IS TO GET ONE AT THE TIME
  var query = Content.findById(id);
  query.exec(function (err, content){
    if (err) { return next(err); }
    if (!content) { return next(new Error("can't find content")); }
    console.log("here is the content: ", content);
    req.content = content;
    return next(); //goes back to line 32
  });
});

module.exports = router;

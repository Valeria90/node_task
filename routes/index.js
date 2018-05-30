var express = require('express');
var router = express.Router();
var tea = require('../tea')
var app = require('../app');

/* GET users listing. */

router.get('/', (req, res, next) => {
  res.send(tea);
})

router.post('/', (req, res, next) => {
  let data = req.body;
  
  if(data.name == '' || data.taste == '') {
    let err = new Error("Empty");
    err.status = 400;
    next(err);
  } 
  data.id = new Date().getTime();
  tea.push(data);
  res.send(tea);
});

router.delete('/:id', (req, res, next) => {
  let delId = req.params.id;
  if(delId.length != 13) {
    let err = new Error("Id not found");
    err.status = 404;
    next(err);
  }
  newTea = tea.filter((elem) => {
    if(elem.id != delId) {
      return elem;
    }
  })
  if(tea.length == newTea.length) {
    let err = new Error("Something wrong");
    err.status = 404;
    next(err);
  }
  res.send(newTea);
});

router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  let reqBody = req.body;
  reqBody.id = id;
  if(reqBody.name == '' || reqBody.taste == '' || id.length != 13) {
    let err = new Error("Empty");
    err.status = 400;
    next(err);
  }
  let index = tea.indexOf(tea.find((elem) => elem.id == id));
  tea[index] = reqBody;
  res.send(tea);
})

module.exports = router;

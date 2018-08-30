var router = require('express').Router();
var TYPES = require('tedious').TYPES;

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); 
var textParser = bodyParser.text(); 


/* GET task listing. */
router.get('/', function (req, res) {
    req.sql("select Top(100) * from Shows for json path")
        .into(res, '[]');
});

/* GET single task. */
router.get('/:id', function (req, res) {
    console.log(req.params.id);
    req.sql("select * from Shows where id = @id for json path")
        .param('id', req.params.id, TYPES.Int)
        .into(res, '[]');
    console.log(res);    
});

/* GET like name task. */
router.get('/like/:name', function (req, res) {
    console.log('%'+req.params.name+'%');
    req.sql("select * from Shows where sName like @name for json path")
        .param('name', ('%'+req.params.name+'%'), TYPES.NVarChar)
        .into(res, '[]');
});

/* POST create task. */
router.post('/', jsonParser, function (req, res) {
    req.sql("exec createTodo @todo")
        .param('todo', JSON.stringify(req.body), TYPES.NVarChar)
        .exec(res);

});

/* PUT update task. */
router.put('/:id', jsonParser, function (req, res) {
    req.sql("exec updateTodo @id, @todo")
        .param('id', req.params.id, TYPES.Int)
        .param('todo', JSON.stringify(req.body), TYPES.NVarChar)
        .exec(res);
    
});

/* DELETE single task. */
router.delete('/:id', function (req, res) {
    console.log('Delete Request');
    
    req.sql("delete from todo where id = @id")
        .param('id', req.params.id, TYPES.Int)
        .exec(res);

});

module.exports = router;
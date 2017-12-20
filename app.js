
var express    = require('express'),
    mysql      = require('mysql'),
    bodyParser=require('body-parser');


var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'f3b250' //change_password_according_your system
    });
    
var app = express();
app.set('view engine','ejs');
app.use("/styles",express.static(__dirname + "/styles"));
connection.query('CREATE DATABASE IF NOT EXISTS test1', function (err) {
    if (err) throw err;
    connection.query('USE test1', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'note VARCHAR(300)'
            +  ')', function (err) {
                if (err) throw err;
            });
    });
});


app.use(bodyParser());
app.post('/users', function (req, res) {
    connection.query('INSERT INTO users SET ?', req.body, 
        function (err, result) {
            if (err) throw err;
        }
    );
});

app.get('/', function (req, res) {
    connection.query('SELECT * FROM users', 
        function (err, rows,fields) {
            if (err) throw err;
        res.render('index',{page_title:"Test Table",data:rows});
                    
        }
    );
});

app.get('/:id', function (req, res) {
      var id = req.params.id;
    connection.query('DELETE FROM users WHERE id=?',[id], 
        function (err, result) {
            if (err) throw err;
        res.redirect('/');
                    
        }
    );
});


app.listen(3000);

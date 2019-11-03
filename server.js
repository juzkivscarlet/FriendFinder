var express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);

app.use(express.static(__dirname+"/public"));

app.get('/questions', function(req,res) {
    res.sendFile(path.join(__dirname, 'public/questions.js'));
});

app.listen(PORT, function() {
    console.log("App listening on port: "+PORT);
});
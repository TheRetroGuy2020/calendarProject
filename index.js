var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

var time, today = 0;

function Get_date(){
    var todaydate = new Date().toDateString
    return todaydate
}

function GetTime(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10){
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes;
    var nd = "temp"
    if(hours > 11){
        nd = "PM";
    } else {
       nd = "AM";
    }
    console.log(t_str)
    return [t_str,nd]
}

app.engine('handlebars', exphbs({defaultLayout:null}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.get('/', function(req, res, next) {
    setTimeout(GetTime, 1000)
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', function(req, res, next) {
    // setTimeout(GetTime, 1000)
    res.status(200).sendFile(path.join(__dirname, 'public', '404.html'));
});

// app.get('/', function(req,res,next){
//     time = GetTime()
//     today = Get_date()
//     res.status(200).render('mainpage', {
//         TIME : time[0],
//         AMPM : time[1],
//         DATE : today
//     })
// })

// app.get('*', function (req, res) {
//     res.status(404).render('mainpage', {
//       errorBool : true
//     })
//   });


app.listen(port, function () {
    console.log("== Server is listening on port", port);
  });
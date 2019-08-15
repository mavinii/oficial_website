const express       = require('express'); 
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const passport      = require('passport');
const LocalStrategy = require('passport-local');
const Sunday        = require('./models/sunday');
const Flowers       = require('./models/flowers');
const User          = require('./models/user');

var port = 3000 //port server

//======================
// CONNECTION TO DATA BASE
//======================
mongoose.connect('mongodb+srv://pgmarcosoliveira:KGZ5vhRVN!ZAiW!@cluster0-jqh2a.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERROR:', err.message);
});

const app = express();
app.use(express.static("public"));      //para o express enchergar meu CSS da pgn public
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");          //no .ejs needed

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Marcos Oliveira",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// This function check if has user login and add name of user in the all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//APP.JS MAIN PAGE NOT INDEX.ejs
app.get('/', function(req, res){
    res.render("index");
});

app.get('/aboutUs', function(req, res){
    res.render("aboutUs");
});

app.get('/homeGroup', function(req, res){
    res.render("homeGroup");
});

app.get('/youthChildren', function(req, res){
    res.render("youthChildren");
});

app.get('/youngAdults', function(req, res){
    res.render("youngAdults");
});

app.get('/internationalStudents', function(req, res){
    res.render("internationalStudents");
});

app.get('/communityCare', function(req, res){
    res.render("communityCare");
});

app.get('/events', function(req, res){
    res.render("events");
});

// UPDATE PAINEL
app.get('/painel', isLoggedIn, function(req, res){
    res.render("painel");
});

//ROTAS - SUNDAYS
app.get('/rota', function(req, res){
    //Get all SUNDAY from DB 
    Sunday.find({}, function(err, allSunday){
        if(err){
            console.log(err);
        } else {
            res.render("rota", {rotas:allSunday});
        }
    })
});
// get all infomation of input SUNDAY and add to MongoDB
app.post('/rota', function(req, res){
    var dateRoutes = req.body.date;
    var nameRoutes  = req.body.name;
    var telRoutes = req.body.tel;
    var emailRoutes = req.body.email;
    var newSunday = {date: dateRoutes, name: nameRoutes, tel: telRoutes, email: emailRoutes}
    //Create a new SUNDAY and save to DB
    Sunday.create(newSunday, function(err, newlySundayCreated){
        if(err){
            console.log(err)
        } else {
        }
    });
});

//ROTAS - FLOWERS
app.get('/flower', function(req, res){
    //Get all FLOWERS from DB 
    Flowers.find({}, function(err, allFlowers){
        if(err){
            console.log(err);
        } else {
            res.render("rota", {flowers:allFlowers});
        }
    })
});
// get all infomation of input FLOWERS and add to MongoDB
app.post('/flower', function(req, res){
    var dateFlowers = req.body.date;
    var nameFlowers = req.body.name;
    var newFlowers = {date: dateFlowers, name: nameFlowers}
    //Create a new FLOWERS and save to DB
    Flowers.create(newFlowers, function(err, newlyFlowersCreated){
        if (err){
            console.log(err)
        } else {
        }
    });
});

app.get('/sermons', function(req, res){
    res.render("sermons");
});

app.get('/caterpillarKidz', function(req, res){
    res.render("caterpillarKidz");
});

app.get('/contacts', function(req, res){
    res.render("contacts");
});

//===================
// AUTH ROTES
//===================
// REGISTRO TEMPORARIO
// app.get('/register', function(req, res){
//     res.render('register');
// });
// app.post('/register', function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render('register');
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/painel");
//         });
//     });
// });

// SHOW LOGIN PASSWORD FORM
app.get('/login', function(req, res){
    res.render("login");
});
// HANDLING LOGIN LOGIC
app.post('/login', passport.authenticate("local", {
        successRedirect: "/painel",
        failureRedirect: "/login"
    }), function(req, res){
});

// Logic LOGOUT
app.get('/logout', function(req, res){
    req.logOut();
    res.redirect("/");
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//PAGE DOESN'T EXIST, this route need stay in the end!
app.get('/*', function(req, res){
    res.render("404");
});

// STARTING THE SERVER PORT: localhost:3000
app.listen(port, () => console.log(`App listening on port ${port}!`));
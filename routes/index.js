var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const journeyModel = require('../models/journey')
const userModel = require('../models/users')

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://JeremyP:alvardbcapsule@cluster0-hnrk8.mongodb.net/Ticketac?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);



var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('login', { title: 'test' });
});

router.get('/homepage', function(req, res, next) {


  res.render('homepage', { title: 'Express' });
});

router.post('/cities', async function(req, res, next) {

  // var dateFormat = function(date){
  //   var newDate = new Date(date);
  //   var format = newDate.getDate()+'/'+(newDate.getMonth()+1)+'/'+newDate.getFullYear();
  //   return format;
  // }
  // console.log(dateFormat(req.body.dateFromFront))

 var newJourney = {
  departure : req.body.toCityFromFront,
  arrival : req.body.fromCityFromFront,
  date : req.body.dateFromFront
 }

console.log(newJourney.date)




 var journeys = await journeyModel.find({ departure: newJourney.departure, arrival: newJourney.arrival});

 for(var i=0; i<journeys.length; i++){
   var date = new Date(journeys[i].date)
   var strDate = date.toGMTString()
   console.log(strDate)

 }
 console.log(date)

console.log(journeys)

  res.render('homepage', { journeys, newJourney });
});
router.get('/avaiblejourney', function(req, res, next) {


  res.render('avaiblejourney', { title: 'Express' });
});
router.get('/nofound', function(req, res, next) {
  res.render('nofound', { title: 'Express' });
});
router.get('/plannedjourney', function(req, res, next) {
  res.render('plannedjourney', { title: 'Express' });
});
router.get('/popup', function(req, res, next) {
  res.render('popup', { title: 'Express' });
});
// Remplissage de la base de donnée, une fois suffit
// router.get('/save', async function(req, res, next) {

//   // How many journeys we want
//   var count = 300

//   // Save  ---------------------------------------------------
//     for(var i = 0; i< count; i++){

//     departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
//     arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

//     if(departureCity != arrivalCity){

//       var newUser = new journeyModel ({
//         departure: departureCity , 
//         arrival: arrivalCity, 
//         date: date[Math.floor(Math.random() * Math.floor(date.length))],
//         departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
//         price: Math.floor(Math.random() * Math.floor(125)) + 25,
//       });
       
//        await newUser.save();

//     }

//   }
//   res.render('index', { title: 'Express' });
// });


// // Cette route est juste une verification du Save.
// // Vous pouvez choisir de la garder ou la supprimer.
// router.get('/result', function(req, res, next) {

//   // Permet de savoir combien de trajets il y a par ville en base
//   for(i=0; i<city.length; i++){

//     journeyModel.find( 
//       { departure: city[i] } , //filtre
  
//       function (err, journey) {

//           console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
//       }
//     )

//   }


//   res.render('index', { title: 'Express' });
// });

module.exports = router;

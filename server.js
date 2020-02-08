const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const MONGO_URL = 'mongodb://localhost:27017/playerStats';

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

let db = null;
let collection = null;


async function startDbAndServer() {

	//connet to mongo 
 	db = await mongodb.connect(MONGO_URL);
	collection = db.collection('players');
	//wait for a connection on port 3000 use public folder
	await app.listen(3000);
	console.log("Listening on port 3000\n");

};

startDbAndServer();

async function insertPlayer(req, res) {

	console.log("INSERTPLAYER\n");
	const newEntry = { 
	firstName: req.body.firstName,
    	lastName: req.body.lastName,
	playerWeight: req.body.playerWeight !== "NA" ? Number(req.body.playerWeight) : "NA",
	combineYear: req.body.combineYear !== "NA" ? Number(req.body.combineYear) : "NA",
	heightfeet: req.body.heightfeet !== "NA" ? Number(req.body.heightfeet) : "NA",
	heightinches: req.body.heightinches !== "NA" ? Number(req.body.heightinches) : "NA",
	fortyyd: req.body.fortyyd !== "NA" ? Number(req.body.fortyyd) : "NA",
	vertical: req.body.vertical !== "NA" ? Number(req.body.vertical) : "NA",
	college: req.body.college,
	playerPosition: req.body.playerPosition
	};
	
	const response = await collection.insertOne(newEntry);
	res.json({ _id : response.insertedId });

}
app.post('/insert', jsonParser, insertPlayer);


async function getPlayers(req, res) {	
	const ourParams = {
    	firstName: req.params.firstName,
    	lastName: req.params.lastName,
	playerWeight: req.params.playerWeight !== "NA" ? Number(req.params.playerWeight) : "NA",
	combineYear: req.params.combineYear !== "NA" ? Number(req.params.combineYear) : "NA",
	heightfeet: req.params.heightfeet !== "NA" ? Number(req.params.heightfeet) : "NA",
	heightinches: req.params.heightinches !== "NA" ? Number(req.params.heightinches) : "NA",
	fortyyd: req.params.fortyyd !== "NA" ? Number(req.params.fortyyd) : "NA",
	vertical: req.params.vertical !== "NA" ? Number(req.params.vertical) : "NA",
	college: req.params.college,
	playerPosition: req.params.playerPosition
  }
	console.log(ourParams);
	
	var objectKeys = Object.keys(ourParams);
	var objectValues = Object.values(ourParams);
	console.log(objectKeys[0]);
	var ourQuery= {};
	
	for(var i = 0; i<objectKeys.length;i++){
		if(objectValues[i] === "NA"){
			continue;
		}

		ourQuery[objectKeys[i]] = objectValues[i];
	}
	console.log(ourQuery);
  const result = await collection.find(ourQuery).toArray();

 console.log(result);
  
  //response
  res.json(result);
}
app.get('/get/:firstName/:lastName/:playerWeight/:combineYear/:heightfeet/:heightinches/:fortyyd/:vertical/:college/:playerPosition', getPlayers);

async function updatePlayer(req, res) {

	console.log("UPDATEPLAYER\n");
	const newEntry = { 
	firstName: req.body.firstName,
    	lastName: req.body.lastName,
	playerWeight: req.body.playerWeight !== "NA" ? Number(req.body.playerWeight) : "NA",
	combineYear: req.body.combineYear !== "NA" ? Number(req.body.combineYear) : "NA",
	heightfeet: req.body.heightfeet !== "NA" ? Number(req.body.heightfeet) : "NA",
	heightinches: req.body.heightinches !== "NA" ? Number(req.body.heightinches) : "NA",
	fortyyd: req.body.fortyyd !== "NA" ? Number(req.body.fortyyd) : "NA",
	vertical: req.body.vertical !== "NA" ? Number(req.body.vertical) : "NA",
	college: req.body.college,
	playerPosition: req.body.playerPosition
	};
	//new ObjectID(cardID)
	//const response = await collection.insertOne(query);
		console.log(req.body._id);
		const query = { _id: new ObjectID(req.body._id) };//objectID
		//const newEntry = { word: word, definition: definition };
		const response = await collection.update({"_id": ObjectID(req.body._id)}, newEntry);
		//const response = await collection.insertOne(newEntry);
		console.log("SHOULD UPDATE\n");
		res.json(response);
	
	

}
app.post('/update', jsonParser, updatePlayer);


async function mainPage(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
}
app.get('*', mainPage);

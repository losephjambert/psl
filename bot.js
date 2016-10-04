//More in depth question at the bottom of the file

/*===========================================================
Confirmation message to let us know our server is working
===========================================================*/
console.log("Hello Dave");

/*===========================================================
Require local modules and declare global varz
===========================================================*/
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var pslObj = require('./psl-object');
var shuffle = function(arr) {/* <3 ---> a-l-a-a.com <--- <3 */
	for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		return arr;}
var timeNow = function() {
  var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
  return h+m;
}

/*===========================================================
Bot run functions
===========================================================*/
//global time var to control the tweetIt interval. currently set to every half hour
var time = 100*60*30;

//global error and success function for twitter api call
var tweeted = function(err, data, response){
	if (err){console.log("I was unable to tweet" + err);}
	else{console.log("I tweeted, with glory.");}};

//function to make a three-word phrase from the psl-object.js file
var makePhrase = function(object){
	newArray = [];
	for (key in object){
		words = object[key][Math.floor(Math.random()*object[key].length)].toUpperCase();
		newArray.push(words);
		phrase = newArray.join(' ');
	}
	return phrase;
	if (newArray.length > 1){
		console.log("emptying array");
		newArray = [];
	}
};

//function to make a standard tweet
var tweetIt = function(object){//this function sends out the tweet
		var tweetContent = {status: makePhrase(object) + " @Starbucks @TheRealPSL #trpsl #psl #peoplesharelove"}
		console.log(tweetContent);
		// T.post('statuses/update', tweetContent, tweeted);
};

//function to reply with a tweet when account is mentioned
var replies = function(object){
	var stream = T.stream('statuses/filter', { track: '@TheRealestPSL' });
	stream.on('tweet', replied);
	function replied(event){
		var screenName = event.user.screen_name;
		var replyContent = {status: makePhrase(object) + "? @" + screenName + " #trpsl #psl #peoplesharelove"};
		console.log(replyContent);
		// T.post('statuses/update', replyContent, tweeted);
	};
};

//initiate the reply function
replies(pslObj);

//set an interval between specific hours of the day for efficient tweeting
if (timeNow() >= 700 && timeNow() <= 1800 ){
	setInterval( function() {tweetIt(pslObj);}, time );
}



/*
My big question here is how could I have been more efficient in my execution of this?
I have two different processes going on here. One function—tweetIt();—to tweet every
half hour, and another function—replies();—to tweet when someone mentions the account.
They both use makePhrase(); to generate the tweet content, but I have to call the functions
at the end of the code. I've seen in a lot of js examples, folks will call functions at
the top of their code, but when I do that with replies();, node throws an error stating
that `replies(); is not a function`.
*/
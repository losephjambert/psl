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
  // return h + ':' + m;
  return h+m;
  // console.log(h + m);
}
if (timeNow() >= 700 && timeNow() <= 1800 ){
console.log("the current time is " + timeNow());
}
/*===========================================================
Magic Javascript Island ----> Ignite!
===========================================================*/
var time = 1000*60*30;
var tweeted = function(err, data, response){
	if (err){console.log("I was unable to tweet" + err);}
	else{console.log("I tweeted, with glory.");}};

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

var tweetIt = function(object){//this function sends out the tweet
		var tweetContent = {status: makePhrase(object) + " @Starbucks @TheRealPSL #trpsl #psl #peoplesharelove"}
		console.log(tweetContent);
		// T.post('statuses/update', tweetContent, tweeted);
};

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

replies(pslObj);
if (timeNow() >= 700 && timeNow() <= 1800 ){
	setInterval( function() {tweetIt(pslObj);}, time );
}

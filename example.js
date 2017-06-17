var convertemoji = require('emoji-totext');

//var str = "I love you 💙";
//var str = "I want to eat🍕🍕";
//var str = "🙍🏾🍕🙆🏾";
var str = "A🐧 am I !"

convertemoji.toText(str,function(err,sentence){
	console.log(sentence);
})



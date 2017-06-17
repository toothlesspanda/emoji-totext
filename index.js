var iconv  = require('iconv-lite');
var fs = require('fs');
var os = require('os');
var nodepos = require('node-pos');
var fastcsv = require('fast-csv');
//var str = "I think it's Steve Jobs standing in a dark room,and he seems 😁. ";

var preposition = "";
var str;
exports.toText = function (sentence, callback) {
	str = sentence;

	var utf8 = unescape(encodeURIComponent(str));
	var arr = [] 

	//convers to unicode
	for (var i = 0; i < utf8.length; i++) {
	    arr.push(utf8.charCodeAt(i).toString(16));
	}

	var unicode = []
	var u = 0;
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == "f0" || arr[i] == "e2"){
			unicode[u] = 	"\\x" + arr[i].toUpperCase()+
						"\\x" + arr[i+1].toUpperCase()+
						"\\x" + arr[i+2].toUpperCase()+
						"\\x" + arr[i+3].toUpperCase();
			u++;
		}
	}
	


		var stream = fs.createReadStream(__dirname+"/emDict.csv");
		var newstr = -1;

		var csvStream = fastcsv.parse({objectMode:true,headers: true, delimiter:";"})
		    .on("data", function(data){
		    	
		    	for(var u = 0; u < unicode.length ; u++){
		    		var unicodeSmile = unicode[u].replace(/\\\\/g,"\\");

			     	if(data.Bytes == unicodeSmile){

			     		
			     		str = generatePreposition(str,data.Description,data.Native);


			     		var str_split = str.toString().split(data.Native)
			     		var index

			     		if(str_split[0].length == 0){ //in the begining
			     			index = 1
			     		}else if(str_split[str_split.length-1].length == 0){ //in the end
			     			index = 0
			     		}else{ //in the middle
			     			index = -1
			     		}

			     		
			     		if(index == 0){

				     		newstr = str_split[index]+ preposition + data.Description.toLowerCase(); 
				     		

			     		}else if(index == 1){
	     	
				     		newstr = preposition+data.Description.toLowerCase()+","+str_split[index]; 
				     		newstr = newstr.toString().charAt(0).toUpperCase() + newstr.toString().slice(1).toLowerCase();

			     		}else{

			     			if(str_split[1].charAt(0) != " ")
			     				str_split[1]= " "+str_split[1]
			     			
				     		newstr = str_split[0] + data.Description.toLowerCase()+str_split[1]; 
				     		
			     		}
				    		
			     	}       
			     }

		    })
		    .on("end", function(){
	         	callback(null, newstr);
	   		});

		stream.pipe(csvStream);

	
	
};

function generatePreposition(str,desc,emoji) {
	var sentence = str.split(" ");
	var e_index = -1;
	var found = false;
	var withWord = false;

	//get emoji index
	for(var e = 0; e < sentence.length; e++){
		if(sentence[e] ==  emoji){
			e_index = e;
			found = true;
		}
	}

	console.log(str);
	var tmp_str = str.split(emoji)
	if(!found){

		if( str.indexOf(emoji) > -1 ){
			e_index = str.indexOf(emoji);
			withWord = true;
		}
	
	}

	if(withWord){

		if(str.charAt(e_index-1) != " "){ //has space before emoji
				
			str = tmp_str[0]+" "+emoji + tmp_str[1];
			console.log(str);
		}else if(str.charAt(e_index+1) != " "){ //has space after emoji

			str = tmp_str[0]+emoji+ " " + tmp_str[1];

		}
	}

	if(desc.indexOf("FACE") > -1){
		preposition = "with a "
	}else{
		if(e != 0){
			if(str[e-2] != "a" )
				preposition = "a " 
		}
	
	}

	return str;

}

# emoji-totext

npm package to translate emojis to text

## Installation

  `npm install emoji-totext`

## Usage

```js
var convertemoji = require('emoji-totext');
var str = "I want to eat 🍕";

convertemoji.toText(str,function(err,sentence){
	console.log(sentence);
 })
 ```
 Output should be: 'I want to eat a slice of pizza`


## Limitations

  - At this point can only perform evaluations of sentences with only one emoji
  - Not all emojis are "readable"


# emoji-totext
=========

A small library that adds commas to numbers

## Installation

  `npm install emoji-totext`

## Usage
    var convertemoji = require('emoji-totext');
    var str = "I want to eat 🍕";


    convertemoji.toText(str,function(err,sentence){
	    console.log(sentence);
    })
  
  Output should be: 'I want to eat a slice of pizza`


## Limitations

  - At this point can only perform evaluations of sentences with only one emoji
  - Not all emojis are "readable"

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

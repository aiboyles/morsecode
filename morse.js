var alphabet = {};
var alphabet_rev = {};
var startTime = new Date();
var endTime = new Date();
var pressed = 0;

var currentLetter = 1;
var currentLetterStr = "";
var currentLetterCode = "";

// translates string of 1s and 0s to dots and dashes
function toMorseCode(str) {
    var charArray = str.split("");
    var morseString = "";
    
    for (i = 0; i < charArray.length; i++) {
        if (charArray[i] == "0") {
            morseString += "<div class='dot'></div>";
        }
        else {
            morseString += "<div class='dash'></div>";
        }
    }
    return morseString;
}

// loads the reference morse code alphabet table
function loadReferenceAlphabet() {
    
    // initialize alphabet array
    alphabet['01'] = 'a';
    alphabet['1000'] = 'b';
    alphabet['1010'] = 'c';
    alphabet['100'] = 'd';
    alphabet['0'] = 'e';
    alphabet['0010'] = 'f';
    alphabet['110'] = 'g';
    alphabet['0000'] = 'h';
    alphabet['00'] = 'i';
    alphabet['0111'] = 'j';
    alphabet['101'] = 'k';
    alphabet['0100'] = 'l';
    alphabet['11'] = 'm';
    alphabet['10'] = 'n';
    alphabet['111'] = 'o';
    alphabet['0110'] = 'p';
    alphabet['010'] = 'r';
    alphabet['000'] = 's';
    alphabet['1'] = 't';
    alphabet['001'] = 'u';
    alphabet['0001'] = 'v';
    alphabet['011'] = 'w';
    alphabet['1001'] = 'x';
    alphabet['1011'] = 'y';
    alphabet['110'] = 'z';
    
    // initialize alphabet_rev array
    alphabet_rev['a'] = '01';
    alphabet_rev['b'] = '1000';
    alphabet_rev['c'] = '1010';
    alphabet_rev['d'] = '100';
    alphabet_rev['e'] = '0';
    alphabet_rev['f'] = '0010';
    alphabet_rev['g'] = '110';
    alphabet_rev['h'] = '0000';
    alphabet_rev['i'] = '00';
    alphabet_rev['j'] = '0111';
    alphabet_rev['k'] = '101';
    alphabet_rev['l'] = '0100';
    alphabet_rev['m'] = '11';
    alphabet_rev['n'] = '10';
    alphabet_rev['o'] = '111';
    alphabet_rev['p'] = '0110';
    alphabet_rev['q'] = '1101';
    alphabet_rev['r'] = '010';
    alphabet_rev['s'] = '000';
    alphabet_rev['t'] = '1';
    alphabet_rev['u'] = '001';
    alphabet_rev['v'] = '0001';
    alphabet_rev['w'] = '011';
    alphabet_rev['x'] = '1001';
    alphabet_rev['y'] = '1011';
    alphabet_rev['z'] = '1100';
    
    var myAppend = "<table class='table table-bordered table-custom'>";
    
    for (j = 0; j < 13; j++) {
        var k = j + 97;
        
        myAppend += "<tr><td style='text-align:center;'>" + String.fromCharCode(k) 
            + "</td><td>" + toMorseCode(alphabet_rev[String.fromCharCode(k)]) + "</td><td style='text-align:center'>"
            + String.fromCharCode(k + 13) + "</td><td>" + toMorseCode(alphabet_rev[String.fromCharCode(k + 13)])
            + "</td></tr>";
    }

    myAppend += "</table>";
    $("div.reference-alphabet-area").html(myAppend);
}

// prints the alphabet letter underneath the morse code letter
function addLetterToDiv() {
    if (alphabet[currentLetterCode] === undefined)
    {
        $(currentLetterStr).append("<div class='letter-print'>?</div>");
    }
    else {
        $(currentLetterStr).append("<div class='letter-print'>" + alphabet[currentLetterCode].toUpperCase() + "</div>");
    }
    currentLetterCode = "";
}

$(document).keydown(function(event) {
  
    // does nothing if the key is being held down
    if (pressed) {
        return;
    }
    else {
        pressed = 1; // indicates the key is being held down
        var keyCaptured = String.fromCharCode(event.keyCode).toLowerCase();
        if (keyCaptured == 'm') {
            startTime = event.timeStamp;
            // if there has been a pause, finish off this letter and start a new one
            if ((startTime - endTime) > 500) {
                addLetterToDiv();
                $("").append("<div class='space'></div>");
                $("div.code-area").append("<div id='letter" + currentLetter + "' class='letter-container'></div>");
                currentLetterStr = "#letter" + currentLetter;
                currentLetter++;
            }
        }
        // if the key is z, print the letter beneath the morse code letter
        if (keyCaptured == 'z')
        {
            addLetterToDiv();
            startTime = 0;
            endTime = 0;
        }
    }
});

$(document).keyup(function(event) {
  var keyCaptured = String.fromCharCode(event.keyCode).toLowerCase();
  if (keyCaptured == 'm')
  {
      endTime = event.timeStamp;
      var duration = endTime - startTime;
      if (duration < 250) {
          $(currentLetterStr).append("<div class='dot'></div>");
          currentLetterCode += "0";
      }
      else if (duration > 250) {
          $(currentLetterStr).append("<div class='dash'></div>");
          currentLetterCode += "1";
      }
  }
  pressed = 0;
});

$(document).ready(function () {
    // load the reference alphabet
    loadReferenceAlphabet();
});
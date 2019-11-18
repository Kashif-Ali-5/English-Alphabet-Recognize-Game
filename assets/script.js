paper.install(window);
var canvas;
window.onload = () => {

    canvas = document.getElementById('input_canvas');
    paper.setup(canvas);
    var tool = new Tool();
    var path;
    tool.onMouseDown = (event) => {
        path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.add(event.point);
    }
    
    tool.onMouseUp = (event) => {
      path.smooth();
    }

    tool.onMouseDrag = (event) => {
        path.add(event.point);
    }


    $('#button_game_start').click(function(){
        startGameButton();

    });

    // Remove the drawing text for right again
    $('#button_remove').click(function(){
       gameLoad();
        // timer();
    });
    $('#button_play_again').click(function(){
        gameLoadAgain();
    });

} 

// Fucntion print a rendom alphabet
function randomAlphabet(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;

}


    
 
    
// defining the random alphabet length
// printing the alphabet on screen
function say () {

    alphabet = (randomAlphabet(1));
    console.log(alphabet);
    $('#random_alphabet_block').html('<span>' + alphabet + '</span>');
}
say();


// Timer
let minutesLabel = document.getElementById("minutes"),
    secondsLabel = document.getElementById("seconds"),
    totalSeconds = 0,
    seconds = 0,
    minutes = 0,
    TimerId = 0;

function setTime() {
    ++totalSeconds;
    seconds =  pad(totalSeconds % 60);
    minutes = pad(parseInt(totalSeconds / 60));
    secondsLabel.innerHTML = seconds;
    minutesLabel.innerHTML = minutes ;
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function startGameButton() {
    TimerId = setInterval(setTime, 1000);
    $('#button_recognize').removeAttr('disabled').removeClass('button-disable').addClass('button-enable');
    $('#button_remove').removeAttr('disabled').removeClass('button-disable').addClass('button-enable');
    $('#button_game_start').attr('disabled', 'disable').removeClass('button-enable').addClass('button-disable');
    $('#input_canvas').css('pointer-events', 'auto');

}




// remove the drawing text
// recall the say() function
// make the game replayable
// set the timer 00 again
// Disable the canvas (to get click on start button)
function gameLoadAgain () {
     paper.project.activeLayer.removeChildren();
    say();
    $('#button_play_again').css('visibility', 'hidden');
    $('#button_game_start').removeAttr('disabled').removeClass('button-disable').addClass('button-enable');
    TimerId = setInterval(setTime, 1000);
    clearInterval(TimerId);
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
    totalSeconds = 0;
    $('#input_canvas').css('pointer-events', 'none');
    
    console.log('GameLoadAGain function --->' + minutes + ' : ' + seconds)
}
// remove the drawing text
// Give to the user an other chance
// not stop the timer
function gameLoad() {// in the case of wrong attempt
    paper.project.activeLayer.removeChildren();
    // document.querySelector("#results_block").innerHTML = '';
    $('#random_alphabet_block').html(alphabet);
    $('#button_recognize').removeAttr('disabled');
    console.log('GameLoad function--> '+ minutes + ' : ' + seconds);
    
}
// if case of successfull match
// stop the timer and print total time
function success() {
    $('#random_alphabet_block').html('Success ... !! Your time '+ minutes + ' : ' + seconds);
    $('#button_play_again').css('visibility', 'visible').removeClass('button-disable').addClass('button-enable');
    $('#button_recognize').attr('disabled', 'disable').removeClass('button-enable').addClass('button-disable');
    $('#button_remove').attr('disabled', 'disable').removeClass('button-enable').addClass('button-disable');
    $('#input_canvas').css('pointer-events', 'none');// disabling the convas 
    clearInterval(TimerId);
    console.log('Success function--> '+ minutes + ' : ' + seconds);

}



let StartRecognize = () => {
    $('#button_recognize').css('visibility', 'hidden');
    $('#button_remove').css('visibility', 'hidden');
    $('#button_play_again').css('visibility', 'hidden');
    $('#button_game_start').css('visibility', 'hidden');
    document.getElementById('loader').style.display = "block";
    document.getElementById('loading_label').style.display = "block";
    // document.querySelector("#results_block").innerHTML = '';
    Tesseract.recognize(document.getElementById('input_canvas').getContext('2d'))
        .then(function (data) {

            // document.getElementById('results_block').innerText = data.text;
            $('#button_recognize').css('visibility', 'visible');
            $('#button_remove').css('visibility', 'visible');
            $('#button_game_start').css('visibility', 'visible');

            document.getElementById('loading_label').style.display = "none";
            document.getElementById('loader').style.display = "none";

            // custom query
            var obj = data.text;
                value = alphabet;

                // Check if is that the alphabet matching OR not
            if (obj.match(value)) {
                console.log(value);
                success();

            } else {
                console.log('???');
                console.log(obj);
                $('#random_alphabet_block').html('Write Again' + ' ' + '<span>' + value + '</sapn>');
                $('#button_recognize').attr('disabled', 'disable');

                // gameLoad();
            }

        }) // end of then function
}


// Check if the result block udpated
$('#input_canvas').bind('DOMSubtreeModified',function(event) {


});


// $("#input_canvas").attr("disabled", "disabled").off('click');
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

    // Remove the drawing text for right again
    $('#button_remove').click(function(){
       gameLoad();
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
    $('#random_alphabet_block').html(alphabet);
}
say();


// remove the drawing text
// recall the say() function
// make the game replayable
function gameLoadAgain () {
     paper.project.activeLayer.removeChildren();
    document.querySelector("#results_block").innerHTML = '';
    say();
    $('#button_play_again').css('visibility', 'hidden');
    $('#button_recognize').removeAttr('disabled');
    $('#button_remove').removeAttr('disabled');
}
// remove the drawing text
// Give to the user an other chance
function gameLoad() {
    paper.project.activeLayer.removeChildren();
    document.querySelector("#results_block").innerHTML = '';
    $('#random_alphabet_block').html(alphabet);
    $('#button_recognize').removeAttr('disabled');
    
}
// if case of successfull match
function success() {
    $('#random_alphabet_block').html('Success ... !!');
    $('#button_play_again').css('visibility', 'visible');
    $('#button_recognize').attr('disabled', 'disable');
    $('#button_remove').attr('disabled', 'disable');
}



let StartRecognize = () => {
    $('#button_recognize').css('visibility', 'hidden');
    $('#button_remove').css('visibility', 'hidden');
    $('#button_play_again').css('visibility', 'hidden');
    document.getElementById('loader').style.display = "block";
    document.getElementById('loading_label').style.display = "block";
    document.querySelector("#results_block").innerHTML = '';
    Tesseract.recognize(document.getElementById('input_canvas').getContext('2d'))
        .then(function (data) {

            document.getElementById('results_block').innerText = data.text;
            $('#button_recognize').css('visibility', 'visible');
            $('#button_remove').css('visibility', 'visible');

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
                $('#random_alphabet_block').html('Write Again' + ' ' + value );
                $('#button_recognize').attr('disabled', 'disable');

                // gameLoad();
            }

        }) // end of then function
}


// Check if the result block udpated
$('#results_block').bind('DOMSubtreeModified',function(event) {

});

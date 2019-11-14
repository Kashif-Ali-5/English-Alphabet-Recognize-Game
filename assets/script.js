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

    document.getElementById('button_remove').onclick = () => {
        paper.project.activeLayer.removeChildren();
        document.querySelector("#results_block").innerHTML = '';
    }
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
var alphabet = (randomAlphabet(1));

$('#random_alphabet_block').html(alphabet);



let StartRecognize = () => {
    document.getElementById('button_recognize').style.display = "none";
    document.getElementById('button_remove').style.display = "none";
    document.getElementById('loader').style.display = "block";
    document.getElementById('loading_label').style.display = "block";
    document.querySelector("#results_block").innerHTML = '';
    Tesseract.recognize(document.getElementById('input_canvas').getContext('2d'))
        .then(function (data) {
            document.getElementById('results_block').innerText = data.text;
            document.getElementById('button_recognize').style.display = "block";
            document.getElementById('button_remove').style.display = "block";
            document.getElementById('loading_label').style.display = "none";
            document.getElementById('loader').style.display = "none";

            // custom query
            var obj = data.text;
                value = alphabet;

                // Check if is that the alphabet matching OR not
            if (obj.match(value)) {
                console.log(value);
                $('#random_alphabet_block').html('Success');
            } else {
                console.log('???');
                $('#random_alphabet_block').html('Write Again');
            }




        }) // end of then function
}


// Check if the result block udpated
$('#results_block').bind('DOMSubtreeModified',function(event) {

});

Status = "";
object = [];
input = "";
function draw(){
    push();
    translate(width,0);
    scale(-1, 1);
  image(video, 0,0, 460, 380);
  pop();
  if(Status != ""){
    objectDetector.detect(video, gotresults);
    for(i = 0; i < object.length; i++){
        document.getElementById("status").innerHTML = "Status: Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are " + object.length;
        fill("#FF0000");
        stroke('#FF0000');
        percent = floor(object[i].confidence *100);
        text(object[i].label + "  " + percent + "%", object[i].x, object[i].y + 15); 
        noFill();
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        if(object[i].label == input){
            video.stop();
            object.detector.detect(gotresults);
            document.getElementById("status").innerHTML = input + "Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(input + "Found");
            synth.speak(utterThis);
        }else{
            document.getElementById("status").innerHTML = input + " Not Found";

        }
    }
}
}
function setup(){
    canvas = createCanvas(460,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    
}
function gotresults(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        object = results;
    }
}
function modelloaded(){
    console.log("Model Loaded!");
    Status = true;  
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").value;
    console.log(input); 
}
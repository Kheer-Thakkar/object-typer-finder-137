object=[];
var status="";


function setup(){
    canvas=createCanvas(300, 300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}
function draw(){
    image(video, 0, 0, 300, 300);
    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for (i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status : objects Detected";

        fill("#ff006a");
        percent=floor(objects[i].confidence*100);
        text (objects[i].label+""+percent+"%", objects[i].x ,objects[i].y);
        noFill();
        stroke("#03ffc8");
         rect (objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         if (objects[i].label==object_name){
             video.stop();
             objectDetector.detect(gotResult);
             document.getElementById("object_detect").innerHTML="found";

         }
           else{
            document.getElementById("object_detect").innerHTML="notfound";
           }
        }

    }
    }

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;

}

  
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}



function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting object";
    object_name=document.getElementById("1_label").value;
}



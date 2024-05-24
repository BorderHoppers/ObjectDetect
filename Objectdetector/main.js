img = "";
objects = [];
status = "";

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('concossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estatus: detectando objetos";

}

function preload(){
    img = loadImage('dog_cat.jpg');
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != ""){
        r = random(255)
        g = random(255)
        b = random (255)
        objectDetector.detect(video, gotResult);
        for(var i = 0; i < objects.lenght; i++){
           document.getElementById("status").innerHTML = "Estatus: objeto detectado";
           document.getElementById("number_of_objects").innerHTML = "Numero de objectos detectados"+ objects.length;
           fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded() {
    console.log("¡Modelo cargado!")
    status= true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);

    objects = results;
}
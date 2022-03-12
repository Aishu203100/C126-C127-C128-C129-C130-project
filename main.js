song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

song1_status = "";
song2_status = "";
score_leftWrist = 0;
score_rightWrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#A40E4C");
    stroke("#2C2C54");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    if(score_leftWrist>0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2_status==false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Song: Star Spangled Banner";
            console.log("Star Spangled Banner song is being played now!")
        }
    }

    if(score_rightWrist>0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1_status==false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song: Jana Gana Mana";
            console.log("Jana Gana Mana is being played now!");
        }
    }
}

function preload() {
    song1 = loadSound("National-Anthem-Of-India.mp3");
    song2 = loadSound("National-Anthem-Of-The-United-States.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Model Is Loaded!");
}

function gotPoses(results) {
    if (results.length>0) {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(results);
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
        score_rightWrist = results[0].pose.keypoints[10].score;
        score_leftWrist = results[0].pose.keypoints[9].score;
    }
}

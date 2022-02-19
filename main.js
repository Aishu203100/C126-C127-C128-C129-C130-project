music = " ";
music2 = " ";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload()
{
    music = loadSound("music.mp3")
    music2 = loadSound("music2.mp3")
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{

}
function gotPoses(results)
{
    if(results[0].length > 0)
    {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + " LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + " RightWristY = " + rightWristY);
    }
}
function draw()
{
    image(video,0,0,600,500);
}
function play()
{
    music.play();
    music.setVolume(1);
    music.rate(1);
}

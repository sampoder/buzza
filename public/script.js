var teacher = false;
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
document.getElementById("active").style.display = "none";
document.getElementById("buzz").disabled = true;
document.getElementById("unbuzz").disabled = true;
var x = document.getElementById("info-text");
var socket = io();
socket.on("connectToRoom", function(data) {
  console.log(data);
});
socket.on("buzz", function(msg) {
  if (teacher == true) {
    document.getElementById("unbuzz").disabled = false;
  }
  console.log(msg);
  document.getElementById("buzz").disabled = true;
  document.getElementById("info-text").innerText = msg + " has buzzed.";
});
socket.on("unbuzz", function(msg) {
  console.log(msg);
  if (teacher == false) {
    document.getElementById("buzz").disabled = false;
    document.getElementById("unbuzz").disabled = true;
  }

  document.getElementById("info-text").innerText =
    msg + " has disengaged the buzzer.";
});

var connectedRoom = "none";

var username = "none";

function joinGame() {
  connectedRoom = document.getElementById("room").value;
  username = document.getElementById("name").value;
  socket.emit("join-room", connectedRoom);
  document.getElementById("buzz").disabled = true;
  document.getElementById("setup").style.display = "none";
  document.getElementById("active").style.display = "block";
}

function teacherSetup() {
  document.getElementById("buzz").innerText = "loading";
  document.querySelector("#buzz:disabled").style.color="black"
  var request = new XMLHttpRequest();
  var name = "unknown";
  request.open("GET", "https://friendly-words.glitch.me/word-pairs", true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    name = data[0];
    console.log(name);
    socket.emit("join-room", name);
    connectedRoom = name;
    document.getElementById("buzz").innerText = name;
    document.querySelectorAll("button:disabled").style.color = "black";
    document.getElementById("buzz").disabled = true;
    document.getElementById("unbuzz").disabled = false;
  };

  request.send();
  connectedRoom = document.getElementById("room").value;
  username = "The teacher";
  socket.emit("join-room", connectedRoom);
  document.getElementById("buzz").disabled = true;
  document.getElementById("unbuzz").disabled = false;
  document.getElementById("setup").style.display = "none";
  document.getElementById("active").style.display = "block";
  document.getElementById("info-text").innerText = "Join the game!";
  document.getElementById("unbuzz").innerText = "Enable Buzzers";
  teacher = true;
  console.log(teacher);
}

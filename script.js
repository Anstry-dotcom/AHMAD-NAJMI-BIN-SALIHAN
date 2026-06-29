/* ===========================
   LIVE CLOCK
=========================== */

function updateClock() {
    const clock = document.getElementById("clock");

    if (clock) {
        const now = new Date();
        clock.innerHTML = now.toLocaleTimeString();
    }
}

setInterval(updateClock, 1000);
updateClock();

/* ===========================
   DARK MODE
=========================== */

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

window.onload = function () {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    visitorCounter();
    updateClock();
    loadBestScore();
};

/* ===========================
   VISITOR COUNTER
=========================== */

function visitorCounter() {

    let visitor = localStorage.getItem("visitor");

    if (visitor == null) {
        visitor = 1;
    } else {
        visitor = Number(visitor) + 1;
    }

    localStorage.setItem("visitor", visitor);

    let total = document.getElementById("visitorCount");

    if (total) {
        total.innerHTML = visitor;
    }
}

/* ===========================
   CONTACT FORM VALIDATION
=========================== */

function validateForm() {

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let gender = document.querySelector('input[name="gender"]:checked');
    let photo = document.getElementById("photo").value;
    let terms = document.getElementById("terms").checked;

    if (fullname == "") {
        alert("Please enter your full name");
        return false;
    }

    if (email == "") {
        alert("Please enter your email");
        return false;
    }

    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(pattern)) {
        alert("Invalid email");
        return false;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return false;
    }

    if (dob == "") {
        alert("Please select date of birth");
        return false;
    }

    if (!gender) {
        alert("Please select gender");
        return false;
    }

    if (photo == "") {
        alert("Please upload profile photo");
        return false;
    }

    if (!terms) {
        alert("Please accept Terms & Conditions");
        return false;
    }

    alert("Form Submitted Successfully!");

    return true;
}

/* ===========================
   QUIZ
=========================== */

const questionBank = [

{
question:"What does IoT stand for?",
options:["Internet of Things","Internet of Technology","Input of Things","Internet of Tools"],
answer:"Internet of Things"
},

{
question:"Which board is used in this project?",
options:["ESP32","Arduino Nano","PIC","Raspberry Pi"],
answer:"ESP32"
},

{
question:"HTML is used for?",
options:["Structure","Style","Database","Animation"],
answer:"Structure"
},

{
question:"CSS is used for?",
options:["Styling","Database","Hardware","Login"],
answer:"Styling"
},

{
question:"JavaScript is used for?",
options:["Interactivity","Drawing","Storage","Photos"],
answer:"Interactivity"
},

{
question:"Which sensor measures temperature?",
options:["DHT22","LDR","PIR","Ultrasonic"],
answer:"DHT22"
},

{
question:"Which database is commonly used with PHP?",
options:["MySQL","Excel","Word","Photoshop"],
answer:"MySQL"
},

{
question:"What is PHP?",
options:["Server-side Language","Database","Operating System","Browser"],
answer:"Server-side Language"
},

{
question:"What is Dashboard?",
options:["Display Data","Music","Video","Animation"],
answer:"Display Data"
},

{
question:"Which IDE uploads ESP32 code?",
options:["Arduino IDE","VS Code","Photoshop","Word"],
answer:"Arduino IDE"
},

{
question:"Which sensor measures distance?",
options:["Ultrasonic","LDR","PIR","DHT22"],
answer:"Ultrasonic"
},

{
question:"Why Login System?",
options:["Security","Game","Video","Drawing"],
answer:"Security"
},

{
question:"What is LocalStorage?",
options:["Browser Storage","Cloud","Database","Server"],
answer:"Browser Storage"
},

{
question:"Responsive Website means?",
options:["Fits All Devices","Fast Internet","AI Website","3D Website"],
answer:"Fits All Devices"
},

{
question:"Bootstrap is?",
options:["CSS Framework","Database","Sensor","Browser"],
answer:"CSS Framework"
}

];

let selectedQuestions = [];
let currentQuestion = 0;
let score = 0;

/* ===========================
   START QUIZ
=========================== */

function startQuiz() {

    selectedQuestions = [...questionBank]
    .sort(() => Math.random() - 0.5)
    .slice(0,5);

    currentQuestion = 0;
    score = 0;

    document.getElementById("result").innerHTML = "";

    showQuestion();
}

/* ===========================
   SHOW QUESTION
=========================== */

function showQuestion() {

    let q = selectedQuestions[currentQuestion];

    document.getElementById("question").innerHTML =
    "Question " + (currentQuestion + 1) + " : " + q.question;

    let html = "";

    q.options.forEach(option => {

        html +=
        `<button class="option"
        onclick="checkAnswer('${option}')">
        ${option}
        </button>`;

    });

    document.getElementById("answers").innerHTML = html;
}

/* ===========================
   CHECK ANSWER
=========================== */

function checkAnswer(answer) {

    let correct = selectedQuestions[currentQuestion].answer;

    if (answer == correct) {

        score++;

        let sound = document.getElementById("correctSound");

        if (sound) {
            sound.play();
        }

    } else {

        let sound = document.getElementById("wrongSound");

        if (sound) {
            sound.play();
        }

    }

    currentQuestion++;

    if (currentQuestion < selectedQuestions.length) {

        showQuestion();

    } else {

        finishQuiz();

    }
}

/* ===========================
   FINISH QUIZ
=========================== */

function finishQuiz() {

    let message = "";

    if (score == 5) {

        message = "Excellent!";

    } else if (score == 4) {

        message = "Very Good!";

    } else if (score == 3) {

        message = "Good!";

    } else if (score == 2) {

        message = "Fair!";

    } else {

        message = "Need More Practice!";

    }

    document.getElementById("question").innerHTML = "Quiz Finished";

    document.getElementById("answers").innerHTML =
    `<button onclick="startQuiz()" class="btn">
    Play Again
    </button>`;

    document.getElementById("result").innerHTML =
    "Score : " + score + "/5<br>" + message;

    saveBestScore(score);
}

/* ===========================
   BEST SCORE
=========================== */

function saveBestScore(score) {

    let best = localStorage.getItem("bestScore");

    if (best == null || score > best) {

        localStorage.setItem("bestScore", score);

    }

    loadBestScore();
}

function loadBestScore() {

    let best = document.getElementById("bestScore");

    if (best) {

        let score = localStorage.getItem("bestScore");

        if (score == null) {

            score = 0;

        }

        best.innerHTML = score;

    }
}

/* ===========================
   BACKGROUND MUSIC
=========================== */

function toggleMusic() {

    let music = document.getElementById("bgMusic");

    if (!music) return;

    music.volume = 0.2;

    if (music.paused) {

        music.play();

    } else {

        music.pause();

    }
}

/* ===========================
   SCROLL TO TOP
=========================== */

function topFunction() {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
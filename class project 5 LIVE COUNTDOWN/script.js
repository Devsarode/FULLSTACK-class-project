// Set launch date (YYYY, MM -1, DD, HH, MM, SS)
let launchDate = new Date("2025-09-19T20:24:59").getTime();

// Update every second
let timer = setInterval(function() {
    let now = new Date().getTime();
    let timeLeft = launchDate - now;

    if (timeLeft > 0) {
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    } else {
        clearInterval(timer);
        document.querySelector(".container").innerHTML = "<h1>🎉 We're Live!</h1>";
    }
}, 1000);

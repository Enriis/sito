// Mostra il popup e sfoca lo sfondo
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('registrationPopup').classList.remove('active');
    document.getElementById('mainPage').classList.remove('blur');
});

// Mostra il popup all'avvio
window.onload = function() {
    document.getElementById('registrationPopup').classList.add('active');
    document.getElementById('mainPage').classList.add('blur');
};

// Controlli del video
var video = document.getElementById('promoVideo');
var playPauseBtn = document.getElementById('playPauseBtn');
var speedUpBtn = document.getElementById('speedUpBtn');

playPauseBtn.addEventListener('click', function() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});

speedUpBtn.addEventListener('click', function() {
    video.playbackRate += 0.25;
});
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita che il form venga inviato nel modo tradizionale

    // Ottieni i dati del form
    const formData = new FormData(this);

    // Esegui una richiesta AJAX per inviare i dati al file PHP
    fetch('registrazione.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json()) // Converti la risposta in JSON
    .then(data => {
        if (data.success) {
            // Se la registrazione o l'accesso hanno avuto successo, nascondi il popup
            document.getElementById('registrationPopup').classList.remove('active');
            document.getElementById('mainPage').classList.remove('blur');

            // Mostra il messaggio di benvenuto o bentornato
            showMessage(data.message);
        } else {
            console.error('Errore: ' + data.message); // Logga l'errore solo nella console per debug
        }
    })
    .catch(error => {
        console.error('Errore durante l\'invio del form:', error);
    });
});

// Funzione per mostrare il messaggio personalizzato
function showMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.style.position = 'fixed';
    messageBox.style.top = '20px';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translateX(-50%)';
    messageBox.style.padding = '15px';
    messageBox.style.backgroundColor = '#28a745';
    messageBox.style.color = '#fff';
    messageBox.style.borderRadius = '20px';
    messageBox.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    messageBox.style.zIndex = '1001';
    messageBox.style.fontSize = '1.2em';
    
    document.body.appendChild(messageBox);

    // Rimuovi il messaggio dopo 3 secondi
    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}

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
function iscrizione() {
    // Reindirizza alla pagina di iscrizione
    window.location.href = 'iscriviti.html';
    console.log("porco dio");
}


// Ottieni il video e lo slider
const video = document.getElementById("videoPlayer");
const volumeRange = document.getElementById("volumeRange");

// Imposta il volume iniziale al 50%
video.volume = 0.5;
video.muted = true; // Disattiva mute se attivato


video.addEventListener("mouseenter", function() {
    video.muted = false; // Disattiva mute
    video.play(); // Riproduce il video
});



// Cambia il volume quando l'utente sposta lo slider
volumeRange.addEventListener("input", function() {
    video.volume = volumeRange.value / 100;
});


// Array con i testi che vuoi mostrare
const testi = [
    "Scegli noi per riuscire a guadagnare con i sub affitti",
    "Visita la nostra struttura",
    "Impara con i migliori esperti del settore",
    "Corsi certificati e riconosciuti"
];

// Seleziona l'elemento h2
const testoDinamico = document.getElementById("testoDinamico");

// Variabile per tracciare quale testo visualizzare
let currentIndex = 0;

// Funzione che cambia il testo ogni tot secondi
function changeText() {
    testoDinamico.classList.remove('fade-in'); // Rimuove la classe per iniziare una nuova transizione

    // Pulisce il testo esistente e prepara per la scrittura del nuovo testo
    testoDinamico.innerHTML = '';
    
    // Aggiunge il testo attuale e mostra
    const currentText = testi[currentIndex];
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < currentText.length) {
            testoDinamico.innerHTML += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50); // Velocità di digitazione
        }
    }
    
    typeText();
    
    // Aggiorna l'indice del testo
    currentIndex = (currentIndex + 1) % testi.length;

    // Aggiunge la classe per fare la transizione di opacità
    setTimeout(() => {
        testoDinamico.classList.add('fade-in');
    }, 100); // Ritardo per far partire la transizione dopo aver iniziato la scrittura del testo
}

changeText();

// Imposta un intervallo di 5 secondi (5000 ms) per cambiare il testo
setInterval(changeText, 5000);

console.log('Modifica registrata');
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("LOaSspwO70cXzFLh6"); // Sostituisci con il tuo User ID di EmailJS

    const formElement = document.getElementById('registrazioneDati'); // Trova il modulo

    if (formElement) {
        formElement.addEventListener('submit', function(event) {
            event.preventDefault(); // Impedisce l'invio tradizionale del modulo

            emailjs.sendForm('service_rkifn9z', 'template_j2l17qm', formElement)
                .then(function(response) {
                    console.log('Success:', response);
                }, function(error) {
                    console.error('Error:', error);
                });

            
            // Crea un oggetto FormData per raccogliere i dati del modulo
            var formData = new FormData(formElement);

            // Converte i dati in un formato adatto per l'invio
            var data = {
                name: formData.get('name'),
                surname: formData.get('surname'),
                email: formData.get('email'),
                phone: formData.get('phone')
            };

            fetch('https://script.google.com/macros/s/AKfycbyO17lbak3LgJsC-14cchtBFxpwVSIe9Fdeo7dS8TrUOJXJ2DswkpAnSs-6pr1CYyTNfQ/exec', {
                method: 'POST',
                mode: 'no-cors', // Aggiungi questo per evitare l'errore CORS
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                console.log("Dati inviati con successo");
            })
            .catch(error => {
                console.error("Errore durante l'invio dei dati", error);
            });

            console.log(formData.get('surname'));
                
        });
    } else {
        console.error('Modulo non trovato');
    }
});

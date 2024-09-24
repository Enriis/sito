<?php
// Configurazione del database
$servername = "localhost";
$username = "root";
$password = "";  // Lascia vuoto se non hai impostato una password per root
$dbname = "nadmiral";

// Creare connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica connessione
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connessione fallita: ' . $conn->connect_error]));
}

// Recupera dati dal form
$name = $_POST['name'];
$email = $_POST['email'];

// Verifica che i campi siano pieni
if (!empty($name) && !empty($email)) {
    // Controlla se l'email è già registrata
    $check_email_query = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $check_email_query->bind_param("s", $email);
    $check_email_query->execute();
    $result = $check_email_query->get_result();

    if ($result->num_rows > 0) {
        // Email già registrata, restituisci messaggio di bentornato
        echo json_encode(['success' => true, 'message' => 'Ciao '.$name.', chi si rivede! Bentornato.']);
    } else {
        // Se l'email non esiste, esegui la registrazione
        $stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $email); // 'ss' indica che entrambe sono stringhe

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Grazie per esserti registrato!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Errore durante la registrazione: ' . $conn->error]);
        }

        $stmt->close(); // Chiudi la query preparata
    }

    $check_email_query->close(); // Chiudi la query di verifica email
} else {
    echo json_encode(['success' => false, 'message' => 'Compila tutti i campi!']);
}

// Chiudi la connessione
$conn->close();
?>
<?php
// Connetti usando PDO
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nadmiral_academy";

error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Impostare PDO in modo che lanci eccezioni
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Messaggio di connessione riuscita
    echo '<script>console.log("Connessione al database avvenuta con successo!");</script>';

    // Verifica se i dati del form sono stati inviati
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Ottenere i dati dal form
        $name = isset($_POST['name']) ? $_POST['name'] : '';
        $email = isset($_POST['email']) ? $_POST['email'] : '';

        // Preparare e eseguire la query
        $stmt = $conn->prepare("INSERT INTO utenti (name, email) VALUES (:name, :email)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);

        // Esegui la query
        $stmt->execute();

        echo "Registrazione avvenuta con successo!";
    }
}
catch(PDOException $e) {
    echo "Errore: " . $e->getMessage();
}
$conn = null;
?>

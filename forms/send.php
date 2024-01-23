<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera los datos del formulario
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // Validar la dirección de correo electrónico
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address";
        exit;
    }

    // Destinatario del correo electrónico
    $to = "eduardonavarro.test@gmail.com";

    // Cabeceras del correo electrónico
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Contenido del correo electrónico
    $email_content = "
    <html>
    <body>
        <h2>Formulario de contacto</h2>
        <p><strong>Nombre:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Asunto:</strong> $subject</p>
        <p><strong>Mensaje:</strong> $message</p>
    </body>
    </html>
    ";

    // Enviar el correo electrónico
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Email enviado con éxito";
    } else {
        echo "Error al enviar el email";
    }
} else {
    echo "Invalid request";
}
?>
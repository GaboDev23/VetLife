<?php
if (isset($_POST['enviar'])) {
    if (!empty($_POST['nombre']) && !empty($_POST['email']) && !empty($_POST['telefono']) && !empty($_POST['mensaje'])) {
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $mensaje = $_POST['mensaje'];
        $asunto = "Contacto desde el formulario de la web";
        $msg = "Nombre: $nombre\ne-mail: $email\nTeléfono: $telefono\nMensaje: $mensaje";
        $header = "From: gabo.gh12398@gmail.com" . "\r\n";
        $header .= "Reply-To: gabo.gh12398@gmail.com" . "\r\n";
        $header .= "X-Mailer: PHP/" . phpversion();
        $mail = @mail($email, $asunto, $msg, $header);
        if ($mail) {
            echo "<h4>¡Mail enviado correctamente!</h4>";
        }
    }
}
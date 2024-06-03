<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//require '../vendor/autoload.php';
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'matejjurin278@gmail.com';

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $config = include('config.php');
    $mail->Host = $config['host']; // e.g., 'smtp.gmail.com'
    $mail->SMTPAuth = true;
    $mail->Username = $config['username']; // Your SMTP username
    $mail->Password = $config['password']; // Your SMTP password
    $mail->SMTPSecure = 'tls';
    $mail->Port = $config['port']; // e.g., 587

    // Recipients
    $mail->setFrom($config['username'], 'Your Name'); // Your email and name
    $mail->addAddress($receiving_email_address); // Send to your email

    // Content
    $mail->isHTML(true);
    $mail->Subject = $_POST['subject'];
    $mail->Body    = "Name: " . $_POST['name'] . "<br>Email: " . $_POST['email'] . "<br>Message: " . $_POST['message'];
    $mail->AltBody = "Name: " . $_POST['name'] . "\nEmail: " . $_POST['email'] . "\nMessage: " . $_POST['message'];

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>

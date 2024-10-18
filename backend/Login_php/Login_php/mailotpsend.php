<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require 'C:\xampp\htdocs\new\project1\backend\PHPMailer\src/Exception.php';
require 'C:\xampp\htdocs\new\project1\backend\PHPMailer\src/PHPMailer.php';
require 'C:\xampp\htdocs\new\project1\backend\PHPMailer\src/SMTP.php';

function sendEmail($email, $otp) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'arrunsaralan@gmail.com';
        $mail->Password = 'zwdvbknxqxtytcem';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('no-reply@yourdomain.com', 'Your App Name');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Your OTP Code';
        $mail->Body = 'Your OTP code is: ' . $otp;
        $mail->AltBody = 'Your OTP code is: ' . $otp;

        $mail->send();
        return true; // Email sent successfully
    } catch (Exception $e) {
        return $e->getMessage(); // Failed to send email, return the error message
    }
}
?>

<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$to_email = "adhithyanr8686@gmail.com";
$from_email = "noreply@yourdomain.com"; // Change to your domain email
$email_subject = "New Contact Form Submission - Cyber Portal";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
        exit;
    }

    $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
    $message = filter_var($data['message'], FILTER_SANITIZE_STRING);

    if (!$email) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        exit;
    }

    $email_body = "New contact form submission from the Cyber Portal:\n\n" .
        "Name: $name\n" .
        "Email: $email\n" .
        "Message: $message\n\n" .
        "Sent from: " . $_SERVER['HTTP_HOST'] . "\n" .
        "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n" .
        "Time: " . date('Y-m-d H:i:s') . "\n";

    $headers = "From: $from_email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to_email, $email_subject, $email_body, $headers)) {
        http_response_code(200);
        echo json_encode(['success' => 'Message sent successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send message']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>

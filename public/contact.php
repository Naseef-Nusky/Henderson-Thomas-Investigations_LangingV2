<?php
// Simple contact form handler for FastHosts (PHP mail)
// Expects POST: name, mobile, email, message (optional)

header('Content-Type: application/json; charset=utf-8');

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

// Basic sanitization
function field($key) {
  return isset($_POST[$key]) ? trim((string)$_POST[$key]) : '';
}

$name = field('name');
$mobile = field('mobile');
$email = field('email');
$message = field('message');
$source = field('source');
$investigationType = field('investigationType');
$timing = field('timing');

// Validation
if ($name === '' || $mobile === '' || $email === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid email']);
  exit;
}

// Compose email
$to = 'hendersonthomasinvestigations@outlook.com';
$subject = 'New Website Contact Request';
$body = "New contact request from Henderson Thomas Investigations website\n\n"
      . "Name: $name\n"
      . "Mobile: $mobile\n"
      . "Email: $email\n"
      . ($source !== '' ? "Source: $source\n" : '')
      . ($investigationType !== '' ? "Investigation Type: $investigationType\n" : '')
      . ($timing !== '' ? "Timing: $timing\n" : '')
      . "Message: " . ($message !== '' ? $message : '(no message)') . "\n";

// Email headers
$headers = [];
$headers[] = 'From: noreply@' . ($_SERVER['HTTP_HOST'] ?? 'website');
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Failed to send email']);
}



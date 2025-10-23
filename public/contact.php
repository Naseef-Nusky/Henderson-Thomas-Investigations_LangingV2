<?php
// Simple contact form handler for FastHosts (PHP mail)
// Expects POST: name, mobile, email, message (optional)

header('Content-Type: application/json; charset=utf-8');

// Basic server-side logging (writes to public/mail.log)
$__MAIL_LOG = __DIR__ . '/mail.log';
function log_line($message) {
  global $__MAIL_LOG;
  $line = '[' . date('Y-m-d H:i:s') . '] ' . $message . "\n";
  @file_put_contents($__MAIL_LOG, $line, FILE_APPEND);
}

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

// Log request meta (no PII beyond email domain)
log_line('Incoming request from IP=' . ($_SERVER['REMOTE_ADDR'] ?? 'n/a') . ', UA=' . substr(($_SERVER['HTTP_USER_AGENT'] ?? 'n/a'), 0, 160));
log_line('Source=' . ($source ?: 'n/a') . ', InvestigationType=' . ($investigationType ?: 'n/a') . ', Timing=' . ($timing ?: 'n/a'));

// Compose email
// Send to both the primary and the alternate Outlook inboxes
$recipients = [
  'hendersonthomasinvestigations@outlook.com',
  'naseefnusky09@gmail.com'
];
$subject = 'New Website Contact Request - Henderson Thomas Investigations';

// Create HTML email body for better compatibility
$body_html = "
<html>
<head>
    <meta charset='UTF-8'>
    <title>New Contact Request</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
    <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
        <h2 style='color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;'>New Contact Request</h2>
        
        <div style='background: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;'>
            <h3 style='margin-top: 0; color: #1e40af;'>Contact Information</h3>
            <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
            <p><strong>Mobile:</strong> " . htmlspecialchars($mobile) . "</p>
            <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        </div>
        
        <div style='background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0;'>
            <h3 style='margin-top: 0; color: #1e40af;'>Request Details</h3>
            " . ($source !== '' ? "<p><strong>Source:</strong> " . htmlspecialchars($source) . "</p>" : '') . "
            " . ($investigationType !== '' ? "<p><strong>Investigation Type:</strong> " . htmlspecialchars($investigationType) . "</p>" : '') . "
            " . ($timing !== '' ? "<p><strong>Timing:</strong> " . htmlspecialchars($timing) . "</p>" : '') . "
        </div>
        
        " . ($message !== '' ? "
        <div style='background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0;'>
            <h3 style='margin-top: 0; color: #92400e;'>Message</h3>
            <p style='white-space: pre-wrap;'>" . htmlspecialchars($message) . "</p>
        </div>
        " : '') . "
        
        <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;'>
            <p>This email was sent from the Henderson Thomas Investigations website contact form.</p>
            <p>Timestamp: " . date('Y-m-d H:i:s') . "</p>
        </div>
    </div>
</body>
</html>";

// Plain text version for email clients that don't support HTML
$body_text = "New contact request from Henderson Thomas Investigations website\n\n"
      . "Name: $name\n"
      . "Mobile: $mobile\n"
      . "Email: $email\n"
      . ($source !== '' ? "Source: $source\n" : '')
      . ($investigationType !== '' ? "Investigation Type: $investigationType\n" : '')
      . ($timing !== '' ? "Timing: $timing\n" : '')
      . "Message: " . ($message !== '' ? $message : '(no message)') . "\n"
      . "\nTimestamp: " . date('Y-m-d H:i:s');

// Create multipart email with both HTML and text versions
$boundary = md5(uniqid(time()));
$body = "--$boundary\r\n"
      . "Content-Type: text/plain; charset=UTF-8\r\n"
      . "Content-Transfer-Encoding: 7bit\r\n\r\n"
      . $body_text . "\r\n\r\n"
      . "--$boundary\r\n"
      . "Content-Type: text/html; charset=UTF-8\r\n"
      . "Content-Transfer-Encoding: 7bit\r\n\r\n"
      . $body_html . "\r\n\r\n"
      . "--$boundary--";

// Enhanced email headers for better delivery
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
$headers[] = 'From: Henderson Thomas Investigations <Website@hendersonthomasinvestigations.co.uk>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Return-Path: Website@hendersonthomasinvestigations.co.uk';
$headers[] = 'Sender: Website@hendersonthomasinvestigations.co.uk';
$headers[] = 'Date: ' . date(DATE_RFC2822);
$headers[] = 'Message-ID: <' . time() . '.' . md5(uniqid(mt_rand(), true)) . '@hendersonthomasinvestigations.co.uk>';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'X-Priority: 3';
$headers[] = 'X-MSMail-Priority: Normal';
$headers[] = 'Importance: Normal';

// Try SMTP first, then fall back to regular mail() for each recipient
$anySent = false;
include_once 'smtp_mail.php';
log_line('Attempting send to recipients: ' . implode(', ', $recipients));
foreach ($recipients as $rcpt) {
  $sent = sendSMTPMail($rcpt, $subject, $body_html, 'Website@hendersonthomasinvestigations.co.uk', 'Henderson Thomas Investigations', $email);
  log_line('SMTP to ' . $rcpt . ' => ' . ($sent ? 'OK' : 'FAIL'));
  if (!$sent) {
    // Use envelope sender for better deliverability (-f)
    $sent = @mail($rcpt, $subject, $body, implode("\r\n", $headers), '-f Website@hendersonthomasinvestigations.co.uk');
    $err = error_get_last();
    log_line('mail() to ' . $rcpt . ' => ' . ($sent ? 'OK' : 'FAIL') . ' err=' . ($err ? json_encode($err) : 'none'));
  }
  if ($sent) { $anySent = true; }
}

if ($anySent) {
  log_line('Send result: SUCCESS');
  echo json_encode(['ok' => true]);
} else {
  log_line('Send result: FAILED');
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Failed to send email']);
}



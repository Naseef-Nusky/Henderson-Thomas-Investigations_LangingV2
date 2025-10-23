<?php
// Simple SMTP mail function for Henderson Thomas Investigations
// Uses the provided SMTP credentials

function sendSMTPMail($to, $subject, $body, $from_email, $from_name, $reply_to = '') {
    // Try common SMTP hosts for the domain
    $smtp_hosts = [
        'smtp.hendersonthomasinvestigations.co.uk',
        'mail.hendersonthomasinvestigations.co.uk',
        'smtp.outlook.com', // Fallback to Outlook SMTP
        'smtp.office365.com' // Alternative Outlook SMTP
    ];
    
    $smtp_port = 587;
    $smtp_username = 'Website@hendersonthomasinvestigations.co.uk';
    $smtp_password = 'ProjectX2025';
    
    foreach ($smtp_hosts as $smtp_host) {
        // Create socket connection
        $socket = fsockopen($smtp_host, $smtp_port, $errno, $errstr, 30);
        if (!$socket) {
            continue; // Try next host
        }
        
        // Read initial response
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) != '220') {
            fclose($socket);
            continue; // Try next host
        }
        
        // Send EHLO command
        fputs($socket, "EHLO hendersonthomasinvestigations.co.uk\r\n");
        $response = fgets($socket, 512);
        
        // Start TLS
        fputs($socket, "STARTTLS\r\n");
        $response = fgets($socket, 512);
        
        // Upgrade to TLS
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            continue; // Try next host
        }
        
        // Send EHLO again after TLS
        fputs($socket, "EHLO hendersonthomasinvestigations.co.uk\r\n");
        $response = fgets($socket, 512);
        
        // Authenticate
        fputs($socket, "AUTH LOGIN\r\n");
        $response = fgets($socket, 512);
        
        fputs($socket, base64_encode($smtp_username) . "\r\n");
        $response = fgets($socket, 512);
        
        fputs($socket, base64_encode($smtp_password) . "\r\n");
        $response = fgets($socket, 512);
        
        if (substr($response, 0, 3) != '235') {
            fclose($socket);
            continue; // Try next host
        }
        
        // Send MAIL FROM
        fputs($socket, "MAIL FROM: <$from_email>\r\n");
        $response = fgets($socket, 512);
        
        // Send RCPT TO
        fputs($socket, "RCPT TO: <$to>\r\n");
        $response = fgets($socket, 512);
        
        // Send DATA
        fputs($socket, "DATA\r\n");
        $response = fgets($socket, 512);
        
        // Send email headers and body
        $email_data = "From: $from_name <$from_email>\r\n";
        $email_data .= "To: $to\r\n";
        $email_data .= "Subject: $subject\r\n";
        $email_data .= "MIME-Version: 1.0\r\n";
        $email_data .= "Content-Type: text/html; charset=UTF-8\r\n";
        if ($reply_to) {
            $email_data .= "Reply-To: $reply_to\r\n";
        }
        $email_data .= "\r\n";
        $email_data .= $body;
        $email_data .= "\r\n.\r\n";
        
        fputs($socket, $email_data);
        $response = fgets($socket, 512);
        
        // Quit
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        
        // If we get here, email was sent successfully
        if (substr($response, 0, 3) == '250') {
            return true;
        }
    }
    
    // If we get here, all SMTP hosts failed
    return false;
}
?>

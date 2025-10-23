<?php
// Simple SMTP mail function for Henderson Thomas Investigations
// Uses the provided SMTP credentials

function sendSMTPMail($to, $subject, $body, $from_email, $from_name, $reply_to = '') {
    $logFile = __DIR__ . '/mail.log';
    $log = function($msg) use ($logFile) { @file_put_contents($logFile, '['.date('Y-m-d H:i:s').'] '.$msg."\n", FILE_APPEND); };
    // Try common SMTP hosts for the domain
    $smtp_hosts = [
        'smtp.hendersonthomasinvestigations.co.uk',
        'mail.hendersonthomasinvestigations.co.uk',
        'smtp-mail.outlook.com', // Outlook SMTP
        'smtp.office365.com' // Alternative Outlook SMTP
    ];
    
    $smtp_ports = [587, 25, 465];
    $smtp_username = 'Website@hendersonthomasinvestigations.co.uk';
    $smtp_password = 'ProjectX2025';
    
    foreach ($smtp_hosts as $smtp_host) {
      foreach ($smtp_ports as $smtp_port) {
        $log("Trying SMTP host=$smtp_host port=$smtp_port to=$to");
        $transport = ($smtp_port === 465) ? 'ssl://' . $smtp_host : $smtp_host;
        $socket = @fsockopen($transport, $smtp_port, $errno, $errstr, 15);
        if (!$socket) {
            $log("Connect fail host=$smtp_host port=$smtp_port errno=$errno err=$errstr");
            continue;
        }
        
        // Read initial response
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) != '220') {
            $log("Banner unexpected: " . trim($response));
            fclose($socket);
            continue;
        }
        
        // Send EHLO command
        fputs($socket, "EHLO hendersonthomasinvestigations.co.uk\r\n");
        $response = fgets($socket, 512);
        
        // STARTTLS for non-implicit TLS ports
        if ($smtp_port !== 465) {
          fputs($socket, "STARTTLS\r\n");
          $response = fgets($socket, 512);
          if (substr($response, 0, 3) != '220') {
            $log("STARTTLS not accepted: " . trim($response));
            fclose($socket);
            continue;
          }
          if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            $log("TLS negotiation failed");
            fclose($socket);
            continue;
          }
          // Send EHLO again after TLS
          fputs($socket, "EHLO hendersonthomasinvestigations.co.uk\r\n");
          $response = fgets($socket, 512);
        }
        
        // Authenticate
        fputs($socket, "AUTH LOGIN\r\n");
        $response = fgets($socket, 512);
        
        fputs($socket, base64_encode($smtp_username) . "\r\n");
        $response = fgets($socket, 512);
        
        fputs($socket, base64_encode($smtp_password) . "\r\n");
        $response = fgets($socket, 512);
        
        if (substr($response, 0, 3) != '235') {
            $log("AUTH failed: " . trim($response));
            fclose($socket);
            continue;
        }
        
        // Send MAIL FROM
        fputs($socket, "MAIL FROM: <$from_email>\r\n");
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) != '250') { $log("MAIL FROM rejected: ".trim($response)); }
        
        // Send RCPT TO
        fputs($socket, "RCPT TO: <$to>\r\n");
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) != '250' && substr($response,0,3) != '251') { $log("RCPT TO rejected: ".trim($response)); }
        
        // Send DATA
        fputs($socket, "DATA\r\n");
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) != '354') { $log("DATA not accepted: ".trim($response)); }
        
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
        $log("DATA result: " . trim($response));
        
        // Quit
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        
        // If we get here, email was sent successfully
        if (substr($response, 0, 3) == '250') {
            $log("SMTP delivered via host=$smtp_host port=$smtp_port");
            return true;
        }
      }
    }
    
    // If we get here, all SMTP hosts failed
    $log("All SMTP attempts failed for to=$to");
    return false;
}
?>

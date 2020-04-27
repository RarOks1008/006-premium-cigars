<?php
    session_start();
    include "connection.php";
    if ($_POST['button_click']) {
        if ($_SESSION["user"]) {
            $user_mail = $_SESSION["user"] -> Email;
            $subject = $_POST['subject'];
            $message = $_POST['message'];
            if ($subject) {
                if($message) {
                    $to      = 'nikola.nini@gmail.com';
                    $header = 'From: ' . $user_mail;
                    $success = mail($to, $subject, $message, $header);
                    if (!$success) {
                        header("HTTP/1.0 200 OK");
                        $return = array('doing' => 'Message sending failed.', 'contacted' => false);
                        echo json_encode($return);
                    } else {
                        header("HTTP/1.0 200 OK");
                        $return = array('doing' => 'Succesfully sent a message.', 'contacted' => true);
                        echo json_encode($return);
                    }
                } else {
                    header("HTTP/1.0 200 OK");
                    $return = array('doing' => 'You can not send an empty message.', 'contacted' => false);
                    echo json_encode($return);
                }
            } else {
                header("HTTP/1.0 200 OK");
                $return = array('doing' => 'Subject can not be left empty.', 'contacted' => false);
                echo json_encode($return);
            }
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('doing' => 'You must be logged in to send a message.', 'contacted' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('doing' => 'Must contact by form', 'contacted' => false);
        echo json_encode($return);
    }
?>

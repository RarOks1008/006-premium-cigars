<?php
    session_start();
    include "connection.php";
    $user_id = $_SESSION["user"] -> ID;
    $user_rights_id = $_SESSION['user_rights_id'];
    $upit = "SELECT * FROM voting WHERE user_id=:user_id";
    $priprema = $connection -> prepare($upit);
    $priprema -> bindParam(":user_id", $user_id);
    $rezultat = $priprema -> execute();
    if ($user_rights_id != 3) {
        if ($rezultat) {
            if ($priprema -> rowCount() == 0) {
                header("HTTP/1.0 200 OK");
                $return = array('message' => 'OK', 'got' => true);
                echo json_encode($return);
            } else {
                header("HTTP/1.0 200 OK");
                $return = array('message' => 'You have already voted in this survey.', 'got' => false);
                echo json_encode($return);
            }
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('message' => 'Server error', 'got' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('message' => 'Minors are not allegible to vote.', 'got' => false);
        echo json_encode($return);
    }

    function stripslashesFull($input) {
        if (is_array($input)) {
            $input = array_map('stripslashesFull', $input);
        } elseif (is_object($input)) {
            $vars = get_object_vars($input);
            foreach ($vars as $k=>$v) {
                $input->{$k} = stripslashesFull($v);
            }
        } else {
            $input = stripslashes($input);
        }
        return $input;
    }
?>

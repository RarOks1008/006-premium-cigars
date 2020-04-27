<?php
    session_start();
    include "connection.php";
    if ($_POST['button_click']) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $username = strtolower($username);
        $user_pat = "/^([A-Z]|[a-z]|[0-9])+$/";
        if (preg_match($user_pat, $username)) {
            $username = addslashes($username);
            $password = addslashes($password);
            $upit = "SELECT * FROM users WHERE username=:username AND password=:password";
            $priprema = $connection -> prepare($upit);
            $priprema -> bindParam(":username", $username);
            $priprema -> bindParam(":password", $password);
            $rezultat = $priprema -> execute();
            if ($rezultat) {
                if ($priprema -> rowCount() == 1) {
                    $user = $priprema -> Fetch();
                    $user = stripslashesFull($user);
                    $_SESSION["user_rights_id"] = $user -> Rights_ID;
                    $_SESSION["user"] = $user;
                    if($_SESSION["user_rights_id"] == 1) {
                        header("HTTP/1.0 200 OK");
                        $return = array('doing' => 'views/admin.php', 'logged' => true);
                        echo json_encode($return);
                    } else {
                        header("HTTP/1.0 200 OK");
                        $return = array('doing' => 'views/main.php', 'logged' => true);
                        echo json_encode($return);
                    }
                } else if($priprema -> rowCount() == 0) {
                    header("HTTP/1.0 200 OK");
                    $return = array('doing' => 'Wrong params', 'logged' => false);
                    echo json_encode($return);
                } else if ($priprema -> rowCount() > 1) {
                    header("HTTP/1.0 200 OK");
                    $return = array('doing' => 'Database error', 'logged' => false);
                    echo json_encode($return);
                }
            } else {
                header("HTTP/1.0 200 OK");
                $return = array('doing' => 'Wrong params', 'logged' => false);
                echo json_encode($return);
            }
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('doing' => 'Username must only contain letters and numbers', 'logged' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('doing' => 'Must login by form', 'logged' => false);
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

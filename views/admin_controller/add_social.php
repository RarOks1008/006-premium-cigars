<?php
    session_start();
    include "../connection.php";
    if ($_POST['button_click']) {
        $class = $_POST['class'];
        $link = $_POST['link'];
        $class = addslashes($class);
        $upit = "INSERT INTO socials (link, class) VALUES (:link, :class)";
        $priprema = $connection -> prepare($upit);
        $priprema -> bindParam(":link", $link);
        $priprema -> bindParam(":class", $class);
        $rezultat = $priprema -> execute();
        if ($rezultat) {
            header("HTTP/1.0 201 Created");
            $return = array('added' => 'OK', 'done' => true);
            echo json_encode($return);
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('added' => 'Database error', 'done' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('added' => 'Must register by form', 'done' => false);
        echo json_encode($return);
    }
?>

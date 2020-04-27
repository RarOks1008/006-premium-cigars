<?php
    session_start();
    include "../connection.php";
    if ($_POST['button_click']) {
        $title = $_POST['title'];
        $link = $_POST['link'];
        $title = addslashes($title);
        $link = addslashes($link);
        $upit = "INSERT INTO navigation (link, title) VALUES (:link, :title)";
        $priprema = $connection -> prepare($upit);
        $priprema -> bindParam(":link", $link);
        $priprema -> bindParam(":title", $title);
        $rezultat = $priprema -> execute();
        if ($rezultat) {
            header("HTTP/1.0 200 OK");
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

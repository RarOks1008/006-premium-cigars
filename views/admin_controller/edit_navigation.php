<?php
    session_start();
    include "../connection.php";
    if ($_POST['button_click']) {
        $title = $_POST['title'];
        $link = $_POST['link'];
        $id = $_POST['id'];
        $title = addslashes($title);
        $link = addslashes($link);
        $upit = "UPDATE navigation SET title = :title, link = :link WHERE ID = :id";
        $priprema = $connection -> prepare($upit);
        $priprema -> bindParam(":link", $link);
        $priprema -> bindParam(":title", $title);
        $priprema -> bindParam(":id", $id);
        $rezultat = $priprema -> execute();
        if ($rezultat) {
            header("HTTP/1.0 202 Accepted");
            $return = array('changed' => 'OK', 'done' => true);
            echo json_encode($return);
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('changed' => 'Database error', 'done' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('changed' => 'Must register by form', 'done' => false);
        echo json_encode($return);
    }
?>

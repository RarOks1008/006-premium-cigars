<?php
    session_start();
    include "../connection.php";
    if ($_POST['button_click']) {
        $id = $_POST['id'];
        $upit = "SELECT * FROM socials WHERE ID = :id";
        $priprema = $connection -> prepare($upit);
        $priprema -> bindParam(":id", $id);
        $rezultat = $priprema -> execute();
        if ($rezultat) {
            if ($priprema -> rowCount() == 1) {
                $social = $priprema -> Fetch();
                header("HTTP/1.0 200 OK");
                $return = array('got' => $social, 'done' => true);
                echo json_encode($return);
            } else {
                header("HTTP/1.0 200 OK");
                $return = array('got' => 'Database error', 'done' => false);
                echo json_encode($return);
            }
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('got' => 'Database error', 'done' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('got' => 'Must get by form', 'done' => false);
        echo json_encode($return);
    }
?>

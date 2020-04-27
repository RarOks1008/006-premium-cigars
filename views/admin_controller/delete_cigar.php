<?php
    session_start();
    include "../connection.php";
    if ($_POST['button_click']) {
        $cigar = $_POST['cigar'];
        $upit = "DELETE FROM cigars WHERE ID = :cigar";
        $priprema = $connection -> prepare($upit);
        $priprema -> bindParam(":cigar", $cigar);
        $rezultat = $priprema -> execute();
        if ($rezultat) {
            header("HTTP/1.0 202 Accepted");
            $return = array('deleted' => 'OK', 'done' => true);
            echo json_encode($return);
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('deleted' => 'Database error', 'done' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('deleted' => 'Must register by form', 'done' => false);
        echo json_encode($return);
    }
?>

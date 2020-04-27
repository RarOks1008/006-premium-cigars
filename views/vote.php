<?php
    session_start();
    include "connection.php";
    if ($_POST['button_click']) {
        $cigar = $_POST['cigar'];
        $reccomend = $_POST['reccomend'];
        $user_id = $_SESSION['user'] -> ID;
        $upit_user_provera = "SELECT * FROM voting WHERE user_id=:user_id";
        $priprema_user_provera = $connection -> prepare($upit_user_provera);
        $priprema_user_provera -> bindParam(":user_id", $user_id);
        $rezultat_user_provera = $priprema_user_provera -> execute();
        if ($rezultat_user_provera) {
            if ($priprema_user_provera -> rowCount() == 0) {
                $cigar = addslashes($cigar);
                $reccomend = addslashes($reccomend);
                $upit = "INSERT INTO voting (user_id, cigar, reccomend) VALUES (:user_id, :cigar, :reccomend)";
                $priprema = $connection -> prepare($upit);
                $priprema -> bindParam(":user_id", $user_id);
                $priprema -> bindParam(":cigar", $cigar);
                $priprema -> bindParam(":reccomend", $reccomend);
                $rezultat = $priprema -> execute();
                if ($rezultat) {
                    header("HTTP/1.0 200 OK");
                    $return = array('voting' => 'Voted succesfully', 'done' => true);
                    echo json_encode($return);
                } else {
                    header("HTTP/1.0 200 OK");
                    $return = array('voting' => 'Database error', 'done' => false);
                    echo json_encode($return);
                }
            } else if($priprema_user_provera -> rowCount() == 1) {
                header("HTTP/1.0 200 OK");
                $return = array('voting' => 'User with this username exists.', 'done' => false);
                echo json_encode($return);
            } else if ($priprema_user_provera -> rowCount() > 1) {
                header("HTTP/1.0 200 OK");
                $return = array('voting' => 'Database error', 'done' => false);
                echo json_encode($return);
            }
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('voting' => 'Database error', 'done' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('voting' => 'Must register by form', 'done' => false);
        echo json_encode($return);
    }
?>

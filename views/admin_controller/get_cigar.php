<?php
    session_start();
    include "../connection.php";
    if ($_POST['button_click']) {
        $id = $_POST['id'];
        $upit = "SELECT * FROM cigars WHERE ID = :id";
        $priprema = $connection -> prepare($upit);
        $priprema -> bindParam(":id", $id);
        $rezultat = $priprema -> execute();
        if ($rezultat) {
            if ($priprema -> rowCount() == 1) {
                $cigar = $priprema -> Fetch();
                $cigar = stripslashesFull($cigar);
                header("HTTP/1.0 200 OK");
                $return = array('got' => $cigar, 'done' => true);
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

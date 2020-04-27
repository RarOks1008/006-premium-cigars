<?php
    include "connection.php";
    $upit = "SELECT title FROM cigars";
    $priprema = $connection -> prepare($upit);
    $rezultat = $priprema -> execute();
    if ($rezultat) {
        if ($priprema -> rowCount() > 0) {
            $cigare_names = $priprema -> FetchAll();
            $cigare_names = stripslashesFull($cigare_names);
            header("HTTP/1.0 200 OK");
            $return = array('cigar_names' => $cigare_names, 'done' => true);
            echo json_encode($return);
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('cigar_names' => 'Server error', 'done' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('cigar_names' => 'Error fetching data', 'done' => false);
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

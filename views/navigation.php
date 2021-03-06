<?php
    include "connection.php";
    $upit = "SELECT * FROM navigation";
    $priprema = $connection -> prepare($upit);
    $rezultat = $priprema -> execute();

    if ($rezultat) {
        if ($priprema -> rowCount() > 0) {
            $links = $priprema -> FetchAll();
            $links = stripslashesFull($links);
            header("HTTP/1.0 200 OK");
            $return = array('navigation' => $links, 'done' => true);
            echo json_encode($return);
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('navigation' => 'Server error', 'done' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('navigation' => 'Error fetching data', 'done' => false);
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

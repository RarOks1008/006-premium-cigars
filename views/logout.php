<?php
    session_start();
    if(isset($_SESSION['user'])) {
        unset($_SESSION['user']);
        unset($_SESSION['user_rights_id']);
        session_destroy();
    }
    echo true;
?>

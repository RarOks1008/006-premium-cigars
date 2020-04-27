<?php
    session_start();
    include "../connection.php";
    if ($_POST['button_click']) {
        $username = $_POST['username'];
        $username = strtolower($username);
        $password = $_POST['password'];
        $email = $_POST['email'];
        $date = $_POST['date'];
        $user_pat = "/^([A-Z]|[a-z]|[0-9])+$/";
        $email_pat = "/^(\w|\d)\S*@\S+\.(\w|\d){2,}$/";
        $date = date('Y-m-d', strtotime(str_replace('-', '/', $date)));
        $date_parsed = date_parse($date);
        $date_born = mktime(0, 0, 0, $date_parsed["month"], $date_parsed["day"], $date_parsed["year"]);
        if (preg_match($user_pat, $username)) {
            if (preg_match($email_pat, $email)) {
                if ((time() - $date_born) > 0) {
                    $username = addslashes($username);
                    $upit_username_provera = "SELECT * FROM users WHERE username=:username";
                    $priprema_username_provera = $connection -> prepare($upit_username_provera);
                    $priprema_username_provera -> bindParam(":username", $username);
                    $rezultat_username_provera = $priprema_username_provera -> execute();
                    if ($rezultat_username_provera) {
                        if ($priprema_username_provera -> rowCount() == 0) {
                            $email = addslashes($email);
                            $upit_mail_provera = "SELECT * FROM users WHERE email=:email";
                            $priprema_mail_provera = $connection -> prepare($upit_mail_provera);
                            $priprema_mail_provera -> bindParam(":email", $email);
                            $rezultat_mail_provera = $priprema_mail_provera -> execute();
                            if ($rezultat_mail_provera) {
                                if ($priprema_mail_provera -> rowCount() == 0) {
                                    $password = addslashes($password);
                                    $upit = "INSERT INTO users (username, password, email, dateofbirth, rights_id) VALUES (:username, :password, :email, :dateofbirth, :rights_id)";
                                    $priprema = $connection -> prepare($upit);
                                    $priprema -> bindParam(":username", $username);
                                    $priprema -> bindParam(":password", $password);
                                    $priprema -> bindParam(":email", $email);
                                    $priprema -> bindParam(":dateofbirth", $date);
                                    if ((time() - $date_born) > 567993600) {
                                        $rights_id = 2;
                                    } else {
                                        $rights_id = 3;
                                    }
                                    $priprema -> bindParam(":rights_id", $rights_id);
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
                                } else if($priprema_mail_provera -> rowCount() == 1) {
                                    header("HTTP/1.0 200 OK");
                                    $return = array('added' => 'User with this email exists.', 'done' => false);
                                    echo json_encode($return);
                                } else if ($priprema_mail_provera -> rowCount() > 1) {
                                    header("HTTP/1.0 200 OK");
                                    $return = array('added' => 'Database error', 'done' => false);
                                    echo json_encode($return);
                                }
                            } else {
                                header("HTTP/1.0 200 OK");
                                $return = array('added' => 'Database error', 'done' => false);
                                echo json_encode($return);
                            }
                        } else if($priprema_username_provera -> rowCount() == 1) {
                            header("HTTP/1.0 200 OK");
                            $return = array('added' => 'User with this username exists.', 'done' => false);
                            echo json_encode($return);
                        } else if ($priprema_username_provera -> rowCount() > 1) {
                            header("HTTP/1.0 200 OK");
                            $return = array('added' => 'Database error', 'done' => false);
                            echo json_encode($return);
                        }
                    } else {
                        header("HTTP/1.0 200 OK");
                        $return = array('added' => 'Database error', 'done' => false);
                        echo json_encode($return);
                    }
                } else {
                    header("HTTP/1.0 200 OK");
                    $return = array('added' => 'Date of birth can not be bigger than current date', 'done' => false);
                    echo json_encode($return);
                }
            } else {
                header("HTTP/1.0 200 OK");
                $return = array('added' => 'Wrong email format', 'done' => false);
                echo json_encode($return);
            }
        } else {
            header("HTTP/1.0 200 OK");
            $return = array('added' => 'Username must only contain letters and numbers', 'done' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 200 OK");
        $return = array('added' => 'Must register by form', 'done' => false);
        echo json_encode($return);
    }
?>

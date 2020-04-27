<?php
    session_start();
    include "../connection.php";
    if ($_POST['button_click']) {
        $username = $_POST['username'];
        $username = strtolower($username);
        $password = $_POST['password'];
        $email = $_POST['email'];
        $date = $_POST['date'];
        $id = $_POST['id'];
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
                        if (($priprema_username_provera -> rowCount() == 0) || ($priprema_username_provera -> rowCount() == 1)) {
                            if ($priprema_username_provera -> rowCount() == 1) {
                                $username_provera = $priprema_username_provera -> Fetch();
                                $username_provera = stripslashesFull($username_provera);
                                if ($username_provera -> ID == $id) {
                                    $email = addslashes($email);
                                    $upit_mail_provera = "SELECT * FROM users WHERE email=:email";
                                    $priprema_mail_provera = $connection -> prepare($upit_mail_provera);
                                    $priprema_mail_provera -> bindParam(":email", $email);
                                    $rezultat_mail_provera = $priprema_mail_provera -> execute();
                                    if ($rezultat_mail_provera) {
                                        if (($priprema_mail_provera -> rowCount() == 0) || ($priprema_mail_provera -> rowCount() == 1)) {
                                            if ($priprema_mail_provera -> rowCount() == 1) {
                                                $mail_provera = $priprema_mail_provera -> Fetch();
                                                $mail_provera = stripslashesFull($mail_provera);
                                                if ($mail_provera -> ID == $id) {
                                                    $password = addslashes($password);
                                                    $upit = "UPDATE users SET Username = :username, Password = :password, Email = :email, DateOfBirth = :datee, Rights_ID = :rights_id WHERE ID = :id";
                                                    $priprema = $connection -> prepare($upit);
                                                    $priprema -> bindParam(":username", $username);
                                                    $priprema -> bindParam(":password", $password);
                                                    $priprema -> bindParam(":email", $email);
                                                    $priprema -> bindParam(":datee", $date);
                                                    if ((time() - $date_born) > 567993600) {
                                                        $rights_id = 2;
                                                    } else {
                                                        $rights_id = 3;
                                                    }
                                                    $priprema -> bindParam(":rights_id", $rights_id);
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
                                                    header("HTTP/1.0 202 Accepted");
                                                    $return = array('changed' => 'User with this email exists.', 'done' => false);
                                                    echo json_encode($return);
                                                }
                                            } else {
                                                $password = addslashes($password);
                                                $upit = "UPDATE users SET Username = :username, Password = :password, Email = :email, DateOfBirth = :dateofbirth, Rights_ID = :rights_id WHERE ID = :id";
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
                                                    header("HTTP/1.0 202 Accepted");
                                                    $return = array('changed' => 'OK', 'done' => true);
                                                    echo json_encode($return);
                                                } else {
                                                    header("HTTP/1.0 200 OK");
                                                    $return = array('changed' => 'Database error', 'done' => false);
                                                    echo json_encode($return);
                                                }
                                            }
                                        } else {
                                            header("HTTP/1.0 200 OK");
                                            $return = array('changed' => 'Database error', 'done' => false);
                                            echo json_encode($return);
                                        }
                                    } else {
                                        header("HTTP/1.0 200 OK");
                                        $return = array('changed' => 'Database error', 'done' => false);
                                        echo json_encode($return);
                                    }
                                } else {
                                    header("HTTP/1.0 202 Accepted");
                                    $return = array('changed' => 'User with this username exists.', 'done' => false);
                                    echo json_encode($return);
                                }
                            } else {
                                $email = addslashes($email);
                                $upit_mail_provera = "SELECT * FROM users WHERE email=:email";
                                $priprema_mail_provera = $connection -> prepare($upit_mail_provera);
                                $priprema_mail_provera -> bindParam(":email", $email);
                                $rezultat_mail_provera = $priprema_mail_provera -> execute();
                                if ($rezultat_mail_provera) {
                                    if (($priprema_mail_provera -> rowCount() == 0) || ($priprema_mail_provera -> rowCount() == 1)) {
                                        if ($priprema_mail_provera -> rowCount() == 1) {
                                            $mail_provera = $priprema_mail_provera -> Fetch();
                                            $mail_provera = stripslashesFull($mail_provera);
                                            if ($mail_provera -> ID == $id) {
                                                $password = addslashes($password);
                                                $upit = "UPDATE users SET Username = :username, Password = :password, Email = :email, DateOfBirth = :dateofbirth, Rights_ID = :rights_id WHERE ID = :id";
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
                                                    header("HTTP/1.0 202 Accepted");
                                                    $return = array('changed' => 'OK', 'done' => true);
                                                    echo json_encode($return);
                                                } else {
                                                    header("HTTP/1.0 200 OK");
                                                    $return = array('changed' => 'Database error', 'done' => false);
                                                    echo json_encode($return);
                                                }
                                            } else {
                                                header("HTTP/1.0 202 Accepted");
                                                $return = array('changed' => 'User with this email exists.', 'done' => false);
                                                echo json_encode($return);
                                            }
                                        } else {
                                            $password = addslashes($password);
                                            $upit = "UPDATE users SET Username = :username, Password = :password, Email = :email, DateOfBirth = :dateofbirth, Rights_ID = :rights_id WHERE ID = :id";
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
                                                header("HTTP/1.0 202 Accepted");
                                                $return = array('changed' => 'OK', 'done' => true);
                                                echo json_encode($return);
                                            } else {
                                                header("HTTP/1.0 200 OK");
                                                $return = array('changed' => 'Database error', 'done' => false);
                                                echo json_encode($return);
                                            }
                                        }
                                    } else {
                                        header("HTTP/1.0 200 OK");
                                        $return = array('changed' => 'Database error', 'done' => false);
                                        echo json_encode($return);
                                    }
                                } else {
                                    header("HTTP/1.0 200 OK");
                                    $return = array('changed' => 'Database error', 'done' => false);
                                    echo json_encode($return);
                                }
                            }
                        } else {
                            header("HTTP/1.0 200 OK");
                            $return = array('changed' => 'Database error', 'done' => false);
                            echo json_encode($return);
                        }
                    } else {
                        header("HTTP/1.0 200 OK");
                        $return = array('changed' => 'Database error', 'done' => false);
                        echo json_encode($return);
                    }
                } else {
                    header("HTTP/1.0 202 Accepted");
                    $return = array('changed' => 'Date of birth can not be bigger than current date', 'done' => false);
                    echo json_encode($return);
                }
            } else {
                header("HTTP/1.0 202 Accepted");
                $return = array('changed' => 'Wrong email format', 'done' => false);
                echo json_encode($return);
            }
        } else {
            header("HTTP/1.0 202 Accepted");
            $return = array('changed' => 'Username must only contain letters and numbers', 'done' => false);
            echo json_encode($return);
        }
    } else {
        header("HTTP/1.0 202 Accepted");
        $return = array('changed' => 'Must register by form', 'done' => false);
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

<?php
    session_start();
    include "../connection.php";
    $title = $_POST['admin_edit_cigar_title'];
    $price = $_POST['admin_edit_cigar_price'];
    $id = $_POST['admin_edit_cigar_id'];
    if (isset($_POST['admin_edit_cigar_button'])) {
        $older_image = $_POST['admin_edit_cigar_image_older'];
        if ($_FILES['admin_edit_cigar_image']['name'] != "") {
            $fileName = $_FILES['admin_edit_cigar_image']['name'];
            $fileSize = $_FILES['admin_edit_cigar_image']['size'];
            $tmpName = $_FILES['admin_edit_cigar_image']['tmp_name'];
            $uploadDir = '../';
            $filePath = $uploadDir . $older_image;
            $imageFileType = strtolower(pathinfo($fileName,PATHINFO_EXTENSION));
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
                header("Location: ../../views/admin.php?err=filetype2");
                die();
            } else if ($fileSize > 2 * 1024 * 1024) {
                header("Location: ../../views/admin.php?err=size2");
                die();
            } else {
                $result = move_uploaded_file($tmpName, $filePath);
                if (!$result) {
                    header("Location: ../../views/admin.php?err=notuploaded2");
                    die();
                } else {
                    $title = addslashes($title);
                    $price = addslashes($price);
                    $id = addslashes($id);
                    $upit = "UPDATE cigars SET title = :title, price = :price WHERE ID = :id";
                    $priprema = $connection -> prepare($upit);
                    $priprema -> bindParam(":title", $title);
                    $priprema -> bindParam(":price", $price);
                    $priprema -> bindParam(":id", $id);
                    $rezultat = $priprema -> execute();
                    if ($rezultat) {
                        header("Location: ../../views/admin.php");
                        die();
                    } else {
                        header("Location: ../../views/admin.php?err=servererror2");
                        die();
                    }
                }
            }
        } else {
            $title = addslashes($title);
            $price = addslashes($price);
            $id = addslashes($id);
            $upit = "UPDATE cigars SET title = :title, price = :price WHERE ID = :id";
            $priprema = $connection -> prepare($upit);
            $priprema -> bindParam(":title", $title);
            $priprema -> bindParam(":price", $price);
            $priprema -> bindParam(":id", $id);
            $rezultat = $priprema -> execute();
            if ($rezultat) {
                header("Location: ../../views/admin.php");
                die();
            } else {
                header("Location: ../../views/admin.php?err=servererror2");
                die();
            }
        }
    } else {
        header("Location: ../../views/admin.php?err=byform2");
        die();
    }
?>

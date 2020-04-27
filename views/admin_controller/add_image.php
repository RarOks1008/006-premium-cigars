<?php
    session_start();
    include "../connection.php";
    if (isset($_POST['admin_add_cigar_button'])) {
        $title = $_POST['admin_add_cigar_title'];
        $price = $_POST['admin_add_cigar_price'];
        $fileName = $_FILES['admin_add_cigar_image']['name'];
        $fileSize = $_FILES['admin_add_cigar_image']['size'];
        $tmpName = $_FILES['admin_add_cigar_image']['tmp_name'];
        $uploadDir = '../../assets/images/cigars/';
        $filePath = $uploadDir . $fileName;
        $filePathForBase = "../" . 'assets/images/cigars/' . $fileName;
        $imageFileType = strtolower(pathinfo($fileName,PATHINFO_EXTENSION));
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
            header("Location: ../../views/admin.php?err=filetype");
            die();
        } else if ($fileSize > 2 * 1024 * 1024) {
            header("Location: ../../views/admin.php?err=size");
            die();
        } else {
            $result = move_uploaded_file($tmpName, $filePath);
            if (!$result) {
                header("Location: ../../views/admin.php?err=notuploaded");
                die();
            } else {
                $title = addslashes($title);
                $price = addslashes($price);
                $upit = "INSERT INTO cigars (title, image, price) VALUES (:title, :image, :price)";
                $priprema = $connection -> prepare($upit);
                $priprema -> bindParam(":title", $title);
                $priprema -> bindParam(":image", $filePathForBase);
                $priprema -> bindParam(":price", $price);
                $rezultat = $priprema -> execute();
                if ($rezultat) {
                    header("Location: ../../views/admin.php");
                    die();
                } else {
                    header("Location: ../../views/admin.php?err=servererror");
                    die();
                }
            }
        }
    } else {
        header("Location: ../../views/admin.php?err=byform");
        die();
    }
?>

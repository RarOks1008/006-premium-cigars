<?php
    session_start();
    if(isset($_SESSION['user'])) {
        if (isset($_SESSION['user_rights_id'])) {
            if (($_SESSION['user_rights_id'] != 1) && ($_SESSION['user_rights_id'] != 2)) {
                header("Location: ../index.php");
                die();
            }
        } else {
            header("Location: ../index.php");
            die();
        }
    } else {
        header("Location: ../index.php");
        die();
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <title>Premium Cigars | Collection</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" />
        <link href="../assets/css/style.css" rel="stylesheet" type="text/css" />
        <link href="../assets/css/collection.css" rel="stylesheet" type="text/css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    	<meta name="keywords" content="premium, cigar, collection, cigars"/>
    	<meta name="description" content="The awesome collection page of Premium Cigars!"/>
    	<meta name="author" content="Nikola Nedeljkovic"/>
    	<meta name="copyright" content="RarOks 1008 Entertainment @ 2019"/>
    	<meta name="abstract" content="Premium Cigar Collection Page."/>
    	<meta name="robots" content="index,follow"/>
    	<link rel="shortcut icon" href="../favicon.ico"/>
    </head>
    <body>
        <div id="navigation">
            <img src="../assets/images/logo.png" alt="Logo"/>
            <?php
                include "connection.php";
                $upit = "SELECT * FROM navigation";
                $priprema = $connection -> prepare($upit);
                $rezultat = $priprema -> execute();

                if ($rezultat) {
                    echo "<ul>";
                    $linkovi = $priprema -> FetchAll();
                    foreach ($linkovi as $link) {
                        if ($_SESSION['user_rights_id'] == 1) {
                            echo "<li><a href=\"".$link -> link."\">".$link -> title."</a></li>";
                        } else if ($_SESSION['user_rights_id'] == 2){
                            if ($link -> ID != 4) {
                                echo "<li><a href=\"".$link -> link."\">".$link -> title."</a></li>";
                            }
                        } else {
                            if (($link -> ID != 4) && ($link -> ID != 2)) {
                                echo "<li><a href=\"".$link -> link."\">".$link -> title."</a></li>";
                            }
                        }
                    }
                    echo "</ul>";
                }
            ?>
            <input type="button" id="logout" name="logout" value="Logout"/>
        </div>
        <h1>Cigar Collection</h1>
        <div id="cigar_collection"></div>
        <div id="cigar_pagination"></div>
        <div class="copyright">
            <p id="author_hover">&copy; Nikola Nedeljkovic 2019 &nbsp;&nbsp;&nbsp; @ ICT</p>
        </div>
        <div id="author_data">
            <h2>Author:</h2>
            <h3>Nikola Nedeljkovic</h3>
            <h3>2/17</h3>
            <h4>Front-end developer &#64; Summa Labs d.o.o</h4>
            <h4>nikola.nedeljkovic.2.17&#64;ict.edu.rs</h4>
            <h4>+381/64-45-71-380</h4>
            <img src="../assets/images/author.jpg" alt="Author"/>
        </div>
        <div class="footer">
            <div id="social_networks"></div>
            <img src="../assets/images/surgeon_warning.png" alt="Surgeon General Warning"/>
        </div>
        <script type="text/javascript" src="../assets/js/jquery.min.js"></script>
        <script type="text/javascript" src="../assets/js/collection.js"></script>
    </body>
</html>

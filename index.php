<?php
    session_start();
    if (isset($_SESSION['user'])) {
        if (isset($_SESSION['user_rights_id'])) {
            if ($_SESSION['user_rights_id'] == 1) {
                header("Location: views/admin.php");
                die();
            } else {
                header("Location: views/main.php");
                die();
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <title>Premium Cigars | Login</title>
        <link href="assets/css/style.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/index.css" rel="stylesheet" type="text/css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    	<meta name="keywords" content="premium, cigar, login, register"/>
    	<meta name="description" content="The first screen to our online diversity of cigars!"/>
    	<meta name="author" content="Nikola Nedeljkovic"/>
    	<meta name="copyright" content="RarOks 1008 Entertainment @ 2019"/>
    	<meta name="abstract" content="Premium Cigar Login Page."/>
    	<meta name="robots" content="index,follow"/>
    	<link rel="shortcut icon" href="favicon.ico"/>
    </head>
    <body>
        <div class="content_holder">
            <div class="logo">
                <h1>Premium Cigars</h1>
            </div>
            <ul id="list">
                <li><a class="active" href="#" data-id="login">Login</a></li>
                <li><a href="#" data-id="register">Register</a></li>
            </ul>
            <div id="form_place"></div>
        </div>
        <div class="copyright">
            <p>&copy; Nikola Nedeljkovic 2019 &nbsp;&nbsp;&nbsp; @ ICT</p>
        </div>
        <script type="text/javascript" src="assets/js/jquery.min.js"></script>
        <script type="text/javascript" src="assets/js/index.js"></script>
    </body>
</html>

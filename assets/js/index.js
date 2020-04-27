$(document).ready(function() {
    fill_form("login");
    $("#list li a").on('click', function() {
        if($(this).attr("class") == "active") { return; }
        show_form($(this).attr("data-id"));
    });
});
function show_form(which) {
    if (!which) { return; }
    if($("#list li a")[0].className == "active") {
        $("#list li a")[0].classList.remove("active");
        $("#list li a")[1].classList.add("active");
    } else {
        $("#list li a")[1].classList.remove("active");
        $("#list li a")[0].classList.add("active");
    }
    fill_form(which);
}
function fill_form(which) {
    if (which == "login") {
        var d = document.getElementById("form_place"),
            input = `<form><input type=\"text\" name=\"username\" id=\"username\" placeholder=\"Username\" />
            <p id=\"username_error\"></p>
            <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"******\" />
            <p id=\"password_error\"></p>
            <input type=\"button\" value=\"Login\" id=\"login_button\" /></form>`;
        d.innerHTML = input;
        $("#form_place form input").keydown(function (e) {
            if (e.key == "Enter") {
                login_click();
            }
        });
        document.getElementById("login_button").addEventListener("click", login_click);
        if (document.getElementById("register_button")) { document.getElementById("register_button").removeEventListener("click"); }
    }
    if (which == "register") {
        var d = document.getElementById("form_place"),
            input = `<form><input type=\"text\" name=\"username\" id=\"username\" placeholder=\"Username\" />
            <p id=\"username_error\"></p>
            <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"Password\" />
            <p id=\"password_error\"></p>
            <input type=\"password\" name=\"repeat_password\" id=\"repeat_password\" placeholder=\"Repeat password\" />
            <p id=\"repeat_password_error\"></p>
            <input type=\"email\" name=\"email\" id=\"email\" placeholder=\"E-mail\" />
            <p id=\"email_error\"></p>
            <label for="date">Date of birth:</br></label>
            <input type=\"date\" name=\"date\" id=\"date\" />
            <p id=\"date_error\"></p>
            <input type=\"button\" value=\"Register\" id=\"register_button\" /></form>`;
        d.innerHTML = input;
        $("#form_place form input").keydown(function (e) {
            if (e.key == "Enter") {
                register_click();
            }
        });
        document.getElementById("register_button").addEventListener("click", register_click);
        if (document.getElementById("login_button")) { document.getElementById("login_button").removeEventListener("click"); }
    }
}
function login_click() {
    var username = document.getElementById("username").value,
        password = document.getElementById("password").value,
        user_pat = /^([A-Z]|[a-z]|[0-9])+$/;

    if (username.length < 3) {
        document.getElementById("username_error").innerHTML = "Username must not be less than three characters.";
        return;
    }
    if (!user_pat.test(username)) {
        document.getElementById("username_error").innerHTML = "Username must only contain letters and numbers.";
        return;
    }
    document.getElementById("username_error").innerHTML = "";
    if (password.includes(username) || username.includes(password)) {
        document.getElementById("password_error").innerHTML = "Password must not include username.";
        return;
    }
    document.getElementById("password_error").innerHTML = "";
    $.ajax({
        url: "views/login.php",
        method: "POST",
        data: {
            button_click: true,
            username: username,
            password: password
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.logged) {
                window.location.href = prom.doing;
            } else {
                document.getElementById("password_error").innerHTML = prom.doing;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("password_error").innerHTML = error;
        }
    });
}
function register_click() {
    var username = document.getElementById("username").value,
        password = document.getElementById("password").value,
        repeat_password = document.getElementById("repeat_password").value,
        email = document.getElementById("email").value,
        date = document.getElementById("date").value,
        user_pat = /^([A-Z]|[a-z]|[0-9])+$/,
        email_pat = /^(\w|\d)\S*@\S+\.(\w|\d){2,}$/,
        date_entered = new Date(date),
        timestamp_entered = date_entered.getTime(),
        date_now = new Date(),
        timestamp_now = date_now.getTime();

    if (username.length < 3) {
        document.getElementById("username_error").innerHTML = "Username must not be less than three characters.";
        return;
    }
    if (!user_pat.test(username)) {
        document.getElementById("username_error").innerHTML = "Username must only contain letters and numbers.";
        return;
    }
    document.getElementById("username_error").innerHTML = "";
    if (password.includes(username) || username.includes(password)) {
        document.getElementById("password_error").innerHTML = "Password must not include username.";
        return;
    }
    document.getElementById("password_error").innerHTML = "";
    if (password != repeat_password) {
        document.getElementById("repeat_password_error").innerHTML = "Passwords do not match.";
        return;
    }
    document.getElementById("repeat_password_error").innerHTML = "";
    if (!email_pat.test(email)) {
        document.getElementById("email_error").innerHTML = "Wrong email format.";
        return;
    }
    document.getElementById("email_error").innerHTML = "";
    if (timestamp_entered > timestamp_now) {
        document.getElementById("date_error").innerHTML = "Date can not be bigger than current date.";
        return;
    }
    document.getElementById("date_error").innerHTML = "";
    $.ajax({
        url: "views/register.php",
        method: "POST",
        data: {
            button_click: true,
            username: username,
            password: password,
            repeat_password: repeat_password,
            email: email,
            date: date
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.registered) {
                show_form('login');
                show_notice();
            } else {
                document.getElementById("date_error").innerHTML = prom.doing;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("date_error").innerHTML = error;
        }
    });
}
function show_notice() {
    var notice_div = document.createElement('div'),
        notice = `<h2>Registered successfully!</h2><p>Please login to continue...</p>`;
    notice_div.className = "notice_div";
    notice_div.id = "notice";
    notice_div.innerHTML = notice;
    document.body.appendChild(notice_div);
    setTimeout( function() {
        $("#notice").fadeOut("slow", function() {
        });
    }, 1500);
}

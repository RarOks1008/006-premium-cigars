$(document).ready(function() {
    fill_socials();
    document.getElementById("logout").addEventListener("click", function() {
        $.ajax({
            url: "../views/logout.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data) {
                    window.location.href = "../index.php";
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("logout").value = "Logout Again";
            }
        });
    });
    document.getElementById("subject").addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            send_message();
        }
    });
    $("#author_hover").hover(function(e) {
        var offset_top = $(this).offset().top - 460,
            el_width = $("#author_data").width(),
            page_width = $("body").width(),
            offset_left = (page_width - el_width) / 2;
        $("#author_data").css({ left: offset_left + 'px' });
        $("#author_data").css({ top: offset_top + 'px' });
        $("#author_data").addClass("show_author");
    }, function () {
        $("#author_data").removeClass("show_author");
    });
    document.getElementById("send_message").addEventListener("click", send_message);
});
function fill_socials() {
    $.ajax({
        url: "../views/socials.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.done) {
                var input_text = "";
                data.socials.forEach(function (soc) {
                    input_text += `<a href="${soc.link}"><span class="${soc.class}"></span></a>`;
                });
                document.getElementById("social_networks").innerHTML = input_text;
            } else {
                document.getElementById("social_networks").innerHTML = data.socials;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("social_networks").innerHTML = "Failed loading icons";
        }
    });
}
function send_message() {
    var subject = document.getElementById("subject").value,
        message = document.getElementById("text_content").value,
        error_text = document.getElementById("form_error");
    if (!subject) {
        error_text.innerHTML = "Subject can not be left empty.";
        return;
    }
    if (!message) {
        error_text.innerHTML = "You can not send an empty message.";
        return;
    }
    error_text.innerHTML = "";
    $.ajax({
        url: "../views/contact_message.php",
        method: "POST",
        data: {
            button_click: true,
            subject: subject,
            message: message
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.contacted) {
                document.getElementsByTagName("form")[0].innerHTML = prom.doing;
            } else {
                error_text.innerHTML = prom.doing;
            }
        },
        error: function (xhr, status, error) {
            error_text.innerHTML = error;
        }
    });
}

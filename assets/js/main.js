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

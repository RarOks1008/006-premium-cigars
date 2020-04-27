$(document).ready(function() {
    fill_socials();
    fill_cigars();
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
function fill_cigars(id) {
    $.ajax({
        url: "../views/cigars.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.done) {
                var text = "",
                    cigar_count = data.cigars.length,
                    page_number = Math.ceil(cigar_count / 10),
                    page_text = "";
                for (i = 1; i <= page_number; i++) {
                    if ((!id && i == 1) || (id && id == i)) {
                        page_text += `<span class="active" data-id="${i}">${i}</span>`;
                    } else {
                        page_text += `<span data-id="${i}">${i}</span>`;
                    }
                }
                document.getElementById("cigar_pagination").innerHTML = page_text;
                 $("#cigar_pagination span").on('click', function() {
                     if($(this).attr("class") == "active") { return; }
                     fill_cigars($(this).attr("data-id"));
                 });
                for (i = 0; i < data.cigars.length; i++) {
                    if (id) {
                        if ((i < id * 10) && (i >= (id - 1) * 10)) {
                            text += `<div class="cigar_holder"><h2>${data.cigars[i].title}</h2><img src="${data.cigars[i].image}" alt="${data.cigars[i].title}"/><p>Price: ${data.cigars[i].price}&#163;</p></div>`;
                        }
                    } else {
                        if (i < 10) {
                            text += `<div class="cigar_holder"><h2>${data.cigars[i].title}</h2><img src="${data.cigars[i].image}" alt="${data.cigars[i].title}"/><p>Price: ${data.cigars[i].price}&#163;</p></div>`;
                        }
                    }
                }
                document.getElementById("cigar_collection").innerHTML = text;
            } else {
                document.getElementById("cigar_collection").innerHTML = "<h3>" + data.message + "</h3>";
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("cigar_collection").innerHTML = "<h3>Failed loading cigar data</h3>";
        }
    });
}

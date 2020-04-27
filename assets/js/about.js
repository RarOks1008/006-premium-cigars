$(document).ready(function() {
    fill_socials();
    fill_facts();
    fill_voting();
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
    document.getElementById("voting_done").addEventListener("click", submit_voting);
    document.getElementById("show_voting_results").addEventListener("click", show_results);
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
function fill_facts() {
    $.ajax({
        url: "../views/facts.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.done) {
                var input_text_fact = "";
                data.facts.forEach(function (fact) {
                    input_text_fact += `<h2>${fact.ID}. ${fact.title}</h2><p>${fact.fact_text}</p>`;
                });
                document.getElementById("facts").innerHTML = input_text_fact;
            } else {
                document.getElementById("facts").innerHTML = data.socials;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("facts").innerHTML = "Failed loading facts";
        }
    });
}
function fill_voting() {
    $.ajax({
        url: "../views/voting.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.got) {
                $.ajax({
                    url: "../views/cigar_names.php",
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        if (data.done) {
                            var options = "";
                            data.cigar_names.forEach(function(name) {
                                options += `<option value="${name.title}">${name.title}</option>`;
                            });
                            document.getElementById("select_cigar").innerHTML = options;
                        } else {
                            document.getElementById("voting").innerHTML = "<h3>" + data.message + "</h3>";
                        }
                    },
                    error: function (xhr, status, error) {
                        document.getElementById("voting").innerHTML = "<h3>Failed loading voting data</h3>";
                    }
                });
            } else {
                document.getElementById("voting").innerHTML = "<h3>" + data.message + "</h3>";
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("voting").innerHTML = "<h3>Failed loading voting data</h3>";
        }
    });
}
function submit_voting() {
    if (!document.querySelector('input[name="reccomend"]:checked')) {
        document.getElementById("form_error").innerHTML = "You must either reccomend or not reccomend.";
        return;
    }
    document.getElementById("form_error").innerHTML = "";
    var reccomended_cigar =document.getElementById("select_cigar").options[document.getElementById("select_cigar").selectedIndex].value,
        reccomend_bool = document.querySelector('input[name="reccomend"]:checked').value;
    if (reccomend_bool == "no") { reccomend_bool = 0; }
    if (reccomend_bool == "yes") { reccomend_bool = 1; }
    $.ajax({
        url: "../views/vote.php",
        method: "POST",
        data: {
            button_click: true,
            cigar: reccomended_cigar,
            reccomend: reccomend_bool
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                document.getElementById("voting").innerHTML = "<h3>Voted succesfully.</h3>";
            } else {
                document.getElementById("form_error").innerHTML = prom.voting;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("form_error").innerHTML = "Failed sending vote.";
        }
    });
}

function show_results() {
    var cigar_list = [],
        cigar_list_number = [],
        number = 0,
        yes_reccomend = 0,
        no_reccomend = 0,
        total_reccomend = 0,
        yes_reccomend_percent,
        no_reccomend_percent;
    $.ajax({
        url: "../views/vote_results.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            text = "";
            if (data.done) {
                data.vote_results.forEach(function(res) {
                    if (res.reccomend == 1) {
                        yes_reccomend += 1;
                    } else {
                        no_reccomend += 1;
                    }
                    if (!cigar_list.includes(res.cigar)) {
                        cigar_list.push(res.cigar);
                        cigar_list_number.push(1);
                    } else {
                        for (i = 0; i < cigar_list.length; i++) {
                            if (cigar_list[i] == res.cigar) {
                                cigar_list_number[i] += 1;
                            }
                        }
                    }
                });
                for (i = 0; i < cigar_list_number.length; i++) {
                    number += cigar_list_number[i];
                }
                text += `<h2>Favourite cigar:</h2>`;
                for (i = 0; i < cigar_list.length; i++) {
                    var percent = cigar_list_number[i] / number * 100;
                    percent = Math.round(percent * 100) / 100;
                    text += `<progress value="${percent}" min="0" max="100"></progress> ${percent}% ${cigar_list[i]}<br/>`;
                }
                text += `<h2>Would reccomend:</h2>`;
                total_reccomend = yes_reccomend + no_reccomend;
                yes_reccomend_percent = yes_reccomend / total_reccomend * 100;
                yes_reccomend_percent = Math.round(yes_reccomend_percent * 100) / 100;
                no_reccomend_percent = no_reccomend / total_reccomend * 100;
                no_reccomend_percent = Math.round(no_reccomend_percent * 100) / 100;
                text += `<progress value="${yes_reccomend_percent}" min="0" max="100"></progress> ${yes_reccomend_percent}% Would reccomend<br/>`;
                text += `<progress value="${no_reccomend_percent}" min="0" max="100"></progress> ${no_reccomend_percent}% Would not reccomend`;
                document.getElementById("voting_results").innerHTML = text;
            } else {
                document.getElementById("voting_results").innerHTML = "<h3>" + data.vote_results + "</h3>";
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("voting_results").innerHTML = "<h3>Failed loading facts</h3>";
        }
    });
}

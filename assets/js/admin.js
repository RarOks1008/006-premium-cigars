var filler = [ {
                    option: "Select",
                    id: "select"
                },
                {
                    option: "Cigar",
                    id: "cigar"
                },
                {
                    option: "Navigation",
                    id: "navigation"
                },
                {
                    option: "Social Media",
                    id: "social"
                },
                {
                    option: "User",
                    id: "user"
                }
            ],
    add_image_errors = ['filetype', 'size', 'notuploaded', 'servererror', 'byform'],
    edit_image_errors = ['filetype2', 'size2', 'notuploaded2', 'servererror2', 'byform2'];
$(document).ready(function() {
    fill_socials();
    fill_admin_select_add();
    fill_admin_select_delete();
    fill_admin_select_edit();
    fill_delete_holder();
    if (window.location.href.lastIndexOf("=") > 0) {
        var err = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
        if (add_image_errors.indexOf(err) > -1) {
            fill_add_holder("admin_add_cigar", err);
        } else {
            fill_add_holder();
        }
        if (edit_image_errors.indexOf(err) > -1) {
            fill_edit_holder("admin_edit_cigar", err);
        } else {
            fill_edit_holder();
        }
    } else {
        fill_add_holder();
        fill_edit_holder();
    }
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
function fill_admin_select_add() {
    var add_text = "";
    filler.forEach(function (f) {
        add_text += `<option id="${"admin_add_" + f.id}" name="${"admin_add_" + f.id}">Add ${f.option}</option>`;
    });
    document.getElementById("admin_select_add").innerHTML = add_text;
    $("#admin_select_add").on('change', function() {
        fill_add_holder(document.getElementById("admin_select_add").options[document.getElementById("admin_select_add").selectedIndex].id);
    });
}
function fill_add_holder(id, err) {
    var add_holder = document.getElementById("admin_add_holder");
    if (!id || id == "admin_add_select") {
        add_holder.innerHTML = `<h3>Select what you want to add...</h3>`;
        return;
    }
    if (id == "admin_add_cigar") {
        add_holder.innerHTML = `<form onSubmit="return admin_add_cigar()" method="POST" action="../views/admin_controller/add_image.php" name="admin_add_cigar_form" enctype="multipart/form-data"><label for="admin_add_cigar_title">Cigar Title</label><input type="text" id="admin_add_cigar_title" name="admin_add_cigar_title" placeholder="Title"/>
                    <label for="admin_add_cigar_image">Cigar Image</label><input type="file" accept=".gif, .jpeg, .jpg, .png" id="admin_add_cigar_image" name="admin_add_cigar_image"/>
                    <label for="admin_add_cigar_price">Cigar Price</label><input type="number" id="admin_add_cigar_price" name="admin_add_cigar_price" step="0.01"/>
                    <p id="admin_add_cigar_error"></p>
                    <input type="submit" id="admin_add_cigar_button" name="admin_add_cigar_button" value="Submit"/></form>`;
        if (err) {
            if (err == "byform") {
                document.getElementById("admin_add_cigar_error").innerHTML = "Must send by form.";
            } else if (err == "servererror") {
                document.getElementById("admin_add_cigar_error").innerHTML = "Server error.";
            } else if (err == "notuploaded") {
                document.getElementById("admin_add_cigar_error").innerHTML = "Failed uploading file.";
            } else if (err == "size") {
                document.getElementById("admin_add_cigar_error").innerHTML = "File must not be bugger than 2MB.";
            } else if (err == "filetype") {
                document.getElementById("admin_add_cigar_error").innerHTML = "Allowed file types are .gif, .jpeg, .jpg, .png";
            } else {
                document.getElementById("admin_add_cigar_error").innerHTML = "";
            }
        } else {
            document.getElementById("admin_add_cigar_error").innerHTML = "";
        }
        return;
    }
    if (id == "admin_add_navigation") {
        add_holder.innerHTML = `<label for="admin_add_navigation_title">Navigation Title</label><input type="text" id="admin_add_navigation_title" name="admin_add_navigation_title" placeholder="Title"/>
                    <label for="admin_add_navigation_link">Navigation Link</label><input type="text" id="admin_add_navigation_link" name="admin_add_navigation_link" placeholder="Link"/>
                    <p id="admin_add_navigation_error"></p>
                    <input type="button" id="admin_add_navigation_button" name="admin_add_navigation_button" value="Submit"/>`;
        document.getElementById("admin_add_navigation_button").addEventListener("click", admin_add_navigation);
        $("#admin_add_holder input").keydown(function (e) {
            if (e.key == "Enter") {
                admin_add_navigation();
            }
        });
        return;
    }
    if (id == "admin_add_social") {
        add_holder.innerHTML = `<label for="admin_add_socials_class">fa-fa class</label><input type="text" id="admin_add_socials_class" name="admin_add_socials_class" placeholder="fab fa-..."/>
                    <label for="admin_add_socials_link">Socials Link</label><input type="text" id="admin_add_socials_link" name="admin_add_socials_link" placeholder="https://www...."/>
                    <p id="admin_add_socials_error"></p>
                    <input type="button" id="admin_add_socials_button" name="admin_add_socials_button" value="Submit"/>`;
        document.getElementById("admin_add_socials_button").addEventListener("click", admin_add_social);
        $("#admin_add_holder input").keydown(function (e) {
            if (e.key == "Enter") {
                admin_add_social();
            }
        });
        return;
    }
    if (id == "admin_add_user") {
        add_holder.innerHTML = `<label for="admin_add_user_username">Username</label><input type="text" id="admin_add_user_username" name="admin_add_user_username" placeholder="Username"/>
                    <label for="admin_add_user_password">Password</label><input type="password" id="admin_add_user_password" name="admin_add_user_password" placeholder="******"/>
                    <label for="admin_add_user_email">Email</label><input type="email" id="admin_add_user_email" name="admin_add_user_email" placeholder="somebody@something.com"/>
                    <label for="admin_add_user_birthdate">Date of Birth</label><input type="date" id="admin_add_user_birthdate" name="admin_add_user_birthdate"/>
                    <p id="admin_add_user_error"></p>
                    <input type="button" id="admin_add_user_button" name="admin_add_user_button" value="Submit"/>`;
        document.getElementById("admin_add_user_button").addEventListener("click", admin_add_user);
        $("#admin_add_holder input").keydown(function (e) {
            if (e.key == "Enter") {
                admin_add_user();
            }
        });
        return;
    }
}
function fill_admin_select_delete() {
    var delete_text = "";
    filler.forEach(function (f) {
        delete_text += `<option id="${"admin_delete_" + f.id}" name="${"admin_delete_" + f.id}">Delete ${f.option}</option>`;
    });
    document.getElementById("admin_select_delete").innerHTML = delete_text;
    $("#admin_select_delete").on('change', function() {
        fill_delete_holder(document.getElementById("admin_select_delete").options[document.getElementById("admin_select_delete").selectedIndex].id);
    });
}
function fill_delete_holder(id) {
    var delete_text = "",
        delete_holder = document.getElementById("admin_delete_holder");
    if (!id || id == "admin_delete_select") {
        delete_holder.innerHTML = `<h3>Select what you want to delete...</h3>`;
        return;
    }
    if (id == "admin_delete_cigar") {
        $.ajax({
            url: "../views/cigars.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data.done) {
                    var options = "<select id=\"admin_delete_cigar_select\">";
                    data.cigars.forEach(function (cig) {
                        options += `<option name="admin_delete_cigar_${cig.ID}" value="${cig.ID}" id="admin_delete_cigar_${cig.ID}">${cig.title}</option>`;
                    });
                    options += `</select><p id="admin_delete_cigar_error"></p><input type="button" id="admin_delete_cigar_button" name="admin_delete_cigar_button" value="Delete"/>`;
                    document.getElementById("admin_delete_holder").innerHTML = options;
                    document.getElementById("admin_delete_cigar_button").addEventListener("click", admin_delete_cigar);
                } else {
                    document.getElementById("admin_delete_holder").innerHTML = "<h3>" + data.cigars + "</h3>";
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("admin_delete_holder").innerHTML = "<h3>Failed loading cigar data</h3>";
            }
        });
        return;
    }
    if (id == "admin_delete_navigation") {
        $.ajax({
            url: "../views/navigation.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data.done) {
                    var options = "<select id=\"admin_delete_navigation_select\">";
                    data.navigation.forEach(function (nav) {
                        options += `<option name="admin_delete_navigation_${nav.ID}" value="${nav.ID}" id="admin_delete_navigation_${nav.ID}">${nav.title}</option>`;
                    });
                    options += `</select><p id="admin_delete_navigation_error"></p><input type="button" id="admin_delete_navigation_button" name="admin_delete_navigation_button" value="Delete"/>`;
                    document.getElementById("admin_delete_holder").innerHTML = options;
                    document.getElementById("admin_delete_navigation_button").addEventListener("click", admin_delete_navigation);
                } else {
                    document.getElementById("admin_delete_holder").innerHTML = "<h3>" + data.navigation + "</h3>";
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("admin_delete_holder").innerHTML = "<h3>Failed loading navigation data</h3>";
            }
        });
        return;
    }
    if (id == "admin_delete_social") {
        $.ajax({
            url: "../views/socials.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data.done) {
                    var options = "<select id=\"admin_delete_socials_select\">";
                    data.socials.forEach(function (soc) {
                        options += `<option name="admin_delete_social_${soc.ID}" value="${soc.ID}" id="admin_delete_social_${soc.ID}">${soc.class}</option>`;
                    });
                    options += `</select><p id="admin_delete_social_error"></p><input type="button" id="admin_delete_social_button" name="admin_delete_social_button" value="Delete"/>`;
                    document.getElementById("admin_delete_holder").innerHTML = options;
                    document.getElementById("admin_delete_social_button").addEventListener("click", admin_delete_social);
                } else {
                    document.getElementById("admin_delete_holder").innerHTML = "<h3>" + data.socials + "</h3>";
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("admin_delete_holder").innerHTML = "<h3>Failed loading socials data</h3>";
            }
        });
        return;
    }
    if (id == "admin_delete_user") {
        $.ajax({
            url: "../views/users.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data.done) {
                    var options = "<select id=\"admin_delete_user_select\">";
                    data.users.forEach(function (use) {
                        options += `<option name="admin_delete_user_${use.ID}" value="${use.ID}" id="admin_delete_user_${use.ID}">${use.Username}</option>`;
                    });
                    options += `</select><p id="admin_delete_user_error"></p><input type="button" id="admin_delete_user_button" name="admin_delete_user_button" value="Delete"/>`;
                    document.getElementById("admin_delete_holder").innerHTML = options;
                    document.getElementById("admin_delete_user_button").addEventListener("click", admin_delete_user);
                } else {
                    document.getElementById("admin_delete_holder").innerHTML = "<h3>" + data.users + "</h3>";
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("admin_delete_holder").innerHTML = "<h3>Failed loading user data</h3>";
            }
        });
        return;
    }
}
function fill_admin_select_edit() {
    var edit_text = "";
    filler.forEach(function (f) {
        edit_text += `<option id="${"admin_edit_" + f.id}" name="${"admin_edit_" + f.id}">Edit ${f.option}</option>`;
    });
    document.getElementById("admin_select_edit").innerHTML = edit_text;
    $("#admin_select_edit").on('change', function() {
        fill_edit_holder(document.getElementById("admin_select_edit").options[document.getElementById("admin_select_edit").selectedIndex].id);
    });
}
function fill_edit_holder(id, err) {
    var edit_text = "",
        edit_holder = document.getElementById("admin_edit_holder_selector");
    if (!id || id == "admin_edit_select") {
        edit_holder.innerHTML = `<h3>Select what you want to edit...</h3>`;
        document.getElementById("admin_edit_holder").innerHTML = "";
        return;
    }
    if (id == "admin_edit_cigar") {
        $.ajax({
            url: "../views/cigars.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data.done) {
                    var options = "<select id=\"admin_edit_cigar_select\">",
                        num = 1;
                    data.cigars.forEach(function (cig) {
                        if (num == 1) {
                            get_cigar(cig.ID, err);
                        }
                        num++;
                        options += `<option name="admin_edit_cigar_${cig.ID}" value="${cig.ID}" id="admin_edit_cigar_${cig.ID}">${cig.title}</option>`;
                    });
                    options += `</select>`;
                    document.getElementById("admin_edit_holder_selector").innerHTML = options;
                    $('#admin_edit_cigar_select').change(function() {
                        get_cigar($("#admin_edit_cigar_select option:selected").val());
                    });
                } else {
                    document.getElementById("admin_edit_holder_selector").innerHTML = "<h3>" + data.cigars + "</h3>";
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("admin_edit_holder_selector").innerHTML = "<h3>Failed loading cigar data</h3>";
            }
        });
        return;
    }
    if (id == "admin_edit_navigation") {
        $.ajax({
            url: "../views/navigation.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data.done) {
                    var options = "<select id=\"admin_edit_navigation_select\">",
                        num = 1;
                    data.navigation.forEach(function (nav) {
                        if (num == 1) {
                            get_navigation(nav.ID);
                        }
                        num++;
                        options += `<option name="admin_edit_navigation_${nav.ID}" value="${nav.ID}" id="admin_edit_navigation_${nav.ID}">${nav.title}</option>`;
                    });
                    options += `</select>`;
                    document.getElementById("admin_edit_holder_selector").innerHTML = options;
                    $('#admin_edit_navigation_select').change(function() {
                        get_navigation($("#admin_edit_navigation_select option:selected").val());
                    });
                } else {
                    document.getElementById("admin_edit_holder_selector").innerHTML = "<h3>" + data.navigation + "</h3>";
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("admin_edit_holder_selector").innerHTML = "<h3>Failed loading navigation data</h3>";
            }
        });
        return;
    }
    if (id == "admin_edit_social") {
        $.ajax({
            url: "../views/socials.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data.done) {
                    var options = "<select id=\"admin_edit_socials_select\">",
                        num = 1;
                    data.socials.forEach(function (soc) {
                        if (num == 1) {
                            get_social(soc.ID);
                        }
                        num++;
                        options += `<option name="admin_edit_social_${soc.ID}" value="${soc.ID}" id="admin_edit_social_${soc.ID}">${soc.class}</option>`;
                    });
                    options += `</select>`;
                    document.getElementById("admin_edit_holder_selector").innerHTML = options;
                    $('#admin_edit_socials_select').change(function() {
                        get_social($("#admin_edit_socials_select option:selected").val());
                    });
                } else {
                    document.getElementById("admin_edit_holder_selector").innerHTML = "<h3>" + data.socials + "</h3>";
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("admin_edit_holder_selector").innerHTML = "<h3>Failed loading socials data</h3>";
            }
        });
        return;
    }
    if (id == "admin_edit_user") {
        $.ajax({
            url: "../views/users.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data.done) {
                    var options = "<select id=\"admin_edit_user_select\">",
                        num = 1;
                    data.users.forEach(function (use) {
                        if (num == 1) {
                            get_user(use.ID);
                        }
                        num++;
                        options += `<option name="admin_edit_user_${use.ID}" value="${use.ID}" id="admin_edit_user_${use.ID}">${use.Username}</option>`;
                    });
                    options += `</select>`;
                    document.getElementById("admin_edit_holder_selector").innerHTML = options;
                    $('#admin_edit_user_select').change(function() {
                        get_user($("#admin_edit_user_select option:selected").val());
                    });
                } else {
                    document.getElementById("admin_edit_holder_selector").innerHTML = "<h3>" + data.users + "</h3>";
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("admin_edit_holder_selector").innerHTML = "<h3>Failed loading user data</h3>";
            }
        });
        return;
    }
}


function admin_add_cigar() {
    var title = document.getElementById("admin_add_cigar_title").value,
        image = document.getElementById("admin_add_cigar_image").value,
        price = document.getElementById("admin_add_cigar_price").value;
    if (title == "" || image == "" || price == "") {
        document.getElementById("admin_add_cigar_error").innerHTML = "You must enter title, price and select and image.";
        return false;
    }
    if (price <= 0) {
        document.getElementById("admin_add_cigar_error").innerHTML = "Price can not be lower or equal to zero.";
        return false;
    }
    document.getElementById("admin_add_cigar_error").innerHTML = "";
    return true;
}
function admin_add_navigation() {
    var title = document.getElementById("admin_add_navigation_title").value,
        link = document.getElementById("admin_add_navigation_link").value;
    $.ajax({
        url: "../views/admin_controller/add_navigation.php",
        method: "POST",
        data: {
            button_click: true,
            title: title,
            link: link
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                location.reload();
            } else {
                document.getElementById("admin_add_navigation_error").innerHTML = prom.added;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_add_navigation_error").innerHTML = error;
        }
    });
}
function admin_add_social() {
    var classs = document.getElementById("admin_add_socials_class").value,
        link = document.getElementById("admin_add_socials_link").value;
    $.ajax({
        url: "../views/admin_controller/add_social.php",
        method: "POST",
        data: {
            button_click: true,
            class: classs,
            link: link
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                location.reload();
            } else {
                document.getElementById("admin_add_socials_error").innerHTML = prom.added;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_add_socials_error").innerHTML = error;
        }
    });
}
function admin_add_user() {
    var username = document.getElementById("admin_add_user_username").value,
        password = document.getElementById("admin_add_user_password").value,
        email = document.getElementById("admin_add_user_email").value,
        date = document.getElementById("admin_add_user_birthdate").value,
        user_pat = /^([A-Z]|[a-z]|[0-9])+$/,
        email_pat = /^(\w|\d)\S*@\S+\.(\w|\d){2,}$/,
        date_entered = new Date(date),
        timestamp_entered = date_entered.getTime(),
        date_now = new Date(),
        timestamp_now = date_now.getTime();

    if (username.length < 3) {
        document.getElementById("admin_add_user_error").innerHTML = "Username must not be less than three characters.";
        return;
    }
    if (!user_pat.test(username)) {
        document.getElementById("admin_add_user_error").innerHTML = "Username must only contain letters and numbers.";
        return;
    }
    document.getElementById("admin_add_user_error").innerHTML = "";
    if (password.includes(username) || username.includes(password)) {
        document.getElementById("admin_add_user_error").innerHTML = "Password must not include username.";
        return;
    }
    document.getElementById("admin_add_user_error").innerHTML = "";
    if (!email_pat.test(email)) {
        document.getElementById("admin_add_user_error").innerHTML = "Wrong email format.";
        return;
    }
    document.getElementById("admin_add_user_error").innerHTML = "";
    if (timestamp_entered > timestamp_now) {
        document.getElementById("admin_add_user_error").innerHTML = "Date can not be bigger than current date.";
        return;
    }
    document.getElementById("admin_add_user_error").innerHTML = "";
    $.ajax({
        url: "../views/admin_controller/add_user.php",
        method: "POST",
        data: {
            button_click: true,
            username: username,
            password: password,
            email: email,
            date: date
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                location.reload();
            } else {
                document.getElementById("admin_add_user_error").innerHTML = prom.added;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_add_user_error").innerHTML = error;
        }
    });
}
function admin_delete_cigar() {
    var cigar = document.getElementById("admin_delete_cigar_select").options[document.getElementById("admin_delete_cigar_select").selectedIndex].value;
    $.ajax({
        url: "../views/admin_controller/delete_cigar.php",
        method: "POST",
        data: {
            button_click: true,
            cigar: cigar
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                location.reload();
            } else {
                document.getElementById("admin_delete_cigar_error").innerHTML = prom.deleted;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_delete_cigar_error").innerHTML = error;
        }
    });
}
function admin_delete_navigation() {
    var navigation = document.getElementById("admin_delete_navigation_select").options[document.getElementById("admin_delete_navigation_select").selectedIndex].value;
    $.ajax({
        url: "../views/admin_controller/delete_navigation.php",
        method: "POST",
        data: {
            button_click: true,
            navigation: navigation
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                location.reload();
            } else {
                document.getElementById("admin_delete_navigation_error").innerHTML = prom.deleted;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_delete_navigation_error").innerHTML = error;
        }
    });
}
function admin_delete_social() {
    var social = document.getElementById("admin_delete_socials_select").options[document.getElementById("admin_delete_socials_select").selectedIndex].value;
    $.ajax({
        url: "../views/admin_controller/delete_social.php",
        method: "POST",
        data: {
            button_click: true,
            social: social
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                location.reload();
            } else {
                document.getElementById("admin_delete_social_error").innerHTML = prom.deleted;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_delete_social_error").innerHTML = error;
        }
    });
}
function admin_delete_user() {
    var user = document.getElementById("admin_delete_user_select").options[document.getElementById("admin_delete_user_select").selectedIndex].value;
    $.ajax({
        url: "../views/admin_controller/delete_user.php",
        method: "POST",
        data: {
            button_click: true,
            user: user
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                location.reload();
            } else {
                document.getElementById("admin_delete_user_error").innerHTML = prom.deleted;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_delete_user_error").innerHTML = error;
        }
    });
}
function get_cigar(id, err) {
    $.ajax({
        url: "../views/admin_controller/get_cigar.php",
        method: "POST",
        data: {
            button_click: true,
            id: id
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                document.getElementById("admin_edit_holder").innerHTML = `<form onSubmit="return admin_edit_cigar()" method="POST" action="../views/admin_controller/edit_image.php" name="admin_edit_cigar_form" enctype="multipart/form-data"><label for="admin_edit_cigar_title">Cigar Title</label><input type="text" id="admin_edit_cigar_title" name="admin_edit_cigar_title" value="${prom.got.title}"/>
                            <label for="admin_edit_cigar_image">Cigar Image</label><input type="file" id="admin_edit_cigar_image" name="admin_edit_cigar_image" accept=".gif, .jpg, .png"/>
                            <label for="admin_edit_cigar_price">Cigar Price</label><input type="number" id="admin_edit_cigar_price" name="admin_edit_cigar_price" value="${prom.got.price}" step="0.01"/>
                            <input type="hidden" id="admin_edit_cigar_id" name="admin_edit_cigar_id" value="${prom.got.ID}"/>
                            <input type="hidden" id="admin_edit_cigar_image_older" name="admin_edit_cigar_image_older" value="${prom.got.image}"/>
                            <p id="admin_edit_cigar_error"></p>
                            <input type="submit" id="admin_edit_cigar_button" name="admin_edit_cigar_button" value="Submit"/></form>`;
                if (err) {
                    if (err == "byform2") {
                        document.getElementById("admin_edit_cigar_error").innerHTML = "Must send by form.";
                    } else if (err == "servererror2") {
                        document.getElementById("admin_edit_cigar_error").innerHTML = "Server error.";
                    } else if (err == "notuploaded2") {
                        document.getElementById("admin_edit_cigar_error").innerHTML = "Failed uploading file.";
                    } else if (err == "size2") {
                        document.getElementById("admin_edit_cigar_error").innerHTML = "File must not be bugger than 2MB.";
                    } else if (err == "filetype2") {
                        document.getElementById("admin_edit_cigar_error").innerHTML = "Allowed file types are .gif, .jpeg, .jpg, .png";
                    } else {
                        document.getElementById("admin_edit_cigar_error").innerHTML = "";
                    }
                } else {
                    document.getElementById("admin_edit_cigar_error").innerHTML = "";
                }
            } else {
                document.getElementById("admin_edit_holder").innerHTML = "<h3>" + prom.got + "</h3>";
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_edit_holder").innerHTML = "<h3>" + error + "</h3>";
        }
    });
}
function admin_edit_cigar() {
    var title = document.getElementById("admin_edit_cigar_title").value,
        price = document.getElementById("admin_edit_cigar_price").value;
    if (title == "" || price == "") {
        document.getElementById("admin_edit_user_error").innerHTML = "You must enter title and a price.";
        return false;
    }
    if (price <= 0) {
        document.getElementById("admin_edit_user_error").innerHTML = "Price can not be lower or equal to zero.";
        return false;
    }
    document.getElementById("admin_edit_user_error").innerHTML = "";
    return true;
}
function get_navigation(id) {
    $.ajax({
        url: "../views/admin_controller/get_navigation.php",
        method: "POST",
        data: {
            button_click: true,
            id: id
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                document.getElementById("admin_edit_holder").innerHTML = `<label for="admin_edit_navigation_title">Navigation Title</label><input type="text" id="admin_edit_navigation_title" name="admin_edit_navigation_title" value="${prom.got.title}"/>
                            <label for="admin_edit_navigation_link">Navigation Link</label><input type="text" id="admin_edit_navigation_link" name="admin_edit_navigation_link" value="${prom.got.link}"/>
                            <input type="hidden" id="admin_edit_navigation_id" name="admin_edit_navigation_id" value="${prom.got.ID}"/>
                            <p id="admin_edit_navigation_error"></p>
                            <input type="button" id="admin_edit_navigation_button" name="admin_edit_navigation_button" value="Submit"/>`;
                document.getElementById("admin_edit_navigation_button").addEventListener("click", admin_edit_navigation);
                $("#admin_edit_holder input").keydown(function (e) {
                    if (e.key == "Enter") {
                        admin_edit_navigation();
                    }
                });
            } else {
                document.getElementById("admin_edit_holder").innerHTML = "<h3>" + prom.got + "</h3>";
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_edit_holder").innerHTML = "<h3>" + error + "</h3>";
        }
    });
}
function admin_edit_navigation() {
    var title = document.getElementById("admin_edit_navigation_title").value,
        link = document.getElementById("admin_edit_navigation_link").value,
        id = document.getElementById("admin_edit_navigation_id").value;
        $.ajax({
            url: "../views/admin_controller/edit_navigation.php",
            method: "POST",
            data: {
                button_click: true,
                title: title,
                link: link,
                id: id
            },
            success: function (data) {
                var prom = JSON.parse(data);
                if (prom.done) {
                    location.reload();
                } else {
                    document.getElementById("admin_edit_navigation_error").innerHTML = prom.changed;
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("admin_edit_navigation_error").innerHTML = error;
            }
        });
}
function get_social(id) {
    $.ajax({
        url: "../views/admin_controller/get_socials.php",
        method: "POST",
        data: {
            button_click: true,
            id: id
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                document.getElementById("admin_edit_holder").innerHTML = `<label for="admin_edit_socials_class">fa-fa class</label><input type="text" id="admin_edit_socials_class" name="admin_edit_socials_class" value="${prom.got.class}"/>
                            <label for="admin_edit_socials_link">Socials Link</label><input type="text" id="admin_edit_socials_link" name="admin_edit_socials_link" value="${prom.got.link}"/>
                            <input type="hidden" id="admin_edit_socials_id" name="admin_edit_socials_id" value="${prom.got.ID}"/>
                            <p id="admin_edit_socials_error"></p>
                            <input type="button" id="admin_edit_socials_button" name="admin_edit_socials_button" value="Submit"/>`;
                document.getElementById("admin_edit_socials_button").addEventListener("click", admin_edit_socials);
                $("#admin_edit_holder input").keydown(function (e) {
                    if (e.key == "Enter") {
                        admin_edit_socials();
                    }
                });
            } else {
                document.getElementById("admin_edit_holder").innerHTML = "<h3>" + prom.got + "</h3>";
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_edit_holder").innerHTML = "<h3>" + error + "</h3>";
        }
    });
}
function admin_edit_socials() {
    var classs = document.getElementById("admin_edit_socials_class").value,
        link = document.getElementById("admin_edit_socials_link").value,
        id = document.getElementById("admin_edit_socials_id").value;
    $.ajax({
        url: "../views/admin_controller/edit_socials.php",
        method: "POST",
        data: {
            button_click: true,
            class: classs,
            link: link,
            id: id
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                location.reload();
            } else {
                document.getElementById("admin_edit_socials_error").innerHTML = prom.changed;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_edit_socials_error").innerHTML = error;
        }
    });
}
function get_user(id) {
    $.ajax({
        url: "../views/admin_controller/get_user.php",
        method: "POST",
        data: {
            button_click: true,
            id: id
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                document.getElementById("admin_edit_holder").innerHTML = `<label for="admin_edit_user_username">Username</label><input type="text" id="admin_edit_user_username" name="admin_edit_user_username" value="${prom.got.Username}"/>
                            <label for="admin_edit_user_password">Password</label><input type="text" id="admin_edit_user_password" name="admin_edit_user_password" value="${prom.got.Password}"/>
                            <label for="admin_edit_user_email">Email</label><input type="email" id="admin_edit_user_email" name="admin_edit_user_email" value="${prom.got.Email}"/>
                            <label for="admin_edit_user_date">Date of Birth</label><input type="date" id="admin_edit_user_date" name="admin_edit_user_date" value="${prom.got.DateOfBirth}"/>
                            <input type="hidden" id="admin_edit_user_id" name="admin_edit_user_id" value="${prom.got.ID}"/>
                            <p id="admin_edit_user_error"></p>
                            <input type="button" id="admin_edit_user_button" name="admin_edit_user_button" value="Submit"/>`;
                document.getElementById("admin_edit_user_button").addEventListener("click", admin_edit_user);
                $("#admin_edit_holder input").keydown(function (e) {
                    if (e.key == "Enter") {
                        admin_edit_user();
                    }
                });
            } else {
                document.getElementById("admin_edit_holder").innerHTML = "<h3>" + prom.got + "</h3>";
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_edit_holder").innerHTML = "<h3>" + error + "</h3>";
        }
    });
}
function admin_edit_user() {
    var username = document.getElementById("admin_edit_user_username").value,
        password = document.getElementById("admin_edit_user_password").value,
        email = document.getElementById("admin_edit_user_email").value,
        date = document.getElementById("admin_edit_user_date").value,
        id = document.getElementById("admin_edit_user_id").value,
        user_pat = /^([A-Z]|[a-z]|[0-9])+$/,
        email_pat = /^(\w|\d)\S*@\S+\.(\w|\d){2,}$/,
        date_entered = new Date(date),
        timestamp_entered = date_entered.getTime(),
        date_now = new Date(),
        timestamp_now = date_now.getTime();

    if (username.length < 3) {
        document.getElementById("admin_edit_user_error").innerHTML = "Username must not be less than three characters.";
        return;
    }
    if (!user_pat.test(username)) {
        document.getElementById("admin_edit_user_error").innerHTML = "Username must only contain letters and numbers.";
        return;
    }
    document.getElementById("admin_edit_user_error").innerHTML = "";
    if (password.includes(username) || username.includes(password)) {
        document.getElementById("admin_edit_user_error").innerHTML = "Password must not include username.";
        return;
    }
    document.getElementById("admin_edit_user_error").innerHTML = "";
    if (!email_pat.test(email)) {
        document.getElementById("admin_edit_user_error").innerHTML = "Wrong email format.";
        return;
    }
    document.getElementById("admin_edit_user_error").innerHTML = "";
    if (timestamp_entered > timestamp_now) {
        document.getElementById("admin_edit_user_error").innerHTML = "Date can not be bigger than current date.";
        return;
    }
    document.getElementById("admin_edit_user_error").innerHTML = "";
    $.ajax({
        url: "../views/admin_controller/edit_user.php",
        method: "POST",
        data: {
            button_click: true,
            username: username,
            password: password,
            email: email,
            date: date,
            id: id
        },
        success: function (data) {
            var prom = JSON.parse(data);
            if (prom.done) {
                location.reload();
            } else {
                document.getElementById("admin_edit_user_error").innerHTML = prom.changed;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById("admin_edit_user_error").innerHTML = error;
        }
    });
}

$(document).ready(() => {
    $("#login-form").submit((e) => {
        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $("#login-form");
        var url = form.attr('action');
        console.log(form.serialize())
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function (data) {
                switch (data) {
                    case "success":
                        document.cookie = `username=${form.serialize().username}`
                } // show response from the php script.
            }
        });
    })
})
$(document).ready(()=> {
    $("#view").click(() => {
        window.location = "view"
    });
    $("#create").click(() => {
        window.location = "app"
    });
    $("#title").click(() => {
        window.location = "/"
    });
    $("#account").click(() => {
        switch ($("#account").text()) {
            case "Login":
                window.location = "login"
                break;
            default:
                window.location = "user/" + getCookie("username")
        }
    });
    if (document.cookie == "") {
        $("#account").text("Login")
    } else {
        $("#account").text(getCookie("username"))
    }
})

function getCookie(key) {
    var _key = key + "="
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(_key) == 0)  return c.substring(_key.length, c.length);
    }
    return "";
  }
var columns = 3;

$(document).ready(() => {
    $.get("view/retrieve", (res) => {
        res.forEach(row => {
            console.log(row)
            var inserts = `${row.nameA} vs ${row.nameB}`
            var card = $(`<li class='card' id="${row.id}"><div>Items</div></li>`).text(inserts)

            $(card).click(() => {
                window.location = `app/${row.id}`
            })
            $("#items").append(card)
        });
    })
})
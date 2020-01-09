const button = document.getElementById("save");
button.addEventListener("click", ekle);
const name = document.querySelector('input[name="name"]');
const lastname = document.querySelector('input[name="lastname"]');
const number = document.querySelector('input[name="number"]');
const city = document.querySelector('input[name="city"]');
const state = document.querySelector('select[name="state"]');
const buttonChange = document.getElementById("buttonChange");
const popupName = document.querySelector('input[name="popupName"]');
const popupLastname = document.querySelector('input[name="popupLastname"]');
const popupCity = document.querySelector('input[name="popupCity"]');
const popupNumber = document.querySelector('input[name="popupNumber"]');
const popupid = document.querySelector(".hide");

function delay(time) {
    $(".spine").show();
    setTimeout(() => {
        $(".spine").hide();
    }, time);

}

function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

buttonChange.addEventListener("click", function(e) {
    delay(500);
    $.ajax({
        type: "POST",
        url: "api.php",
        data: {
            update: popupid.innerHTML,
            name: popupName.value,
            lastname: popupLastname.value,
            number: popupNumber.value,
            city: popupCity.value,
        },
        success: function(result) {
            document.getElementById("name" + popupid.innerHTML).innerHTML = popupName.value;
            document.getElementById("lastname" + popupid.innerHTML).innerHTML = popupLastname.value;
            document.getElementById("number" + popupid.innerHTML).innerHTML = popupNumber.value;
            document.getElementById("city" + popupid.innerHTML).innerHTML = popupCity.value;


        }
    })
});

function cl(params, dom) {
    delay(250);
    $.ajax({
        type: "POST",
        url: "api.php",
        data: {
            stateid: params,
            stateName: $(dom).data("state"),
        },
        success: function(result) {
            if (dom.textContent == "Aktif") {
                dom.textContent = "Pasif";
                dom.style.color = "red";
            } else {
                dom.style.color = "blue";
                dom.textContent = "Aktif";
            }
            $(dom).data("state", result);
        }
    })
}

$(".spine").hide();

$.ajax({
    url: 'api.php',
    type: 'POST',
    data: {
        select: "1",
    },
    success: function(result) {

        var parsedResult = JSON.parse(result);
        for (var x = 0; x < parsedResult.length; x++) {


            let row = '<tr><td scope="row" id="id' + parsedResult[x].id + '">' + parsedResult[x].id + '</td>' +
                '<td scope="row" id="name' + parsedResult[x].id + '">' + parsedResult[x].name + '</td>' +
                '<td scope="row" id="lastname' + parsedResult[x].id + '">' + parsedResult[x].lastname + '</td>' +
                '<td scope="row" id="number' + parsedResult[x].id + '">' + parsedResult[x].number + '</td>' +
                '<td scope="row" id="city' + parsedResult[x].id + '">' + parsedResult[x].city + '</td>';

            var stateColor = "blue";
            if (parsedResult[x].state == "Aktif") {
                stateColor = "blue";
            } else {
                stateColor = "red";
            }
            row = row + '<td><a id="status" href="javascript:void(0)" style="color:' + stateColor + ';" data-state="' + parsedResult[x].state + '" onclick="cl(' + parsedResult[x].id + ', this)" >' + parsedResult[x].state + '</a></td>';
            /**
            if (parsedResult[x].state == "Aktif") {

                //row = row + '<td><a style="color: blue !important;" href="#" onclick="cl(' + parsedResult[x].id +","+ parsedResult[x].state +')">' + parsedResult[x].state +'</a></td>';
            } else {
                row = row + '<td><a id="status" href="#" style="color:red;" onclick="cl(' + parsedResult[x].id + ',\'' + parsedResult[x].state + '\', this)" >' + parsedResult[x].state + '</a></td>';
            }
            */

            row = row + '<td scope="row"><a data-toggle="modal" onclick="fnk(' + parsedResult[x].id + ',this)" data-target="#exampleModal" href="javascript:void(0)"><i class="fas fa-edit"></i></a></td>';
            row = row + '<td scope="row"><a onclick="idsubmit(' + parsedResult[x].id + ',this)"href="javascript:void(0)"><i class="fas fa-user-times"></i></a></td>';
            //row = row + '<td class="status' + parsedResult[x].state + '">' + parsedResult[x].state +'</td>';

            row = row + '</tr>';


            $(".veriler").append(row);
        }



    }
});

function ekle(e) {


    if (name.value != "" && lastname.value != "" && number.value != "" && city.value != "" && state.value != "") {
        delay(500);
        $.ajax({
            type: "POST",
            url: "api.php",
            dataType: 'json',
            data: {
                add: "1",
                name: name.value,
                lastname: lastname.value,
                number: number.value,
                city: city.value,
                state: state.value,
            },

            success: function(response, status) {

                if (response.status == 1) {

                    var last = response.recordId;
                    let row = '<tr><td scope="row" id="id' + last + '">' + last + '</td>' +
                        '<td scope="row" id="name' + last + '">' + name.value + '</td>' +
                        '<td scope="row" id="lastname' + last + '">' + lastname.value + '</td>' +
                        '<td scope="row" id="number' + last + '">' + number.value + '</td>' +
                        '<td scope="row" id="city' + last + '">' + city.value + '</td>';

                    if (state.value == "Aktif") {
                        stateColor = "blue";
                    } else {
                        stateColor = "red";
                    }
                    row = row + '<td><a id="status" href="javascript:void(0)" style="color:' + stateColor + ';" data-state="' + state.value + '" onclick="cl(' + last + ', this)" >' + state.value + '</a></td>';

                    row = row + '<td scope="row"><a data-toggle="modal" onclick="fnk(' + last + ',this)" data-target="#exampleModal" href="javascript:void(0)"><i class="fas fa-edit"></i></a></td>';
                    row = row + '<td scope="row"><a onclick="idsubmit(' + last + ', this)"href="javascript:void(0)"><i class="fas fa-user-times"></i></a></td>';
                    row = row + '</tr>';


                    $(".veriler").append(row);
                    console.log("bak bakalım");
                } else {
                    alert(response.message);
                }
            }
        });
    } else {
        alert("Bütün alanları doldurunuz.");
    }



    //const bool =document.querySelector("")
}


function fnk(recordID, dom) {
    let id = $("#id" + recordID).html();
    let number = $("#number" + recordID).html();
    let name = $("#name" + recordID).html();
    let lastname = $("#lastname" + recordID).html();
    let city = $("#city" + recordID).html();
    document.querySelector('input[name="popupName"]').value = name;
    document.querySelector('input[name="popupLastname"]').value = lastname;
    document.querySelector('input[name="popupCity"]').value = city;
    document.querySelector('input[name="popupNumber"]').value = number;
    document.querySelector('.hide').innerHTML = id;
}

function idsubmit(recordID, dom) {
    if (confirm("Silmek istediğine emin misin ? ")) {
        delay(250);
        let id = $("#id" + recordID).html();
        $.ajax({
            type: "POST",
            url: "api.php",
            data: {
                del: id,
            },
            success: function(result) {
                dom.parentNode.parentNode.remove();
            }

        });
    }
}
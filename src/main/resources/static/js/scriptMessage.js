//Caraga la informacion en el select "Client"
function autoInicioRelacionClientII() {
    console.log("Se esta ejecutando el autoinicio de Client...");
    $.ajax({
        url:"http://168.138.247.22:80/api/Client/all",
        //url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {

            let $select = $("#select-client-II");
            $.each(response, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
                console.log("select " + name.idClient);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}

//Cargar datos del Select "Skate"
function autoInicioRelacionSkateII() {
    console.log("Se esta ejecutando el autoinicio de Client...");
    $.ajax({
        url:"http://168.138.247.22:80/api/Skate/all",
        //url: "http://localhost:8080/api/Skate/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {

            let $select = $("#select-skate-II");
            $.each(response, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}

function autoInicioMessage() {
    console.log("Se esta ejecutando el autoinicio de Client...");
    $.ajax({
        url:"http://168.138.247.22:80/api/Message/all",
        //url: "http://localhost:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {

            let $select = $("#select-message");
            $.each(response, function (id, name) {
                $select.append('<option value=' + name.idMessage + '>' + name.messageText + '</option>');
                console.log("select " + name.idMessage);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}


//Manejador "POST"
function agregarMensaje() {
    
    if($("#messageText").val().length == 0){
        alert("El campo no debe ser vacio")
    }else{    
        let elemento = {
            messageText: $("#messageText").val(),
            skate:{id: +$("#select-skate").val()},
            client:{idClient: +$("#select-client-II").val()},
        }

        var dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            data: dataToSend,
            url:"http://168.138.247.22:80/api/Message/save",
            //url: "http://localhost:8080/api/Message/save",
            type: "POST",

            success: function (response) {
                console.log(response);
                //Limpiar Campos
                $("#resultado4").empty();
                $("#messageText").val("");

                //Listar Tabla

                alert("??Se ha guardado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se guardo Correctamente!")
            }
        });
    }
}


function listarMensaje() {
    $.ajax({
        url:"http://168.138.247.22:80/api/Message/all",
        //url: "http://localhost:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (response){
            console.log(response);
            pintarRespuestaMensaje(response);
        }

        });
}

function pintarRespuestaMensaje(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Mensaje</td>";
        myTable+="<td>Patineta</td>";
        myTable+="<td>Cliente</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].messageText + "</td>";
        myTable+="<td>" + response[i].skate.name + "</td>";
        myTable+="<td>" + response[i].client.name + "</td>";
        myTable+='<td><button class = "botonMessage2" onclick="borrarMensaje(' + response[i].idMessage + ')">Borrar Mensaje!</button></td>';
        myTable+='<td><button class = "botonMessage2" onclick="cargarDatosMensaje(' + response[i].idMessage + ')">Editar Mensaje!</button></td>';
        myTable+='<td><button class = "botonMessage2" onclick="actualizarMensaje(' + response[i].idMessage + ')">Actualizar Mensaje!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaMessage").html(myTable);

}

//Manejador DELETE
function borrarMensaje(idElemento) {
    let elemento = {
        idMessage: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://168.138.247.22:80/api/Message/"+idElemento,
            //url: "http://localhost:8080/api/Message/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaMessage").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Capturar informacion para Actualizar
function cargarDatosMensaje(id) {
    $.ajax({
        dataType: 'json',
        url:"http://168.138.247.22:80/api/Message/"+id,
        //url: "http://localhost:8080/api/Message/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#messageText").val(item.messageText);
        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizarMensaje(idElemento) {
    
    if($("#messageText").val().length == 0){
        alert("El campos debe estar lleno")
    }else{
        let elemento = {
            idMessage: idElemento,
            messageText: $("#messageText").val(),
            skate:{id: +$("#select-skate-II").val()},
            client:{idClient: +$("#select-client-II").val()},

        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://168.138.247.22:80/api/Message/update",
            //url: "http://localhost:8080/api/Message/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaMessage").empty();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado4").empty();
                $("#id3").val("");
                $("#messageText").val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}




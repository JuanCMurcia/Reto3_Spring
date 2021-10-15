//Manejador "POST"
function agregarReservation(){
    let elemento={
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val()
        }

    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        type:"POST",
        contentType: "application/json",
        url:"http://168.138.247.22/api/Reservation/save",
        data: dataToSend,
        datatype:"json",
        //cache: false,
        //timeout: 600000,
        
        success:function(response){
            console.log(response);
            //Limpiar Campos
            $("#resultado").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");

            //Listar Tabla
            listarReservation();
            alert("Se ha guardado Correctamente!")
        },
        error: function(jqXHR, textStatus, errorThrown){}
    });
}


//Manejador GET
function listarReservation(){
    $.ajax({
        url:"http://168.138.247.22/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            
            for(i=0; i<response.length;i++){
                var misItems=response;
                for(i=0; i<misItems.length; i++){
                    console.log(misItems[i]);
                    $("#miListaReservation").append("<tr>");
                    $("#miListaReservation").append("<td>"+misItems[i].idReservation+"</td>");
                    $("#miListaReservation").append("<td>"+misItems[i].startDate+"</td>");
                    $("#miListaReservation").append("<td>"+misItems[i].devolutionDate+"</td>");
                    $("#miListaReservation").append("<td>"+misItems[i].status+"</td>");
                    $("#miListaReservation").append('<td><button class = "botonReservation2" onclick="borrarReservation('+misItems[i].id+')">Borrar Producto!</button></td>');
                    $("#miListaReservation").append('<td><button class = "botonReservation2" onclick="cargarDatosReservation('+misItems[i].id+')">Cargar Producto!</button></td>');
                    $("#miListaReservation").append("</tr>");
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){}
        });
}

//Manejador DELETE
function borrarReservation(idElemento){
    var elemento={
        id:idElemento
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data:dataToSend,
            url:"http://localhost:8080/api/Skate/all",
            type:'DELETE',
            contentType:"application/JSON",
            success:function(response){
                $("#miListaSkate").empty();
                listarSkate();
                alert("se ha Eliminado Correctamente!")
            },

            error: function(jqXHR, textStatus, errorThrown){

            }
        });
}

//Capturar informacion para Actualizar
function cargarDatosReservation(id){
    $.ajax({
        dataType: 'json',
        url:"http://localhost:8080/api/Skate/all/"+id,
        type:'GET',
        
        success:function(response) {
          console.log(response);
          var item=response.items[0];
  
          $("#startDate").val(item.startDate);
          $("#devolutionDate").val(item.devolutionDate);
          $("#status").val(item.status);
  
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
}

//Manejador PUT
function actualizarReservation(){
    var elemento={
        id:$("#id").val(),
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val()
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype:'json',
        data:dataToSend,
        contentType:"application/JSON",
        url:"http://localhost:8080/api/Skate/all",
        type:"PUT",
        
        success:function(response){
            $("#miListaSkate").empty();
            listarSkate();
            alert("se ha Actualizado Correctamente!")

            //Limpiar Campos
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#brand").val("");
            $("#year").val("");
            $("#description").val("");
            

        },
        error: function(jqXHR, textStatus, errorThrown){}
    });
}
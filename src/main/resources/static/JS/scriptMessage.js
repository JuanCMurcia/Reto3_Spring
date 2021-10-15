//Manejador "POST"
function agregarMensaje(){
    let elemento={
        messageText:$("#messageText").val(),
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype:'json',
        contentType: "application/json",
        data:dataToSend,
        url:"http://168.138.247.22/api/Message/save",
        type:"POST",
        
        success:function(response){
            console.log(response);
            //Limpiar Campos
            $("#resultado3").empty();
            $("#messageText").val("");

            //Listar Tabla
            listarMensaje();
            alert("¡Se ha guardado Correctamente!")
        },
        error: function(jqXHR, textStatus, errorThrown){}
    });
}


//Manejador GET
function listarMensaje(){
    $.ajax({
        url:"http://168.138.247.22/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            
            for(i=0; i<response.length;i++){
                var misItems=response;
                for(i=0; i<misItems.length; i++){
                    console.log(misItems[i]);
                    $("#miListaMessage").append("<tr>");
                    $("#miListaMessage").append("<td>"+misItems[i].idMessage+"</td>");
                    $("#miListaMessage").append("<td>"+misItems[i].messageText+"</td>");
                    $("#miListaMessage").append('<td><button class = "botonMessage2" onclick="borrarMensaje('+misItems[i].id+')">Borrar Mensaje!</button></td>');
                    $("#miListaMessage").append('<td><button class = "botonMessage2" onclick="cargarDatosMensaje('+misItems[i].id+')">Cargar Mensaje!</button></td>');
                    $("#miListaMessage").append("</tr>");
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){}
        });
}

//Manejador DELETE
function borrarMensaje(idElemento){
    var elemento={
        id:idElemento
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data:dataToSend,
            url:"https://g4f023f8afe10e5-bdskate.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
            type:'DELETE',
            contentType:"application/JSON",
            success:function(response){
                $("#miListaMessage").empty();
                listarMensaje();
                alert("se ha Eliminado Correctamente!")
            },

            error: function(jqXHR, textStatus, errorThrown){

            }
        });
    }

//Capturar informacion para Actualizar
function cargarDatosMensaje(id){
    $.ajax({
        dataType: 'json',
        url:"https://g4f023f8afe10e5-bdskate.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/"+id,
        type:'GET',
        
        success:function(response) {
          console.log(response);
          var item=response.items[0];
  
          $("#id3").val(item.id);
          $("#messagetext").val(item.messagetext);
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
}

//Manejador PUT
function actualizarMensaje(){
    var elemento={
        id:$("#id3").val(),
        messagetext:$("#messagetext").val(),

    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype:'json',
        data:dataToSend,
        contentType:"application/JSON",
        url:"https://g4f023f8afe10e5-bdskate.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",
        
        success:function(response){
            //console.log(response);
            $("#miListaMessage").empty();
            listarMensaje();
            alert("se ha Actualizado Correctamente!")

            //Limpiar Campos
            $("#resultado3").empty();
            $("#id3").val("");
            $("#messagetext").val("");

        },
        error: function(jqXHR, textStatus, errorThrown){}
    });
}
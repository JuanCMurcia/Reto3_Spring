//Manejador "POST"
function agregarSkate(){
    var elemento={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val()
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype:'json',
        data:elemento,
        url:"https://gaf239389c64f9d-patinetas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
        type:"POST",
        
        success:function(response){
            //Limpiar Campos
            $("#resultado").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#model").val("");
            $("#category_id").val("");
            $("#name").val("");

            //Listar Tabla
            listarSkate();
            alert("Se ha guardado Correctamente!")
        },
        error: function(jqXHR, textStatus, errorThrown){}
    });
}


//Manejador GET
function listarSkate(){
    $.ajax({
        url:"https://gaf239389c64f9d-patinetas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            
            for(i=0; i<response.items.length;i++){
                var misItems=response.items;
                for(i=0; i<misItems.length; i++){
                    console.log(misItems[i]);
                    $("#miListaSkate").append("<tr>");
                    $("#miListaSkate").append("<td>"+misItems[i].brand+"</td>");
                    $("#miListaSkate").append("<td>"+misItems[i].model+"</td>");
                    $("#miListaSkate").append("<td>"+misItems[i].category_id+"</td>");
                    $("#miListaSkate").append("<td>"+misItems[i].name+"</td>");
                    $("#miListaSkate").append('<td><button class = "botonSkate2" onclick="borrar('+misItems[i].id+')">Borrar Producto!</button></td>');
                    $("#miListaSkate").append('<td><button class = "botonSkate2" onclick="cargarDatosSkate('+misItems[i].id+')">Cargar Producto!</button></td>');
                    $("#miListaSkate").append("</tr>");
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){}
        });
}

//Manejador DELETE
function borrar(idElemento){
    var elemento={
        id:idElemento
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data:dataToSend,
            url:"https://gaf239389c64f9d-patinetas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
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
function cargarDatosSkate(id){
    $.ajax({
        dataType: 'json',
        url:"https://gaf239389c64f9d-patinetas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate/"+id,
        type:'GET',
        
        success:function(response) {
          console.log(response);
          var item=response.items[0];
  
          $("#id").val(item.id);
          $("#brand").val(item.brand);
          $("#model").val(item.model);
          $("#category_id").val(item.category_id);
          $("#name").val(item.name);
  
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
}

//Manejador PUT
function actualizar(){
    var elemento={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val()
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype:'json',
        data:dataToSend,
        contentType:"application/JSON",
        url:"https://gaf239389c64f9d-patinetas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
        type:"PUT",
        
        success:function(response){
            $("#miListaSkate").empty();
            listarSkate();
            alert("se ha Actualizado Correctamente!")

            //Limpiar Campos
            $("#resultado").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#model").val("");
            $("#category_id").val("");
            $("#name").val("");
            

        },
        error: function(jqXHR, textStatus, errorThrown){}
    });
}
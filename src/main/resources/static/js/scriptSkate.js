//Manejador "POST"
function agregarSkate(){
    let elemento={
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val()
        }

    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        type:"POST",
        contentType: "application/json",
        url:"http://168.138.247.22:80/api/Skate/save",
        data: dataToSend,
        datatype:'json',
        //cache: false,
        //timeout: 600000,
        
        success:function(response){
            console.log(response);
            //Limpiar Campos
            $("#resultado").empty();
            $("#name").val("");
            $("#brand").val("");
            $("#year").val("");
            $("#description").val("");

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
        url:"http://168.138.247.22:80/api/Skate/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            
            for(i=0; i<response.length;i++){
                var misItems=response;
                for(i=0; i<misItems.length; i++){
                    console.log(misItems[i]);
                    $("#miListaSkate").append("<tr>");
                    $("#miListaSkate").append("<td>"+misItems[i].id+"</td>");
                    $("#miListaSkate").append("<td>"+misItems[i].name+"</td>");
                    $("#miListaSkate").append("<td>"+misItems[i].brand+"</td>");
                    $("#miListaSkate").append("<td>"+misItems[i].year+"</td>");
                    $("#miListaSkate").append("<td>"+misItems[i].description+"</td>");
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
function cargarDatosSkate(id){
    $.ajax({
        dataType: 'json',
        url:"http://localhost:8080/api/Skate/all/"+id,
        type:'GET',
        
        success:function(response) {
          console.log(response);
          var item=response.items[0];
  
          $("#id").val(item.id);
          $("#name").val(item.brand);
          $("#brand").val(item.model);
          $("#year").val(item.category_id);
          $("#description").val(item.name);
  
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
}

//Manejador PUT
function actualizar(){
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
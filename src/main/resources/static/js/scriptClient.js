//Manejador "POST"
function agregarCliente(){
    let elemento={
        name:$("#name3").val(),
        email:$("#email").val(),
        age:$("#age").val()
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype:'json',
        contentType: "application/json",
        data:dataToSend,
        url:"http://168.138.247.22:80/api/Client/save",
        type:"POST",
        
        success:function(response){
            console.log(response);
            //Limpiar Campos
            $("#resultado2").empty();
            $("#name3").val("");
            $("#email").val("");
            $("#age").val("");

            //Listar Tabla
            listarCliente();
            alert("¡Se ha guardado Correctamente!")
        },
        error: function(jqXHR, textStatus, errorThrown){}
    });
}


//Manejador GET
function listarCliente(){
    $.ajax({
        url:"http://168.138.247.22:80/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            
            for(i=0; i<response.length;i++){
                var misItems=response;
                for(i=0; i<misItems.length; i++){
                    console.log(misItems[i]);
                    $("#miListaClient").append("<tr>");
                    $("#miListaClient").append("<td>"+misItems[i].idClient+"</td>");
                    $("#miListaClient").append("<td>"+misItems[i].name+"</td>");
                    $("#miListaClient").append("<td>"+misItems[i].email+"</td>");
                    $("#miListaClient").append("<td>"+misItems[i].age+"</td>");
                    $("#miListaClient").append('<td><button class = "botonCliente2" onclick="borrarCliente('+misItems[i].id+')">Borrar Cliente!</button></td>');
                    $("#miListaClient").append('<td><button class = "botonCliente2" onclick="cargarDatosCliente('+misItems[i].id+')">Cargar Cliente!</button></td>');
                    $("#miListaClient").append("</tr>");
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){}
        });
}

//Manejador DELETE
function borrarCliente(idElemento){
    var elemento={
        id:idElemento
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data:dataToSend,
            url:"https://g4f023f8afe10e5-bdskate.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
            type:'DELETE',
            contentType:"application/JSON",
            success:function(response){
                $("#miListaClient").empty();
                listarCliente();
                alert("se ha Eliminado Correctamente!")
            },

            error: function(jqXHR, textStatus, errorThrown){

            }
        });
    }

//Capturar informacion para Actualizar
function cargarDatosCliente(id){
    $.ajax({
        dataType: 'json',
        url:"https://g4f023f8afe10e5-bdskate.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/"+id,
        type:'GET',
        
        success:function(response) {
          console.log(response);
          var item=response.items[0];
  
          $("#id2").val(item.id);
          $("#name2").val(item.name);
          $("#email2").val(item.email);
          $("#age2").val(item.age);
  
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
}

//Manejador PUT
function actualizarCliente(){
    var elemento={
        id:$("#id2").val(),
        name:$("#name2").val(),
        email:$("#email2").val(),
        age:$("#age2").val()
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax({
        datatype:'json',
        data:dataToSend,
        contentType:"application/JSON",
        url:"https://g4f023f8afe10e5-bdskate.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        
        success:function(response){
            //console.log(response);
            $("#miListaClient").empty();
            listarCliente();
            alert("se ha Actualizado Correctamente!")

            //Limpiar Campos
            $("#resultado2").empty();
            $("#id2").val("");
            $("#name2").val("");
            $("#email2").val("");
            $("#age2").val("");
            

        },
        error: function(jqXHR, textStatus, errorThrown){}
    });
}
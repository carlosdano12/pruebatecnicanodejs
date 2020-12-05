$(window).load(function () {

  $(function () {

    $('#image').change(function (e) {

      addImage(e);

    });

    function addImage(e) {

      var file = e.target.files[0],

        imageType = /image.*/;

      if (!file.type.match(imageType))

        return;

      var reader = new FileReader();

      reader.onload = function (e) {
        var result = e.target.result;
        $('#miniatura').attr("src", result);
      }

      reader.readAsDataURL(file);
    }
  });

  $("#tablaVeh tr").not(".btn").click(function () {
    //alert($(this).find("td").eq(2).text());
    $("#id_vehiculo").val($(this).find("#t_id_vehiculo").attr("value"));
    $("#placa").val($(this).find("td").eq(0).text());
    $("#marca").val($(this).find("td").eq(1).text());
    $("#modelo").val($(this).find("td").eq(2).text());
    $("#color").val($(this).find("td").eq(3).text());
    $("#detalle").val($(this).find("td").eq(4).text());
    $("#imagen").val($(this).find("#t_imagen").attr("value"));
    $("#miniatura").attr("src", $(this).find("td").eq(5).find("img").attr("src"));
    $("#fecha").val($(this).find("td").eq(6).text());
    $("#btnEliminar").css('visibility', 'visible');
  });

  $("#btnGuardar").click(function (event) {

    if ($("#id_vehiculo").val() == 0) {

      event.preventDefault();

      var form = $('#formu')[0];

      var data = new FormData(form);

      $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "http://localhost:3000/api_vehiculos/insert",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        complete:function(data){
        
         location.reload();
      },
        success: function (data) {

          console.log("SUCCESS : ", data);

        },
        error: function (e) {

          console.log("ERROR : ", e);

        }
      });

    } else {

      event.preventDefault();
      
      var form = $('#formu')[0];

      var data = new FormData(form);
      $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "http://localhost:3000/api_vehiculos/update",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        complete:function(data){
        
         location.reload();
      },
        success: function (data) {

          console.log("SUCCESS : ", data);

        },
        error: function (e) {

          console.log("ERROR : ", e);

        }
      });
    }
  });



  $("#btnEliminar").click(function (event) {

    var formulario = $("#formu");
    formulario.attr("method", "POST");
    formulario.attr("action", "/delete");
    formulario.submit();
  });

  $("#btnExcel").click(function (event) {

    document.location.href = "/uploadExcel";
  });

  $("#btnHabilitar").click(function (event) {

    document.location.href = "/habilitarVehiculo";
  });

});

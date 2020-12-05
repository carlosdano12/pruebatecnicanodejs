$(window).load(function () {

  $("#tablaVeh tr").not(".btn").click(function () {
    //alert($(this).find("td").eq(2).text());
    $("#id_vehiculo").val($(this).find("#t_id_vehiculo").attr("value"));
    $("#btnEliminar").css('visibility', 'visible');
    $("#btnHabilitar").css('visibility', 'visible');
  });

  $("#btnEliminar").click(function (event) {

    var formulario = $("#formu");
    formulario.attr("method", "POST");
    formulario.attr("action", "/delete");
    formulario.submit();
  });

  $("#btnHabilitar").click(function (event) {

    var formulario = $("#formu");
    formulario.attr("method", "POST");
    formulario.attr("action", "/habilitar");
    formulario.submit();
  });

  $("#btnAtras").click(function (event) {
    event.preventDefault();
    document.location.href = "/getAllVehiculos";
  });

});

$(window).load(function () {

    $("#tablaEmp tr").not(".btn").click(function () {

        $("#id_usuario").val($(this).find("#t_id_usuario").attr("value"));
        $("#nombre").val($(this).find("td").eq(0).text());
        $("#apellido").val($(this).find("td").eq(1).text());
        $("#telefono").val($(this).find("td").eq(2).text());
        $("#correo").val($(this).find("td").eq(3).text());
        $("#btnEliminar").css('visibility', 'visible');
    });

    $("#btnGuardar").click(function (event) {

        if ($("#id_usuario").val() == 0) {

            event.preventDefault();

            $.ajax({
                type: "POST",
                url: "/insertEmpleados",
                data: $('#formu').serialize(),
                cache: false,
                timeout: 600000,
                complete: function (data) {

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

            $.ajax({
                type: "POST",
                url: "/updateEmpleados",
                data: $('#formu').serialize(),
                cache: false,
                timeout: 600000,
                complete: function (data) {

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
        formulario.attr("action", "/deleteEmpleados");
        formulario.submit();
    });

});
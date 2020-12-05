$(window).load(function () {


    $("#btnEnviar").click(function (event) {

            event.preventDefault();

            var form = $('#formu')[0];

            var data = new FormData(form);

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "http://localhost:3000/api_vehiculos/uploadExcel",
                data: data,
                processData: false,
                contentType: false,
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
        
    });

    $("#btnAtras").click(function (event) {
        event.preventDefault();
        document.location.href = "/getAllVehiculos";
      });

});
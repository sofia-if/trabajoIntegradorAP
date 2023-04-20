document.addEventListener('DOMContentLoaded', function() {

    //--------------------------------FORMULARIO DE COTIZACIÓN-----------------------------------------

       // Configurar reglas de validación y mensajes de error usando jQuery validation
       $('#formularioProceso').validate({
           rules: {
               metros: 'required',
               tipo: 'required',
               estilo: 'required'
           },
           messages: {
               metros: 'Por favor ingrese la dimensión en metros2',
               tipo: 'Por favor ingrese el tipo de ambiente',
           },
           submitHandler: function(form) {
               // Obtener los valores de los campos del formulario
               var tipo = document.getElementById('tipo').value;
               var metros = document.getElementById('metros').value;
               var estilo = document.getElementById('estilo').value;
   
               var preciom2 = 100;
               
   
   
               // Realizar cálculos para la cotización
             
              var precioxdimensionreal = metros * preciom2;
              var total = precioxdimensionreal + parseInt(estilo);
             
   
   
               // Generar el resumen de la cotización
               var cotizacion = 'Cotización:\n\n' +
   
                   'Tipo de amb: ' + tipo + '\n' + 
                   'Dimensión ingresada: ' + metros + '\n' +
                   'Valor del m2: $' + preciom2 + '\n' +
                   'Valor del estilo seleccionado: $' + estilo + '\n' +
                   'Precio por dimensiones ingresadas: $' + precioxdimensionreal + '\n' +
                   'Total: $' + total;
                            
                   
   
               // Mostrar la cotización en un cuadro de diálogo
               alert(cotizacion);
   
   
   
              //  Continuar con el resto del código de generación del PDF y descarga del archivo, si es necesario:
              //  Crear un nuevo objeto jsPDF
               var pdf = new jsPDF();
   
             //   Agregar el resumen al documento PDF
               pdf.text(cotizacion, 20, 20);
   
              //  Generar el archivo PDF como Blob
               var pdfBlob = pdf.output('blob');
   
              //  Crear un enlace de descarga
               var downloadLink = document.createElement('a');
               downloadLink.href = URL.createObjectURL(pdfBlob);
               downloadLink.download = 'resumen_proceso.pdf';
               downloadLink.click();
   
               // Liberar el objeto Blob
               URL.revokeObjectURL(pdfBlob);
           
           }
       });

   //--------------------------------FORMULARIO DE CONTACTO-----------------------------------------
   $('#formularioContacto').validate({     // jQuery validation para el formulario de contacto.
       rules: {
           nombre: 'required',
           email: {
               required: true,
               email: true
           },
           mensaje: 'required'
       },
       messages: {
           nombre: 'Por favor ingrese su nombre',
           email: {
               required: 'Por favor ingrese su dirección de correo electrónico',
               email: 'Por favor ingrese una dirección de correo electrónico válida'
           },
           mensaje: 'Por favor ingrese un mensaje'
       },
       submitHandler: function(form) {
           // Obtengo los valores de los campos del formulario.
           var nombre = $('#nombre').val();
           var email = $('#email').val();
           var mensaje = $('#mensaje').val();

           // Hago la petición a AJAX.
           $.ajax({
               url: 'https://reqres.in/api/users?page=2', 
               method: 'POST', 
               data: {
                   nombre: nombre,
                   email: email,
                   mensaje: mensaje
               },
               success: function(response) {
                   
                   console.log('Éxito:', response);
                   // Alert al usuario de que sus datos fueron enviados.
                   alert('¡Su mensaje ha sido enviado con éxito! Nos contactaremos a la brevedad.');
               },
               error: function(xhr, status, error) {
                   console.error('Error:', error);
                   alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
               }
           });
       }
   });
});
